/**
 * VocabFlow の統合状態管理モジュール（Store）
 * 単語の4段階ステータス（new, weak, learning, mastered）、ブックマーク、設定、バックアップを一元管理
 */

export const STATUS = {
    NEW: 'new',
    WEAK: 'weak',
    LEARNING: 'learning',
    MASTERED: 'mastered'
};

export class VocabStore {
    constructor() {
        this.currentSet = '1400';
        this.wordStats = {};
        this.settings = {
            autoAdvance: true,
            autoSpeak: true,
            soundEnabled: true,
            timeLimit: 10, // 10秒（標準） / 5秒 / 0秒（制限なし）
            quizMode: 'en2ja', // 'en2ja' | 'ja2en'
            quizOrder: 'random', // 'random' | 'sequential'
            wordsMask: 'none', // 'none' | 'meaning' | 'word'
            wordsViewMode: 'list' // 'list' | 'card'
        };
        this.load();
    }

    getStorageKey(set = this.currentSet) {
        return `vocabflow_stats_${set}`;
    }

    getSettingsKey() {
        return 'vocabflow_settings';
    }

    load(set = this.currentSet) {
        this.currentSet = set;
        try {
            const rawStats = localStorage.getItem(this.getStorageKey(set));
            this.wordStats = rawStats ? JSON.parse(rawStats) : {};

            const rawSettings = localStorage.getItem(this.getSettingsKey());
            if (rawSettings) {
                this.settings = { ...this.settings, ...JSON.parse(rawSettings) };
            }
        } catch (e) {
            console.error('Failed to load store data:', e);
            this.wordStats = {};
        }
    }

    save() {
        try {
            localStorage.setItem(this.getStorageKey(this.currentSet), JSON.stringify(this.wordStats));
            localStorage.setItem(this.getSettingsKey(), JSON.stringify(this.settings));
        } catch (e) {
            console.error('Failed to save store data:', e);
        }
    }

    getWordRecord(id) {
        return this.wordStats[id] || {
            status: STATUS.NEW,
            correctCount: 0,
            incorrectCount: 0,
            streak: 0,
            bookmarked: false,
            lastStudiedAt: null
        };
    }

    recordResult(id, isCorrect) {
        const record = this.getWordRecord(id);
        const now = Date.now();

        if (isCorrect) {
            record.correctCount++;
            record.streak++;
            if (record.streak >= 3) {
                record.status = STATUS.MASTERED;
            } else {
                record.status = STATUS.LEARNING;
            }
        } else {
            record.incorrectCount++;
            record.streak = 0;
            record.status = STATUS.WEAK;
        }

        record.lastStudiedAt = now;
        this.wordStats[id] = record;
        this.save();
        return record;
    }

    setWordStatus(id, status) {
        const record = this.getWordRecord(id);
        record.status = status;
        if (status === STATUS.MASTERED) {
            record.streak = Math.max(record.streak, 3);
            record.correctCount++;
        } else if (status === STATUS.WEAK) {
            record.streak = 0;
            record.incorrectCount++;
        }
        record.lastStudiedAt = Date.now();
        this.wordStats[id] = record;
        this.save();
        return record;
    }

    toggleBookmark(id) {
        const record = this.getWordRecord(id);
        record.bookmarked = !record.bookmarked;
        this.wordStats[id] = record;
        this.save();
        return record.bookmarked;
    }

    isBookmarked(id) {
        return !!this.wordStats[id]?.bookmarked;
    }

    getWeakWords(allWords) {
        return allWords.filter(word => {
            const record = this.wordStats[word.id];
            return record && record.status === STATUS.WEAK;
        });
    }

    getBookmarkedWords(allWords) {
        return allWords.filter(word => {
            const record = this.wordStats[word.id];
            return record && record.bookmarked;
        });
    }

    getChapterProgress(words, startId, endId) {
        const chapterWords = words.filter(w => w.id >= startId && w.id <= endId);
        const total = chapterWords.length;
        if (total === 0) return { total: 0, new: 0, weak: 0, learning: 0, mastered: 0, percentage: 0 };

        let counts = { new: 0, weak: 0, learning: 0, mastered: 0 };
        chapterWords.forEach(w => {
            const status = this.getWordRecord(w.id).status;
            counts[status]++;
        });

        const percentage = Math.round((counts.mastered / total) * 100);
        return { total, ...counts, percentage };
    }

    getOverallStats(words) {
        const total = words.length;
        if (total === 0) return { total: 0, new: 0, weak: 0, learning: 0, mastered: 0, percentage: 0 };

        let counts = { new: 0, weak: 0, learning: 0, mastered: 0 };
        words.forEach(w => {
            const status = this.getWordRecord(w.id).status;
            counts[status]++;
        });

        const percentage = Math.round((counts.mastered / total) * 100);
        return { total, ...counts, percentage };
    }

    exportJSON() {
        const payload = {
            version: '2.0',
            exportedAt: new Date().toISOString(),
            currentSet: this.currentSet,
            wordStats: this.wordStats,
            settings: this.settings
        };
        return JSON.stringify(payload, null, 2);
    }

    importJSON(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (!data.wordStats) throw new Error('Invalid format: missing wordStats');
            this.wordStats = data.wordStats;
            if (data.settings) this.settings = { ...this.settings, ...data.settings };
            this.save();
            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    resetMasteredToLearning() {
        let count = 0;
        for (const id in this.wordStats) {
            if (this.wordStats[id] && this.wordStats[id].status === STATUS.MASTERED) {
                this.wordStats[id].status = STATUS.LEARNING;
                this.wordStats[id].streak = 0;
                count++;
            }
        }
        if (count > 0) this.save();
        return count;
    }

    clearWeakStatus() {
        let count = 0;
        for (const id in this.wordStats) {
            if (this.wordStats[id] && this.wordStats[id].status === STATUS.WEAK) {
                this.wordStats[id].status = STATUS.LEARNING;
                this.wordStats[id].streak = 0;
                count++;
            }
        }
        if (count > 0) this.save();
        return count;
    }

    resetCurrentSetData() {
        this.wordStats = {};
        this.save();
    }
}
