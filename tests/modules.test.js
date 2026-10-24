import test from 'node:test';
import assert from 'node:assert/strict';
import { target1200Data } from '../data/target1200.js';
import { target1400Data } from '../data/target1400.js';
import { parseTSV, extractPos, preprocessWords } from '../js/modules/parser.js';
import { VocabStore, STATUS } from '../js/modules/store.js';
import { QuizEngine, areMeaningsConflicting, getMeaningTokens } from '../js/modules/quiz-engine.js';
import { icons } from '../js/modules/icons.js';
import { getWordHint } from '../data/hints1400.js';

// モック用localStorage
const storeMap = {};
global.localStorage = {
    getItem: (k) => storeMap[k] || null,
    setItem: (k, v) => { storeMap[k] = v; },
    removeItem: (k) => { delete storeMap[k]; },
    clear: () => { Object.keys(storeMap).forEach(k => delete storeMap[k]); }
};

test('Parser parses TSV and extracts POS correctly', () => {
    const words = preprocessWords(parseTSV(target1400Data));
    assert(words.length > 1000);
    assert.equal(words[0].id, 1);
    assert.equal(words[0].word, 'believe');

    assert.equal(extractPos('（名）本'), '名詞');
    assert.equal(extractPos('走る'), '動詞');
    assert.equal(extractPos('美しい'), '形容詞');
});

test('VocabStore tracks 4-stage SRS statuses, bookmarks, and chapters', () => {
    global.localStorage.clear();
    const store = new VocabStore();
    const words = preprocessWords(parseTSV(target1400Data)).slice(0, 10);

    // 初期状態は NEW
    assert.equal(store.getWordRecord(1).status, STATUS.NEW);

    // 1回正解 -> LEARNING
    store.recordResult(1, true);
    assert.equal(store.getWordRecord(1).status, STATUS.LEARNING);
    assert.equal(store.getWordRecord(1).streak, 1);

    // 3回連続正解 -> MASTERED
    store.recordResult(1, true);
    store.recordResult(1, true);
    assert.equal(store.getWordRecord(1).status, STATUS.MASTERED);
    assert.equal(store.getWordRecord(1).streak, 3);

    // 1回不正解 -> WEAK（streakリセット）
    store.recordResult(1, false);
    assert.equal(store.getWordRecord(1).status, STATUS.WEAK);
    assert.equal(store.getWordRecord(1).streak, 0);

    // 苦手単語一覧
    const weakList = store.getWeakWords(words);
    assert.equal(weakList.length, 1);
    assert.equal(weakList[0].id, 1);

    // ブックマーク
    assert.equal(store.isBookmarked(1), false);
    store.toggleBookmark(1);
    assert.equal(store.isBookmarked(1), true);

    // バックアップ＆リストア
    const jsonStr = store.exportJSON();
    assert(jsonStr.includes('vocabflow_stats_1400') || jsonStr.includes('wordStats'));

    const newStore = new VocabStore();
    const importRes = newStore.importJSON(jsonStr);
    assert.equal(importRes.success, true);
    assert.equal(newStore.getWordRecord(1).status, STATUS.WEAK);
});

test('QuizEngine runs 4-choice speed quiz and tracks combos', () => {
    const words = preprocessWords(parseTSV(target1400Data)).slice(0, 10);
    const store = new VocabStore();
    const engine = new QuizEngine({ allWords: words, store });

    engine.startQuiz({ words, mode: 'en2ja', shuffle: false });
    assert.equal(engine.quizWords.length, 10);

    // 1問目 (4択)
    const q1 = engine.getCurrentQuestion();
    assert.equal(q1.options.length, 4);
    assert(q1.options.some(opt => opt.id === q1.word.id));

    // 正解回答でコンボ増加
    engine.recordAnswer({ isCorrect: true });
    assert.equal(engine.score, 1);
    assert.equal(engine.combo, 1);

    // 2問目正解でコンボ2
    assert.equal(engine.nextQuestion(), true);
    engine.recordAnswer({ isCorrect: true });
    assert.equal(engine.score, 2);
    assert.equal(engine.combo, 2);

    // 3問目不正解でコンボ0にリセット
    assert.equal(engine.nextQuestion(), true);
    engine.recordAnswer({ isCorrect: false });
    assert.equal(engine.score, 2);
    assert.equal(engine.combo, 0);
    assert.equal(engine.maxCombo, 2);

    const wrongList = engine.getWrongWords();
    assert.equal(wrongList.length, 1);
    assert.equal(wrongList[0].id, words[2].id);

    // 4問目: 正解でコンボ1
    assert.equal(engine.nextQuestion(), true);
    engine.recordAnswer({ isCorrect: true });
    assert.equal(engine.combo, 1);

    // 5問目: タイムアップで不正解記録＆コンボ0
    assert.equal(engine.nextQuestion(), true);
    assert.equal(engine.getCurrentQuestion().timeLimit, 10);
    engine.recordTimeUp();
    assert.equal(engine.combo, 0);
    assert.equal(engine.answeredWords[4].isTimeUp, true);
    assert.equal(engine.answeredWords[4].isCorrect, false);
    assert.equal(store.getWordRecord(words[4].id).streak, 0);
});

test('QuizEngine supports question limit for classroom tests', () => {
    const words = preprocessWords(parseTSV(target1400Data)).slice(0, 100);
    const store = new VocabStore();
    const engine = new QuizEngine({ allWords: words, store });

    // 100語中 25問 出題
    engine.startQuiz({ words, limit: 25 });
    assert.equal(engine.quizWords.length, 25);

    // 0指定なら全問
    engine.startQuiz({ words, limit: 0 });
    assert.equal(engine.quizWords.length, 100);
});

test('QuizEngine generates contextual dummy options avoiding conflicting meanings', () => {
    const allWords = preprocessWords(parseTSV(target1400Data));
    const quizWords = allWords.slice(0, 30); // No. 1〜30（動詞中心）
    const engine = new QuizEngine({ allWords, store: new VocabStore() });

    engine.startQuiz({ words: quizWords, shuffle: false });
    const q = engine.getCurrentQuestion(); // No. 1: believe (動詞)

    assert.equal(q.options.length, 4);
    // 正解が含まれていること
    assert(q.options.some(opt => opt.id === q.word.id));
    // 4つの選択肢はすべて一意であること
    const ids = q.options.map(opt => opt.id);
    assert.equal(new Set(ids).size, 4);
    // 出題範囲（quizWords）内の同品詞（動詞）が優先されていること
    const inRangeCount = q.options.filter(opt => opt.id <= 30).length;
    assert(inRangeCount >= 3); // 4択中少なくとも3問以上が出題範囲内の同品詞から選ばれている
    // 全て動詞であること
    assert(q.options.every(opt => opt.pos === '動詞'));

    // 意味衝突ロジックの単体テスト
    const tokens = getMeaningTokens('（〜を）信じる、思う');
    assert.deepEqual(tokens, ['信じる', '思う']);
    assert.equal(areMeaningsConflicting('状況', '状態、状況'), true);
    assert.equal(areMeaningsConflicting('信じる', 'を信じる'), true);
    assert.equal(areMeaningsConflicting('起こる', '起こる、生じる'), true);
    assert.equal(areMeaningsConflicting('増える', '成長する'), false);
    assert.equal(areMeaningsConflicting('形状、用紙', '状況'), false);
});

test('Icons module renders clean SVG strings', () => {
    assert(icons.zap().includes('<svg') && icons.zap().includes('viewBox="0 0 24 24"'));
    assert(icons.star(20, '', true).includes('fill="currentColor"'));
    assert(icons.star(20, '', false).includes('fill="none"'));
    assert(icons.bookOpen().includes('<svg'));
    assert(icons.rotateCcw().includes('<svg'));
    assert(icons.chevronDown().includes('<polyline points="6 9 12 15 18 9"'));
    assert(icons.share().includes('polyline points="16 6 12 2 8 6"'));
    assert(icons.smartphone().includes('<rect width="14" height="20"'));
    assert(icons.eye(14).includes('<svg') && icons.eye(14).includes('circle cx="12" cy="12"'));
    assert(icons.eyeOff(14).includes('<svg') && icons.eyeOff(14).includes('line x1="2" x2="22"'));
});

test('getWordHint returns rich etymology, loanword link, and grammar note for curated words, null for others', () => {
    // 登録済み単語（No. 1: believe）
    const h1 = getWordHint({ id: 1, word: 'believe', meaning: 'を信じる', pos: '動詞' });
    assert(h1);
    assert(h1.origin.includes('lieve'));
    assert(h1.link.includes('ビリーフ'));
    assert(h1.note && h1.note.includes('believe in'));

    // 未登録単語（例: No. 9999）は null を返す（無意味な枠を表示させない）
    const hUnregistered = getWordHint({ id: 9999, word: 'transformation', meaning: '変形', pos: '名詞' });
    assert.equal(hUnregistered, null);
});

test('VocabStore settings and review maintenance methods', () => {
    global.localStorage.clear();
    const store = new VocabStore();

    // デフォルト設定の確認
    assert.equal(store.settings.timeLimit, 10);
    assert.equal(store.settings.quizMode, 'en2ja');
    assert.equal(store.settings.quizOrder, 'random');
    assert.equal(store.settings.wordsMask, 'none');

    // 設定の保存と復元
    store.settings.timeLimit = 5;
    store.settings.quizMode = 'ja2en';
    store.settings.wordsMask = 'meaning';
    store.save();

    const store2 = new VocabStore();
    assert.equal(store2.settings.timeLimit, 5);
    assert.equal(store2.settings.quizMode, 'ja2en');
    assert.equal(store2.settings.wordsMask, 'meaning');

    // 単語ステータスの設定
    // 単語1: 3連勝で MASTERED
    store.recordResult(1, true);
    store.recordResult(1, true);
    store.recordResult(1, true);
    assert.equal(store.getWordRecord(1).status, STATUS.MASTERED);

    // 単語2: 不正解で WEAK
    store.recordResult(2, false);
    assert.equal(store.getWordRecord(2).status, STATUS.WEAK);

    // 周回学習: MASTERED -> LEARNING
    const resetCount = store.resetMasteredToLearning();
    assert.equal(resetCount, 1);
    assert.equal(store.getWordRecord(1).status, STATUS.LEARNING);
    assert.equal(store.getWordRecord(1).streak, 0);

    // 要復習クリア: WEAK -> LEARNING
    const clearCount = store.clearWeakStatus();
    assert.equal(clearCount, 1);
    assert.equal(store.getWordRecord(2).status, STATUS.LEARNING);
    assert.equal(store.getWordRecord(2).streak, 0);
});

test('QuizEngine supports ja2en mode and custom time limits', () => {
    const words = preprocessWords(parseTSV(target1400Data)).slice(0, 10);
    const store = new VocabStore();
    const engine = new QuizEngine({ allWords: words, store });

    // ja2en モード & 制限時間 5秒
    engine.startQuiz({ words, mode: 'ja2en', timeLimit: 5, shuffle: false });
    const q = engine.getCurrentQuestion();

    assert.equal(q.mode, 'ja2en');
    assert.equal(q.timeLimit, 5);
    assert.equal(q.word.id, 1);
    assert.equal(q.word.word, 'believe');
    assert(q.options.some(opt => opt.id === q.word.id));
});


