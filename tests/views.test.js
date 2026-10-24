import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { target1400Data } from '../data/target1400.js';
import { parseTSV, preprocessWords } from '../js/modules/parser.js';
import { VocabStore } from '../js/modules/store.js';
import { QuizEngine } from '../js/modules/quiz-engine.js';
import { LearnView } from '../js/views/learn-view.js';
import { WordsView } from '../js/views/words-view.js';
import { StatsView } from '../js/views/stats-view.js';
import { QuizView } from '../js/views/quiz-view.js';

test('All views render cleanly without TypeError or missing icons', () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
        <body>
            <div id="view-learn"></div>
            <div id="view-quiz"></div>
            <div id="view-words"></div>
            <div id="view-stats"></div>
            <nav id="app-nav">
                <button class="nav-item active" data-tab="learn">テスト</button>
                <button class="nav-item" data-tab="words">単語帳</button>
                <button class="nav-item" data-tab="stats">設定</button>
            </nav>
        </body>
        </html>
    `, { url: 'http://localhost' });

    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;
    Object.defineProperty(global, 'navigator', {
        value: dom.window.navigator,
        configurable: true,
        writable: true
    });

    const words = preprocessWords(parseTSV(target1400Data)).slice(0, 50);
    const store = new VocabStore();
    const engine = new QuizEngine({ allWords: words, store });

    // 1. LearnView
    const learnContainer = document.getElementById('view-learn');
    const learnView = new LearnView({
        container: learnContainer,
        store,
        onStartQuiz: () => {}
    });
    learnView.setWords(words);
    assert(learnContainer.innerHTML.includes('learn-layout-grid'));

    // 2. WordsView (単語帳タブ) - icons.eye などの未定義チェック
    const wordsContainer = document.getElementById('view-words');
    const wordsView = new WordsView({
        container: wordsContainer,
        store
    });
    assert.doesNotThrow(() => {
        wordsView.setWords(words);
    }, 'WordsView.setWords should not throw TypeError');
    assert(wordsContainer.innerHTML.includes('words-view-container'));
    assert(wordsContainer.innerHTML.includes('赤シート'));

    // 3. StatsView (設定タブ)
    const statsContainer = document.getElementById('view-stats');
    const statsView = new StatsView({
        container: statsContainer,
        store,
        onSetChange: () => {}
    });
    assert.doesNotThrow(() => {
        statsView.setWords(words);
    }, 'StatsView.setWords should not throw TypeError');
    assert(statsContainer.innerHTML.includes('stats-view-container'));
    assert(statsContainer.innerHTML.includes('テスト出題設定'));
    assert(statsContainer.innerHTML.includes('周回学習・データ整理'));

    // 4. QuizView
    const quizContainer = document.getElementById('view-quiz');
    const quizView = new QuizView({
        container: quizContainer,
        store,
        engine,
        onFinish: () => {}
    });
    assert.doesNotThrow(() => {
        quizView.startSession({ words, title: 'テスト', mode: 'en2ja', limit: 5 });
    });
    assert(quizContainer.innerHTML.includes('session-container'));
    engine.stopTimer();
});

test('Navigation tab switching works for words and stats tabs', () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
        <body>
            <header class="app-header">
                <div class="header-inner">
                    <span id="active-set-badge"></span>
                </div>
            </header>
            <main class="app-main">
                <section id="view-learn" class="view-panel active"></section>
                <section id="view-quiz" class="view-panel" style="display: none;"></section>
                <section id="view-words" class="view-panel" style="display: none;"></section>
                <section id="view-stats" class="view-panel" style="display: none;"></section>
            </main>
            <nav id="app-nav" class="app-nav">
                <button class="nav-item active" data-tab="learn">テスト</button>
                <button class="nav-item" data-tab="words">単語帳</button>
                <button class="nav-item" data-tab="stats">設定</button>
            </nav>
        </body>
        </html>
    `, { url: 'http://localhost' });

    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;
    global.window.scrollTo = () => {};

    const words = preprocessWords(parseTSV(target1400Data)).slice(0, 50);
    const store = new VocabStore();

    const slots = {
        learn: document.getElementById('view-learn'),
        quiz: document.getElementById('view-quiz'),
        words: document.getElementById('view-words'),
        stats: document.getElementById('view-stats')
    };

    const learnView = new LearnView({ container: slots.learn, store, onStartQuiz: () => {} });
    const quizView = new QuizView({ container: slots.quiz, store, engine: new QuizEngine({ store }), onFinish: () => {} });
    const wordsView = new WordsView({ container: slots.words, store });
    const statsView = new StatsView({ container: slots.stats, store, onSetChange: () => {} });

    learnView.setWords(words);
    wordsView.setWords(words);
    statsView.setWords(words);

    const switchTab = (tabName) => {
        const nav = document.getElementById('app-nav');
        nav.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        Object.keys(slots).forEach(name => {
            const panel = slots[name];
            if (name === tabName) {
                panel.style.display = 'block';
                panel.classList.add('active');
            } else {
                panel.style.display = 'none';
                panel.classList.remove('active');
            }
        });
        if (tabName === 'words') wordsView.render();
        if (tabName === 'stats') statsView.render();
    };

    // 単語帳タブへの切り替え
    switchTab('words');
    assert.equal(slots.words.style.display, 'block');
    assert.equal(slots.learn.style.display, 'none');
    assert(slots.words.innerHTML.includes('単語帳'));

    // 設定タブへの切り替え
    switchTab('stats');
    assert.equal(slots.stats.style.display, 'block');
    assert.equal(slots.words.style.display, 'none');
    assert(slots.stats.innerHTML.includes('設定・統計'));
});

test('WordsView flashcard mode supports flipping, status marking, and step navigation', () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
        <body>
            <div id="view-words"></div>
        </body>
        </html>
    `, { url: 'http://localhost' });

    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;

    const words = preprocessWords(parseTSV(target1400Data)).slice(0, 20);
    const store = new VocabStore();
    const container = document.getElementById('view-words');
    const wordsView = new WordsView({ container, store });

    wordsView.setWords(words);
    // 初期はリストモード
    assert.equal(wordsView.viewMode, 'list');
    assert(container.innerHTML.includes('words-list'));

    // カードめくりモードへ切り替え
    wordsView.viewMode = 'card';
    wordsView.render();
    assert(container.innerHTML.includes('flashcard-stage'));
    assert(container.innerHTML.includes('flashcard-word'));
    assert.equal(wordsView.isCardFlipped, false);

    // カードを裏返す（Space / タップ）
    wordsView.toggleCardFlip();
    assert.equal(wordsView.isCardFlipped, true);
    assert(container.innerHTML.includes('flashcard-meaning'));

    // 「覚えた（mastered）」としてマーク
    const currentWordId = wordsView.getFilteredWords()[0].id;
    wordsView.markCurrentCard('mastered');
    assert.equal(store.getWordRecord(currentWordId).status, 'mastered');
    assert.equal(wordsView.cardIndex, 1); // 次のカードへ進む
});

test('WordsView supports red sheet toggle and target switching between meaning and word', () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
        <body>
            <div id="view-words"></div>
        </body>
        </html>
    `, { url: 'http://localhost' });

    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;

    const words = preprocessWords(parseTSV(target1400Data)).slice(0, 10);
    const store = new VocabStore();
    store.settings.wordsMask = 'none';

    const container = document.getElementById('view-words');
    const wordsView = new WordsView({ container, store });
    wordsView.setWords(words);

    // 初期は赤シートOFF
    assert.equal(store.settings.wordsMask, 'none');
    let redSheetBtn = container.querySelector('#btn-red-sheet');
    assert(redSheetBtn);
    assert(!container.querySelector('#btn-sheet-target'));
    assert.equal(container.querySelectorAll('.is-masked').length, 0);

    // 赤シートをONにする
    redSheetBtn.click();
    assert.equal(store.settings.wordsMask, 'meaning');
    assert(container.querySelector('.red-sheet-fab-container.active'));
    let sheetTargetBtn = container.querySelector('#btn-sheet-target');
    assert(sheetTargetBtn);
    assert(sheetTargetBtn.textContent.includes('意味隠し'));
    assert(container.querySelectorAll('.dict-meaning.is-masked').length > 0);
    assert.equal(container.querySelectorAll('.dict-word.is-masked').length, 0);

    // 隠す対象を「英語」に切り替える
    sheetTargetBtn.click();
    assert.equal(store.settings.wordsMask, 'word');
    sheetTargetBtn = container.querySelector('#btn-sheet-target');
    assert(sheetTargetBtn);
    assert(sheetTargetBtn.textContent.includes('英語隠し'));
    assert(container.querySelectorAll('.dict-word.is-masked').length > 0);
    assert.equal(container.querySelectorAll('.dict-meaning.is-masked').length, 0);

    // 赤シートをOFFにする
    redSheetBtn = container.querySelector('#btn-red-sheet');
    redSheetBtn.click();
    assert.equal(store.settings.wordsMask, 'none');
    assert(!container.querySelector('#btn-sheet-target'));
    assert.equal(container.querySelectorAll('.is-masked').length, 0);

    // 再度赤シートをONにした時、直前の設定（word: 英語隠し）が復元される
    redSheetBtn = container.querySelector('#btn-red-sheet');
    redSheetBtn.click();
    assert.equal(store.settings.wordsMask, 'word');
    assert(container.querySelectorAll('.dict-word.is-masked').length > 0);
});

test('WordsView section stepper and filter dropdown operate properly', () => {
    const dom = new JSDOM(`
        <!DOCTYPE html>
        <html>
        <body>
            <div id="view-words"></div>
        </body>
        </html>
    `, { url: 'http://localhost' });

    global.window = dom.window;
    global.document = dom.window.document;
    global.localStorage = dom.window.localStorage;

    const words = preprocessWords(parseTSV(target1400Data)); // 全1400語
    const store = new VocabStore();
    const container = document.getElementById('view-words');
    const wordsView = new WordsView({ container, store });
    wordsView.setWords(words);

    // 初期状態: Section 1
    assert.equal(wordsView.currentSection, 1);
    const prevBtn = container.querySelector('#sec-prev-btn');
    const nextBtn = container.querySelector('#sec-next-btn');
    const secSelect = container.querySelector('#section-select');
    assert(prevBtn);
    assert(nextBtn);
    assert(secSelect);
    assert.equal(prevBtn.disabled, true);
    assert.equal(nextBtn.disabled, false);
    assert.equal(secSelect.value, '1');

    // 「次へ」ボタンで Section 2 へ進む
    nextBtn.click();
    assert.equal(wordsView.currentSection, 2);
    assert.equal(container.querySelector('#section-select').value, '2');
    assert.equal(container.querySelector('#sec-prev-btn').disabled, false);

    // 「前へ」ボタンで Section 1 へ戻る
    container.querySelector('#sec-prev-btn').click();
    assert.equal(wordsView.currentSection, 1);
    assert.equal(container.querySelector('#section-select').value, '1');

    // フィルターを「お気に入り」に変更
    const filterSelect = container.querySelector('#filter-select');
    assert(filterSelect);
    filterSelect.value = 'bookmarked';
    filterSelect.dispatchEvent(new dom.window.Event('change'));
    assert.equal(wordsView.currentFilter, 'bookmarked');
});


