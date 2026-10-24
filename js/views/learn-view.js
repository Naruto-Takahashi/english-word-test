/**
 * 「学習（テスト）」タブの画面View
 * 授業用テスト（問題数選択・カスタム範囲テスト）、スマート復習、チャプター一覧
 */

import { icons } from '../modules/icons.js?v=5.00';

export class LearnView {
    constructor({ container, store, onStartQuiz }) {
        this.container = container;
        this.store = store;
        this.onStartQuiz = onStartQuiz;
        this.allWords = [];
        this.quizLimit = 20; // デフォルト問題数: 20問（授業で扱いやすいボリューム）
        this.customStart = 1;
        this.customEnd = 100;
    }

    setWords(words) {
        this.allWords = words;
        if (words.length > 0) {
            this.customEnd = Math.min(100, words[words.length - 1].id);
        }
        this.render();
    }

    render() {
        if (!this.container) return;
        const stats = this.store.getOverallStats(this.allWords);
        const weakWords = this.store.getWeakWords(this.allWords);
        const bookmarkedWords = this.store.getBookmarkedWords(this.allWords);

        // チャプター一覧の生成（100語刻み）
        const chapters = [];
        const maxId = this.allWords.length > 0 ? this.allWords[this.allWords.length - 1].id : 0;
        const step = 100;
        const totalChapters = Math.ceil(maxId / step);

        for (let i = 0; i < totalChapters; i++) {
            const startId = i * step + 1;
            const endId = Math.min((i + 1) * step, maxId);
            const progress = this.store.getChapterProgress(this.allWords, startId, endId);
            chapters.push({ index: i + 1, startId, endId, progress });
        }

        const limitLabel = this.quizLimit === 0 ? '全問' : `${this.quizLimit}問`;

        // クイックスタート用の単語選定（苦手優先、なければ未学習、それもなければ全体）
        let quickWords = weakWords;
        let quickModeTitle = '苦手克服クイック演習';
        let quickModeSub = `${weakWords.length} 語の要復習単語を優先出題`;
        if (quickWords.length === 0) {
            const newWords = this.allWords.filter(w => this.store.getWordRecord(w.id).status === 'new');
            if (newWords.length > 0) {
                quickWords = newWords;
                quickModeTitle = '新規単語クイック演習';
                quickModeSub = `未学習 ${newWords.length} 語から出題`;
            } else {
                quickWords = this.allWords;
                quickModeTitle = '総合クイック演習';
                quickModeSub = `全 ${this.allWords.length} 語からランダム出題`;
            }
        }

        this.container.innerHTML = `
            <div class="learn-layout-grid">
                <!-- 左側コントロールカラム（Hero・進捗・問題数・カスタム範囲・復習） -->
                <div class="learn-control-col">
                    <!-- Hero クイックスタートカード -->
                    <div class="hero-start-card">
                        <div class="hero-card-glow"></div>
                        <div class="hero-content">
                            <div class="hero-tag">
                                <span class="hero-pulse-dot"></span>
                                <span>Recommended</span>
                            </div>
                            <h2 class="hero-title">${quickModeTitle}</h2>
                            <p class="hero-subtitle">${quickModeSub} (${limitLabel})</p>
                            <button id="btn-hero-quick-start" class="btn btn-hero-start" type="button">
                                <span class="btn-hero-icon">${icons.zap(20)}</span>
                                <span class="btn-hero-text">今すぐテストを開始</span>
                            </button>
                        </div>
                    </div>

                    <!-- 進捗サマリーカード -->
                    <div class="summary-card">
                        <div class="summary-header">
                            <div>
                                <span class="summary-subtitle">習得進捗</span>
                                <h3 class="summary-title">${stats.percentage}% <small>達成</small></h3>
                            </div>
                            <div class="summary-badge">${stats.mastered} / ${stats.total} 語マスター</div>
                        </div>

                        <div class="progress-bar-stacked" role="progressbar" aria-valuenow="${stats.percentage}" aria-valuemin="0" aria-valuemax="100">
                            <div class="bar-mastered" style="width: ${(stats.mastered / stats.total) * 100}%" title="マスター: ${stats.mastered}"></div>
                            <div class="bar-learning" style="width: ${(stats.learning / stats.total) * 100}%" title="学習中: ${stats.learning}"></div>
                            <div class="bar-weak" style="width: ${(stats.weak / stats.total) * 100}%" title="要復習: ${stats.weak}"></div>
                        </div>

                        <div class="legend-row">
                            <span class="legend-item"><span class="dot dot-mastered"></span>マスター: ${stats.mastered}</span>
                            <span class="legend-item"><span class="dot dot-learning"></span>学習中: ${stats.learning}</span>
                            <span class="legend-item"><span class="dot dot-weak"></span>要復習: ${stats.weak}</span>
                            <span class="legend-item"><span class="dot dot-new"></span>未学習: ${stats.new}</span>
                        </div>
                    </div>

                    <!-- 出題問題数の選択バー -->
                    <div class="quiz-limit-card">
                        <div class="quiz-limit-header">
                            <span class="quiz-limit-title">1回の出題数</span>
                            <span class="quiz-limit-badge">${limitLabel}</span>
                        </div>
                        <div class="limit-selector-pills" role="radiogroup" aria-label="出題問題数">
                            <button class="limit-pill ${this.quizLimit === 20 ? 'active' : ''}" data-limit="20" role="radio" aria-checked="${this.quizLimit === 20}">20問</button>
                            <button class="limit-pill ${this.quizLimit === 30 ? 'active' : ''}" data-limit="30" role="radio" aria-checked="${this.quizLimit === 30}">30問</button>
                            <button class="limit-pill ${this.quizLimit === 50 ? 'active' : ''}" data-limit="50" role="radio" aria-checked="${this.quizLimit === 50}">50問</button>
                            <button class="limit-pill ${this.quizLimit === 0 ? 'active' : ''}" data-limit="0" role="radio" aria-checked="${this.quizLimit === 0}">全問</button>
                        </div>
                    </div>

                    <!-- クイックアクション（復習・特訓） -->
                    <div class="quick-actions-grid">
                        <button id="quick-weak-btn" class="quick-action-card ${weakWords.length === 0 ? 'disabled' : ''}" type="button">
                            <div class="quick-action-icon weak-icon">${icons.rotateCcw(20)}</div>
                            <div class="quick-action-info">
                                <div class="quick-action-title">苦手単語の復習</div>
                                <div class="quick-action-desc">${weakWords.length} 語 (${limitLabel})</div>
                            </div>
                        </button>

                        <button id="quick-bookmark-btn" class="quick-action-card ${bookmarkedWords.length === 0 ? 'disabled' : ''}" type="button">
                            <div class="quick-action-icon star-icon">${icons.star(20, '', true)}</div>
                            <div class="quick-action-info">
                                <div class="quick-action-title">ブックマーク特訓</div>
                                <div class="quick-action-desc">${bookmarkedWords.length} 語 (${limitLabel})</div>
                            </div>
                        </button>
                    </div>

                    <!-- 授業用カスタム範囲テスト -->
                    <div class="custom-range-card">
                        <div class="custom-range-header">
                            <div>
                                <span class="custom-range-title">範囲指定テスト</span>
                                <span class="custom-range-desc">授業や宿題の範囲に合わせて出題</span>
                            </div>
                        </div>
                        <div class="range-inputs-row">
                            <div class="range-inputs-pair">
                                <div class="range-input-group">
                                    <label for="custom-start-id">開始</label>
                                    <input type="number" id="custom-start-id" value="${this.customStart}" min="1" max="${maxId}">
                                </div>
                                <span class="range-separator">〜</span>
                                <div class="range-input-group">
                                    <label for="custom-end-id">終了</label>
                                    <input type="number" id="custom-end-id" value="${this.customEnd}" min="1" max="${maxId}">
                                </div>
                            </div>
                            <button id="btn-start-custom-quiz" class="btn btn-primary range-start-btn" type="button">
                                ${icons.zap(16)} テスト開始
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 右側チャプターカラム -->
                <div class="learn-chapters-col">
                    <div class="chapters-section">
                        <div class="section-header-row">
                            <div>
                                <h3 class="section-heading">チャプター別演習</h3>
                                <span class="section-subtext">各Section 100語から ${limitLabel} 出題</span>
                            </div>
                        </div>
                        <div class="chapters-grid">
                            ${chapters.map(ch => `
                                <div class="chapter-card" data-chapter="${ch.index}">
                                    <div class="chapter-header">
                                        <div class="chapter-title-group">
                                            <span class="chapter-badge">Section ${ch.index}</span>
                                            <span class="chapter-range">No. ${ch.startId} - ${ch.endId}</span>
                                        </div>
                                        <span class="chapter-percent">${ch.progress.percentage}%</span>
                                    </div>
                                    <div class="chapter-bar-bg" aria-hidden="true">
                                        <div class="chapter-bar-fill" style="width: ${ch.progress.percentage}%"></div>
                                    </div>
                                    <button class="btn-chapter-quiz btn-primary-outline" data-start="${ch.startId}" data-end="${ch.endId}" type="button">
                                        ${icons.zap(14)} Section ${ch.index} (${limitLabel})
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Hero クイックスタートボタン
        const heroBtn = this.container.querySelector('#btn-hero-quick-start');
        if (heroBtn) {
            heroBtn.addEventListener('click', () => {
                this.onStartQuiz({
                    words: quickWords,
                    title: quickModeTitle,
                    limit: this.quizLimit
                });
            });
        }

        // 問題数ピルの切り替え
        this.container.querySelectorAll('.limit-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                this.quizLimit = parseInt(pill.dataset.limit, 10);
                this.render();
            });
        });

        // カスタム範囲テスト
        const startInput = this.container.querySelector('#custom-start-id');
        const endInput = this.container.querySelector('#custom-end-id');
        const customStartBtn = this.container.querySelector('#btn-start-custom-quiz');

        if (startInput) {
            startInput.addEventListener('change', (e) => {
                this.customStart = Math.max(1, parseInt(e.target.value, 10) || 1);
            });
        }
        if (endInput) {
            endInput.addEventListener('change', (e) => {
                this.customEnd = Math.min(maxId, parseInt(e.target.value, 10) || maxId);
            });
        }
        if (customStartBtn) {
            customStartBtn.addEventListener('click', () => {
                const s = Math.min(this.customStart, this.customEnd);
                const e = Math.max(this.customStart, this.customEnd);
                const words = this.allWords.filter(w => w.id >= s && w.id <= e);
                if (words.length === 0) {
                    alert('指定された範囲に対象の単語がありません。');
                    return;
                }
                this.onStartQuiz({
                    words,
                    title: `テスト (No. ${s} - ${e})`,
                    limit: this.quizLimit
                });
            });
        }

        // イベントバインド: 苦手単語
        const weakBtn = this.container.querySelector('#quick-weak-btn');
        if (weakBtn && weakWords.length > 0) {
            weakBtn.addEventListener('click', () => {
                this.onStartQuiz({
                    words: weakWords,
                    title: '苦手単語スマート復習',
                    limit: this.quizLimit
                });
            });
        }

        // イベントバインド: ブックマーク
        const bookmarkBtn = this.container.querySelector('#quick-bookmark-btn');
        if (bookmarkBtn && bookmarkedWords.length > 0) {
            bookmarkBtn.addEventListener('click', () => {
                this.onStartQuiz({
                    words: bookmarkedWords,
                    title: 'ブックマーク特訓',
                    limit: this.quizLimit
                });
            });
        }

        // チャプター別テストボタン
        this.container.querySelectorAll('.btn-chapter-quiz').forEach(btn => {
            btn.addEventListener('click', () => {
                const startId = parseInt(btn.dataset.start, 10);
                const endId = parseInt(btn.dataset.end, 10);
                const words = this.allWords.filter(w => w.id >= startId && w.id <= endId);
                this.onStartQuiz({
                    words,
                    title: `Section ${btn.closest('.chapter-card').dataset.chapter} (No. ${startId} - ${endId})`,
                    limit: this.quizLimit
                });
            });
        });
    }
}
