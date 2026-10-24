import test from 'node:test';
import assert from 'node:assert';
import { JSDOM } from 'jsdom';
import { VocabStore } from '../js/modules/store.js';
import { QuizEngine } from '../js/modules/quiz-engine.js';
import { LearnView } from '../js/views/learn-view.js';
import { QuizView } from '../js/views/quiz-view.js';
import { WordsView } from '../js/views/words-view.js';
import { StatsView } from '../js/views/stats-view.js';

test('View components render DOM and handle core interactions without errors', () => {
    const dom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    global.HTMLElement = dom.window.HTMLElement;
    global.window.matchMedia = () => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {}
    });
    global.localStorage = {
        _data: {},
        getItem(k) { return this._data[k] || null; },
        setItem(k, v) { this._data[k] = String(v); },
        removeItem(k) { delete this._data[k]; }
    };

    const mockWords = [
        { id: 1, word: 'apple', meaning: 'りんご', pos: '名詞' },
        { id: 2, word: 'book', meaning: '本', pos: '名詞' },
        { id: 3, word: 'cat', meaning: '猫', pos: '名詞' },
        { id: 4, word: 'dog', meaning: '犬', pos: '名詞' }
    ];

    const container = document.getElementById('app');
    const store = new VocabStore();
    const engine = new QuizEngine({ store });

    // 1. LearnView
    let started = false;
    let startArgs = null;
    const learnView = new LearnView({
        container,
        store,
        onStartQuiz: (args) => { started = true; startArgs = args; }
    });
    learnView.setWords(mockWords);

    assert(container.querySelector('.hero-start-card') !== null, 'Hero card exists');
    assert(container.querySelector('#btn-hero-quick-start') !== null, 'Hero button exists');

    container.querySelector('#btn-hero-quick-start').click();
    assert.strictEqual(started, true, 'Hero start quiz fired onStartQuiz');
    assert.strictEqual(startArgs.words.length, 4, 'Correct words passed');

    // 2. QuizView
    let finished = false;
    const quizView = new QuizView({
        container,
        store,
        engine,
        onFinish: () => { finished = true; }
    });
    quizView.startSession({ words: mockWords, limit: 4 });

    assert(container.querySelector('#quiz-word-display') !== null, 'Quiz word display rendered');
    assert.strictEqual(container.querySelectorAll('.quiz-option-btn').length, 4, '4 options rendered');
    quizView.stop();

    // 3. WordsView
    const wordsView = new WordsView({ container, store });
    wordsView.setWords(mockWords);
    assert.strictEqual(container.querySelectorAll('.word-dict-card').length, 4, '4 dict cards rendered');

    // 4. StatsView
    const statsView = new StatsView({ container, store, onSetChange: () => {} });
    statsView.setWords(mockWords);
    assert(container.querySelector('.pwa-install-card') !== null, 'PWA card rendered');
});
