/**
 * スピードクイズ（4択 / スペル入力）の進行エンジン
 */

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getMeaningTokens(m) {
    if (!m) return [];
    const cleaned = String(m)
        .replace(/（.*?）|【.*?】|〔.*?〕|\(.*?\)/g, '')
        .replace(/[〜～\.\.…]/g, '')
        .trim();
    return cleaned
        .split(/[、，；,／/]/)
        .map(t => t.trim())
        .filter(Boolean)
        .map(t => t.replace(/^(を|に|と|が|の)/, '').replace(/する$/, '').trim())
        .filter(t => t.length > 0);
}

export function areMeaningsConflicting(m1, m2) {
    const tokens1 = getMeaningTokens(m1);
    const tokens2 = getMeaningTokens(m2);
    if (tokens1.length === 0 || tokens2.length === 0) return false;

    for (const t1 of tokens1) {
        for (const t2 of tokens2) {
            if (t1 === t2) return true;
            if (t1.length >= 2 && t2.length >= 2) {
                if (t1.includes(t2) || t2.includes(t1)) return true;
            }
        }
    }
    return false;
}

export class QuizEngine {
    constructor({ allWords = [], store, timeLimit = 10 }) {
        this.allWords = allWords;
        this.store = store;
        this.quizWords = [];
        this.currentIndex = 0;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.answeredWords = [];
        this.timeLimit = timeLimit;
        this.timerInterval = null;
        this.mode = 'en2ja'; // 'en2ja' | 'ja2en' | 'spelling'
    }

    setWords(words) {
        this.allWords = words;
    }

    startQuiz({ words, limit = 0, timeLimit = 10, mode = 'en2ja', shuffle = true }) {
        let selected = shuffle ? shuffleArray([...words]) : [...words];
        if (limit > 0 && limit < selected.length) {
            selected = selected.slice(0, limit);
        }
        this.quizWords = selected;
        this.timeLimit = timeLimit;
        this.mode = mode;
        this.currentIndex = 0;
        this.score = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.answeredWords = [];
    }

    getCurrentQuestion() {
        if (this.currentIndex >= this.quizWords.length) return null;
        const currentWord = this.quizWords[this.currentIndex];

        let options = [];
        if (this.mode === 'en2ja' || this.mode === 'ja2en') {
            options = this.generateOptions(currentWord, 4);
        }

        return {
            word: currentWord,
            index: this.currentIndex,
            total: this.quizWords.length,
            remaining: this.quizWords.length - this.currentIndex,
            mode: this.mode,
            options,
            combo: this.combo,
            timeLimit: this.timeLimit
        };
    }

    generateOptions(currentWord, count = 4) {
        const options = [currentWord];

        const isDuplicateOrConflicting = (candidate) => {
            if (options.some(opt => opt.id === candidate.id)) return true;
            if (options.some(opt => opt.word.toLowerCase() === candidate.word.toLowerCase())) return true;
            if (options.some(opt => areMeaningsConflicting(opt.meaning, candidate.meaning))) return true;
            return false;
        };

        const tryCollect = (candidates) => {
            const shuffled = shuffleArray([...candidates]);
            for (const c of shuffled) {
                if (options.length >= count) break;
                if (!isDuplicateOrConflicting(c)) {
                    options.push(c);
                }
            }
        };

        // 階層1: 出題範囲内 (this.quizWords) の同品詞（最優先・生徒の学習範囲から選定）
        if (this.quizWords && this.quizWords.length > 0) {
            const inQuizSamePos = this.quizWords.filter(w => w.pos === currentWord.pos);
            tryCollect(inQuizSamePos);
        }

        // 階層2: 出題単語の前後近傍 (同チャプター・前後100語以内) の同品詞
        if (options.length < count && this.allWords && this.allWords.length > 0) {
            const nearbySamePos = this.allWords.filter(w =>
                w.pos === currentWord.pos &&
                Math.abs(w.id - currentWord.id) <= 100
            );
            tryCollect(nearbySamePos);
        }

        // 階層3: 全単語中の同品詞
        if (options.length < count && this.allWords && this.allWords.length > 0) {
            const allSamePos = this.allWords.filter(w => w.pos === currentWord.pos);
            tryCollect(allSamePos);
        }

        // 階層4: 全体からの補充（品詞不問、意味競合は回避）
        if (options.length < count && this.allWords && this.allWords.length > 0) {
            tryCollect(this.allWords);
        }

        shuffleArray(options);
        return options;
    }

    recordAnswer({ isCorrect, isTimeUp = false }) {
        const currentWord = this.quizWords[this.currentIndex];
        if (!currentWord) return;

        if (this.store) {
            this.store.recordResult(currentWord.id, isCorrect);
        }

        if (isCorrect) {
            this.score++;
            this.combo++;
            if (this.combo > this.maxCombo) {
                this.maxCombo = this.combo;
            }
        } else {
            this.combo = 0;
        }

        this.answeredWords.push({
            id: currentWord.id,
            word: currentWord.word,
            meaning: currentWord.meaning,
            pos: currentWord.pos,
            isCorrect,
            isTimeUp
        });
    }

    recordTimeUp() {
        this.recordAnswer({ isCorrect: false, isTimeUp: true });
    }

    nextQuestion() {
        this.currentIndex++;
        return this.currentIndex < this.quizWords.length;
    }

    getWrongWords() {
        return this.answeredWords
            .filter(item => !item.isCorrect)
            .map(item => this.allWords.find(w => w.id === item.id || w.word === item.word))
            .filter(Boolean);
    }

    getResults() {
        const total = this.quizWords.length;
        const accuracy = total > 0 ? Math.round((this.score / total) * 100) : 0;
        return {
            score: this.score,
            total,
            accuracy,
            maxCombo: this.maxCombo,
            details: this.answeredWords,
            wrongWords: this.getWrongWords()
        };
    }

    startTimer({ onTick, onTimeUp }) {
        this.stopTimer();
        if (this.timeLimit <= 0) return;

        let timeRemaining = this.timeLimit;
        const startTime = Date.now();

        this.timerInterval = setInterval(() => {
            const elapsed = (Date.now() - startTime) / 1000;
            timeRemaining = this.timeLimit - elapsed;

            if (timeRemaining <= 0) {
                timeRemaining = 0;
                this.stopTimer();
                if (onTick) onTick(0, 0);
                if (onTimeUp) onTimeUp();
                return;
            }

            const percentage = (timeRemaining / this.timeLimit) * 100;
            if (onTick) onTick(timeRemaining, percentage);
        }, 100);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
}
