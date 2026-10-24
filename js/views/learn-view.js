/**
 * テスト画面View
 * 出題条件の直前設定（形式・問題数・制限時間・順序）、チャプター別テスト、カスタム範囲テスト
 */

import { icons } from '../modules/icons.js?v=5.80';

export class LearnView {
    constructor({ container, store, onStartQuiz }) {
        this.container = container;
        this.store = store;
        this.onStartQuiz = onStartQuiz;
        this.allWords = [];
        this.customStart = 1;
        this.customEnd = 100;
    }

    setWords(words) {
        this.allWords = words || [];
        if (this.allWords.length > 0) {
            this.customEnd = Math.min(100, this.allWords[this.allWords.length - 1].id);
        }
        this.render();
    }

    render() {
        if (!this.container) return;

        const maxId = this.allWords.length > 0 ? this.allWords[this.allWords.length - 1].id : 0;
        const step = 100;
        const totalChapters = Math.max(1, Math.ceil(maxId / step));
        const chapters = [];

        for (let i = 0; i < totalChapters; i++) {
            const startId = i * step + 1;
            const endId = Math.min((i + 1) * step, maxId);
            const progress = this.store.getChapterProgress(this.allWords, startId, endId);
            chapters.push({ index: i + 1, startId, endId, progress });
        }

        const settings = this.store.settings;
        const quizMode = settings.quizMode || 'en2ja';
        const quizLimit = typeof settings.quizLimit === 'number' ? settings.quizLimit : 20;
        const timeLimit = typeof settings.timeLimit === 'number' ? settings.timeLimit : 10;
        const quizOrder = settings.quizOrder || 'random';

        const weakWords = this.store.getWeakWords(this.allWords);
        const bookmarkedWords = this.store.getBookmarkedWords(this.allWords);

        this.container.innerHTML = `
            <div class="test-view-container" aria-label="テスト画面">
                <!-- テスト出題条件バー（ピル型全廃: スリムなセレクトメニュー群） -->
                <div class="test-config-card">
                    <div class="test-config-header">
                        <span class="test-config-title">${icons.sliders(16)} テスト条件設定</span>
                        <span class="test-config-note">各テストに即時適用されます</span>
                    </div>
                    <div class="test-config-grid">
                        <!-- 出題形式 -->
                        <div class="config-field">
                            <label class="config-label" for="cfg-quiz-mode">出題形式</label>
                            <div class="config-select-wrap">
                                <select id="cfg-quiz-mode" class="config-select">
                                    <option value="en2ja" ${quizMode === 'en2ja' ? 'selected' : ''}>英 → 日 (意味を答える)</option>
                                    <option value="ja2en" ${quizMode === 'ja2en' ? 'selected' : ''}>日 → 英 (単語を答える)</option>
                                </select>
                                <span class="select-chevron">${icons.chevronDown(13)}</span>
                            </div>
                        </div>

                        <!-- 1回の問題数 -->
                        <div class="config-field">
                            <label class="config-label" for="cfg-quiz-limit">問題数</label>
                            <div class="config-select-wrap">
                                <select id="cfg-quiz-limit" class="config-select">
                                    <option value="20" ${quizLimit === 20 ? 'selected' : ''}>20問 (標準)</option>
                                    <option value="30" ${quizLimit === 30 ? 'selected' : ''}>30問</option>
                                    <option value="50" ${quizLimit === 50 ? 'selected' : ''}>50問</option>
                                    <option value="0" ${quizLimit === 0 ? 'selected' : ''}>全問 (範囲内すべて)</option>
                                </select>
                                <span class="select-chevron">${icons.chevronDown(13)}</span>
                            </div>
                        </div>

                        <!-- 制限時間 -->
                        <div class="config-field">
                            <label class="config-label" for="cfg-time-limit">制限時間</label>
                            <div class="config-select-wrap">
                                <select id="cfg-time-limit" class="config-select">
                                    <option value="10" ${timeLimit === 10 ? 'selected' : ''}>10秒 (標準)</option>
                                    <option value="5" ${timeLimit === 5 ? 'selected' : ''}>5秒 (実戦スピード)</option>
                                    <option value="0" ${timeLimit === 0 ? 'selected' : ''}>制限なし</option>
                                </select>
                                <span class="select-chevron">${icons.chevronDown(13)}</span>
                            </div>
                        </div>

                        <!-- 出題順序 -->
                        <div class="config-field">
                            <label class="config-label" for="cfg-quiz-order">出題順序</label>
                            <div class="config-select-wrap">
                                <select id="cfg-quiz-order" class="config-select">
                                    <option value="random" ${quizOrder === 'random' ? 'selected' : ''}>ランダム順</option>
                                    <option value="sequential" ${quizOrder === 'sequential' ? 'selected' : ''}>No.順 (番号通り)</option>
                                </select>
                                <span class="select-chevron">${icons.chevronDown(13)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 授業・小テスト用カスタム範囲指定テスト -->
                <div class="custom-range-card">
                    <div class="custom-range-header">
                        <span class="custom-range-title">範囲指定テスト</span>
                        <span class="custom-range-desc">授業・小テストの指定範囲（No.〜No.）から出題</span>
                    </div>
                    <div class="range-inputs-row">
                        <div class="range-inputs-pair">
                            <div class="range-input-group">
                                <label for="custom-start-id">開始 No.</label>
                                <input type="number" id="custom-start-id" inputmode="numeric" value="${this.customStart}" min="1" max="${maxId}">
                            </div>
                            <span class="range-separator">〜</span>
                            <div class="range-input-group">
                                <label for="custom-end-id">終了 No.</label>
                                <input type="number" id="custom-end-id" inputmode="numeric" value="${this.customEnd}" min="1" max="${maxId}">
                            </div>
                        </div>
                        <button id="btn-start-custom-quiz" class="btn btn-primary range-start-btn" type="button">
                            ${icons.zap(16)} テスト開始
                        </button>
                    </div>
                </div>

                <!-- 弱点・お気に入り特訓テスト -->
                ${(weakWords.length > 0 || bookmarkedWords.length > 0) ? `
                    <div class="test-quick-row">
                        ${weakWords.length > 0 ? `
                            <button id="test-weak-btn" class="test-quick-btn btn-weak" type="button">
                                ${icons.rotateCcw(16)} 苦手復習テスト (${weakWords.length}語)
                            </button>
                        ` : ''}
                        ${bookmarkedWords.length > 0 ? `
                            <button id="test-bookmark-btn" class="test-quick-btn btn-star" type="button">
                                ${icons.star(16, '', true)} お気に入りテスト (${bookmarkedWords.length}語)
                            </button>
                        ` : ''}
                    </div>
                ` : ''}

                <!-- チャプター別テスト（メイングリッド） -->
                <div class="chapters-section">
                    <div class="section-header-row">
                        <h3 class="section-heading">セクション別テスト</h3>
                        <span class="section-subtext">タップでテスト開始</span>
                    </div>
                    <div class="chapters-grid">
                        ${chapters.map(ch => `
                            <button class="chapter-card" type="button" data-chapter="${ch.index}">
                                <div class="chapter-header">
                                    <span class="chapter-badge">Section ${ch.index}</span>
                                    <span class="chapter-range">No. ${ch.startId}–${ch.endId}</span>
                                    <span class="chapter-percent">${ch.progress.percentage}%</span>
                                </div>
                                <div class="chapter-bar-bg">
                                    <div class="chapter-bar-fill" style="width: ${ch.progress.percentage}%"></div>
                                </div>
                                <div class="chapter-meta">
                                    <span class="chapter-mastered">${ch.progress.mastered} / ${ch.progress.total} 習得</span>
                                    <span class="chapter-action-hint">${icons.zap(12)} 開始</span>
                                </div>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        // 出題設定の変更イベント
        const bindSelect = (id, key, parseNumber = false) => {
            const el = this.container.querySelector(id);
            if (el) {
                el.addEventListener('change', (e) => {
                    const val = parseNumber ? parseInt(e.target.value, 10) : e.target.value;
                    this.store.settings[key] = val;
                    this.store.save();
                });
            }
        };

        bindSelect('#cfg-quiz-mode', 'quizMode', false);
        bindSelect('#cfg-quiz-limit', 'quizLimit', true);
        bindSelect('#cfg-time-limit', 'timeLimit', true);
        bindSelect('#cfg-quiz-order', 'quizOrder', false);

        // チャプタークリックでテスト開始
        this.container.querySelectorAll('.chapter-card').forEach(card => {
            card.addEventListener('click', () => {
                const chapterIndex = parseInt(card.dataset.chapter, 10);
                const startId = (chapterIndex - 1) * 100 + 1;
                const endId = Math.min(chapterIndex * 100, maxId);
                const words = this.allWords.filter(w => typeof w.id === 'number' && w.id >= startId && w.id <= endId);

                if (words.length > 0 && this.onStartQuiz) {
                    const limit = this.store.settings.quizLimit || 20;
                    this.onStartQuiz({
                        words,
                        title: `Section ${chapterIndex} (No. ${startId}–${endId})`,
                        limit
                    });
                }
            });
        });

        // カスタム範囲テスト開始
        const customBtn = this.container.querySelector('#btn-start-custom-quiz');
        if (customBtn) {
            customBtn.addEventListener('click', () => {
                const sVal = parseInt(this.container.querySelector('#custom-start-id')?.value, 10) || 1;
                const eVal = parseInt(this.container.querySelector('#custom-end-id')?.value, 10) || maxId;
                const start = Math.max(1, Math.min(sVal, eVal));
                const end = Math.min(maxId, Math.max(sVal, eVal));

                const words = this.allWords.filter(w => typeof w.id === 'number' && w.id >= start && w.id <= end);
                if (words.length > 0 && this.onStartQuiz) {
                    const limit = this.store.settings.quizLimit || 20;
                    this.onStartQuiz({
                        words,
                        title: `指定範囲テスト (No. ${start}–${end})`,
                        limit
                    });
                }
            });
        }

        // 苦手復習テスト
        const weakBtn = this.container.querySelector('#test-weak-btn');
        if (weakBtn) {
            weakBtn.addEventListener('click', () => {
                if (weakWords.length > 0 && this.onStartQuiz) {
                    const limit = this.store.settings.quizLimit || 20;
                    this.onStartQuiz({
                        words: weakWords,
                        title: `苦手単語の特訓 (${weakWords.length}語)`,
                        limit
                    });
                }
            });
        }

        // お気に入りテスト
        const bkmBtn = this.container.querySelector('#test-bookmark-btn');
        if (bkmBtn) {
            bkmBtn.addEventListener('click', () => {
                if (bookmarkedWords.length > 0 && this.onStartQuiz) {
                    const limit = this.store.settings.quizLimit || 20;
                    this.onStartQuiz({
                        words: bookmarkedWords,
                        title: `お気に入り特訓 (${bookmarkedWords.length}語)`,
                        limit
                    });
                }
            });
        }
    }
}
