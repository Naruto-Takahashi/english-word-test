/**
 * ホーム画面View
 * 学習ダッシュボード、現在地・総合進捗、ワンタップスマート学習アクション
 */

import { icons } from '../modules/icons.js?v=5.80';

export class HomeView {
    constructor({ container, store, onStartQuiz, onNavigateTab, onSetChange }) {
        this.container = container;
        this.store = store;
        this.onStartQuiz = onStartQuiz;
        this.onNavigateTab = onNavigateTab;
        this.onSetChange = onSetChange;
        this.allWords = [];
    }

    setWords(words) {
        this.allWords = words || [];
        this.render();
    }

    render() {
        if (!this.container) return;

        const stats = this.store.getOverallStats(this.allWords);
        const weakWords = this.store.getWeakWords(this.allWords);
        const bookmarkedWords = this.store.getBookmarkedWords(this.allWords);

        // 次にやるべきおすすめセクション（未習得が多いセクションを自動判定）
        const step = 100;
        const totalSections = Math.max(1, Math.ceil(this.allWords.length / step));
        let nextSection = 1;
        for (let s = 1; s <= totalSections; s++) {
            const startId = (s - 1) * step + 1;
            const endId = Math.min(s * step, this.allWords.length);
            const p = this.store.getChapterProgress(this.allWords, startId, endId);
            if (p.percentage < 100) {
                nextSection = s;
                break;
            }
        }
        const nextSecStart = (nextSection - 1) * step + 1;
        const nextSecEnd = Math.min(nextSection * step, this.allWords.length);

        this.container.innerHTML = `
            <div class="home-view-container" aria-label="学習ホーム">
                <!-- 単語セット選択セグメント -->
                <div class="home-set-bar">
                    <span class="home-set-label" id="home-set-heading">学習セット:</span>
                    <div class="home-set-selector" role="radiogroup" aria-labelledby="home-set-heading">
                        <button class="home-set-btn ${this.store.currentSet === '1400' ? 'active' : ''}" role="radio" aria-checked="${this.store.currentSet === '1400' ? 'true' : 'false'}" data-set="1400" type="button">
                            Target 1400
                        </button>
                        <button class="home-set-btn ${this.store.currentSet === '1200' ? 'active' : ''}" role="radio" aria-checked="${this.store.currentSet === '1200' ? 'true' : 'false'}" data-set="1200" type="button">
                            Target 1200
                        </button>
                    </div>
                </div>

                <!-- 総合達成度ダッシュボードカード -->
                <div class="home-progress-card">
                    <div class="progress-card-header">
                        <div class="progress-card-title-group">
                            <span class="progress-card-subtitle">総合達成度</span>
                            <div class="progress-card-percent-row">
                                <span class="progress-card-percent">${stats.percentage}%</span>
                                <span class="progress-card-ratio">${stats.mastered} / ${stats.total} 語マスター</span>
                            </div>
                        </div>
                    </div>

                    <div class="progress-bar-stacked" role="progressbar" aria-valuenow="${stats.percentage}" aria-valuemin="0" aria-valuemax="100" aria-label="単語習得進捗 ${stats.percentage}%">
                        <div class="bar-mastered" style="width: ${(stats.mastered / stats.total) * 100}%" title="マスター: ${stats.mastered}"></div>
                        <div class="bar-learning" style="width: ${(stats.learning / stats.total) * 100}%" title="学習中: ${stats.learning}"></div>
                        <div class="bar-weak" style="width: ${(stats.weak / stats.total) * 100}%" title="要復習: ${stats.weak}"></div>
                    </div>

                    <div class="home-stats-chips">
                        <div class="stat-chip chip-mastered">
                            <span class="chip-dot"></span>
                            <span class="chip-label">マスター</span>
                            <span class="chip-val">${stats.mastered}</span>
                        </div>
                        <div class="stat-chip chip-learning">
                            <span class="chip-dot"></span>
                            <span class="chip-label">学習中</span>
                            <span class="chip-val">${stats.learning}</span>
                        </div>
                        <div class="stat-chip chip-weak">
                            <span class="chip-dot"></span>
                            <span class="chip-label">要復習</span>
                            <span class="chip-val">${stats.weak}</span>
                        </div>
                        <div class="stat-chip chip-new">
                            <span class="chip-dot"></span>
                            <span class="chip-label">未学習</span>
                            <span class="chip-val">${stats.new}</span>
                        </div>
                    </div>
                </div>

                <!-- 今すぐ学習（スマートアクション） -->
                <div class="home-actions-section">
                    <h3 class="home-section-title">今日のおすすめ学習</h3>

                    <div class="smart-actions-grid">
                        <!-- 要復習特訓（最優先アクション） -->
                        ${weakWords.length > 0 ? `
                            <button id="home-action-weak" class="smart-action-card card-urgent" type="button">
                                <div class="action-card-icon weak-icon">${icons.rotateCcw(22)}</div>
                                <div class="action-card-text">
                                    <div class="action-card-title">苦手単語の集中特訓</div>
                                    <div class="action-card-desc">要復習に登録された ${weakWords.length} 語をテスト</div>
                                </div>
                                <span class="action-card-arrow">${icons.arrowRight(16)}</span>
                            </button>
                        ` : ''}

                        <!-- 次のセクションテスト -->
                        <button id="home-action-section" class="smart-action-card card-primary" type="button">
                            <div class="action-card-icon section-icon">${icons.zap(22)}</div>
                            <div class="action-card-text">
                                <div class="action-card-title">Section ${nextSection} のテスト開始</div>
                                <div class="action-card-desc">No. ${nextSecStart}–${nextSecEnd} から出題</div>
                            </div>
                            <span class="action-card-arrow">${icons.arrowRight(16)}</span>
                        </button>

                        <!-- ブックマーク特訓 -->
                        ${bookmarkedWords.length > 0 ? `
                            <button id="home-action-bookmark" class="smart-action-card" type="button">
                                <div class="action-card-icon star-icon">${icons.star(22, '', true)}</div>
                                <div class="action-card-text">
                                    <div class="action-card-title">お気に入り単語の特訓</div>
                                    <div class="action-card-desc">登録された ${bookmarkedWords.length} 語をテスト</div>
                                </div>
                                <span class="action-card-arrow">${icons.arrowRight(16)}</span>
                            </button>
                        ` : ''}

                        <!-- 単語帳・暗記へジャンプ -->
                        <button id="home-action-words" class="smart-action-card card-words" type="button">
                            <div class="action-card-icon book-icon">${icons.bookOpen(22)}</div>
                            <div class="action-card-text">
                                <div class="action-card-title">単語帳で暗記・赤シート</div>
                                <div class="action-card-desc">リスト閲覧・カードめくり・語源ヒント</div>
                            </div>
                            <span class="action-card-arrow">${icons.arrowRight(16)}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // 単語セット切り替え
        this.container.querySelectorAll('.home-set-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newSet = btn.dataset.set;
                if (newSet !== this.store.currentSet && this.onSetChange) {
                    this.onSetChange(newSet);
                }
            });
        });

        // 苦手単語特訓アクション
        const weakBtn = this.container.querySelector('#home-action-weak');
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

        // 次のセクションテスト
        const secBtn = this.container.querySelector('#home-action-section');
        if (secBtn) {
            secBtn.addEventListener('click', () => {
                const secWords = this.allWords.filter(w => typeof w.id === 'number' && w.id >= nextSecStart && w.id <= nextSecEnd);
                if (secWords.length > 0 && this.onStartQuiz) {
                    const limit = this.store.settings.quizLimit || 20;
                    this.onStartQuiz({
                        words: secWords,
                        title: `Section ${nextSection} テスト (No. ${nextSecStart}–${nextSecEnd})`,
                        limit
                    });
                }
            });
        }

        // お気に入り特訓
        const bkmBtn = this.container.querySelector('#home-action-bookmark');
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

        // 単語帳へジャンプ
        const wordsBtn = this.container.querySelector('#home-action-words');
        if (wordsBtn) {
            wordsBtn.addEventListener('click', () => {
                if (this.onNavigateTab) {
                    this.onNavigateTab('words');
                }
            });
        }
    }
}
