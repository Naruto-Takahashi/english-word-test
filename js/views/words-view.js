/**
 * 単語帳・辞書画面View
 * セクション別分割表示 (Section 1〜14)、全範囲検索、単語番号バッジ、厳選ヒントのアコーディオン表示
 */

import { initAudio, speak } from '../modules/audio.js?v=5.00';
import { icons } from '../modules/icons.js?v=5.00';
import { getWordHint } from '../../data/hints1400.js?v=5.00';

export class WordsView {
    constructor({ container, store }) {
        this.container = container;
        this.store = store;
        this.allWords = [];
        this.searchQuery = '';
        this.currentFilter = 'all'; // 'all' | 'bookmarked' | 'weak' | 'learning' | 'mastered'
        this.currentSection = 1;    // 1-indexed (Section 1 = No. 1-100)
    }

    setWords(words) {
        this.allWords = words || [];
        this.currentSection = 1;
        this.render();
    }

    getSectionCount() {
        return Math.max(1, Math.ceil(this.allWords.length / 100));
    }

    render() {
        if (!this.container) return;

        const totalSections = this.getSectionCount();
        const sections = Array.from({ length: totalSections }, (_, i) => i + 1);

        this.container.innerHTML = `
            <div class="words-view-container">
                <div class="words-header">
                    <h2 class="view-title">単語帳</h2>
                    <div class="search-box">
                        <span class="search-icon">${icons.search(16)}</span>
                        <input type="text" id="words-search-input" class="search-input" placeholder="英単語や意味で検索 (全範囲)..." value="${this.searchQuery}">
                        ${this.searchQuery ? `<button id="words-search-clear" class="search-clear-btn" type="button" aria-label="検索をクリア">${icons.x(14)}</button>` : ''}
                    </div>

                    <!-- 全範囲検索インジケータ -->
                    <div id="search-scope-indicator" class="search-scope-indicator" style="${this.searchQuery ? 'display: flex;' : 'display: none;'}">
                        <span class="search-scope-tag">全範囲検索</span>
                        <span id="search-scope-text">全 ${this.allWords.length} 語から「${this.searchQuery}」を検索中</span>
                    </div>

                    <!-- セクション選択タブ (Section 1〜Section 14) -->
                    <div class="section-tabs-wrapper">
                        <div class="section-tabs-row" id="section-tabs-row">
                            ${sections.map(s => {
                                const startNo = (s - 1) * 100 + 1;
                                const endNo = Math.min(s * 100, this.allWords.length);
                                const isActive = (s === this.currentSection && !this.searchQuery);
                                return `
                                    <button class="section-tab-btn ${isActive ? 'active' : ''}" data-section="${s}" type="button">
                                        <span class="sec-label">Section ${s}</span>
                                        <span class="sec-range">No. ${startNo}–${endNo}</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- フィルターピル -->
                    <div class="filter-pills-row">
                        <button class="filter-pill ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">すべて</button>
                        <button class="filter-pill ${this.currentFilter === 'bookmarked' ? 'active' : ''}" data-filter="bookmarked">${icons.star(13, '', true)} お気に入り</button>
                        <button class="filter-pill ${this.currentFilter === 'weak' ? 'active' : ''}" data-filter="weak">${icons.rotateCcw(13)} 要復習</button>
                        <button class="filter-pill ${this.currentFilter === 'learning' ? 'active' : ''}" data-filter="learning">${icons.bookOpen(13)} 学習中</button>
                        <button class="filter-pill ${this.currentFilter === 'mastered' ? 'active' : ''}" data-filter="mastered">${icons.check(13)} マスター</button>
                    </div>

                    <div id="words-count-text" class="words-count-text"></div>
                </div>

                <!-- 単語リスト -->
                <div id="words-list" class="words-list"></div>
            </div>
        `;

        // 検索入力イベント
        const searchInput = this.container.querySelector('#words-search-input');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.trim().toLowerCase();
            this.updateClearBtn();
            this.updateList();
        });

        // 検索クリアボタンの初回バインド
        this.bindClearBtn();

        // セクションタブ切り替え
        this.container.querySelectorAll('.section-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const sec = parseInt(btn.dataset.section, 10);
                this.currentSection = sec;
                if (this.searchQuery) {
                    this.searchQuery = '';
                    if (searchInput) searchInput.value = '';
                    this.updateClearBtn();
                }
                this.updateSectionTabActive();
                const row = this.container.querySelector('.section-tabs-row');
                if (row) {
                    const scrollLeft = btn.offsetLeft - (row.clientWidth / 2) + (btn.clientWidth / 2);
                    row.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
                this.updateList();
            });
        });

        // フィルターピル切り替え
        this.container.querySelectorAll('.filter-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentFilter = btn.dataset.filter;
                this.container.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.updateList();
            });
        });

        this.updateList();
    }

    bindClearBtn() {
        const clearBtn = this.container.querySelector('#words-search-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.searchQuery = '';
                const searchInput = this.container.querySelector('#words-search-input');
                if (searchInput) searchInput.value = '';
                clearBtn.remove();
                this.updateSectionTabActive();
                this.updateList();
            });
        }
    }

    updateClearBtn() {
        let clearBtn = this.container.querySelector('#words-search-clear');
        const searchBox = this.container.querySelector('.search-box');
        if (this.searchQuery) {
            if (!clearBtn && searchBox) {
                clearBtn = document.createElement('button');
                clearBtn.id = 'words-search-clear';
                clearBtn.className = 'search-clear-btn';
                clearBtn.type = 'button';
                clearBtn.setAttribute('aria-label', '検索をクリア');
                clearBtn.innerHTML = icons.x(14);
                searchBox.appendChild(clearBtn);
                this.bindClearBtn();
            }
        } else {
            if (clearBtn) clearBtn.remove();
        }
    }

    updateSectionTabActive() {
        const isSearching = Boolean(this.searchQuery);
        this.container.querySelectorAll('.section-tab-btn').forEach(b => {
            const s = parseInt(b.dataset.section, 10);
            b.classList.toggle('active', !isSearching && s === this.currentSection);
        });
    }

    updateList() {
        const listContainer = this.container.querySelector('#words-list');
        const countText = this.container.querySelector('#words-count-text');
        const scopeIndicator = this.container.querySelector('#search-scope-indicator');
        const scopeText = this.container.querySelector('#search-scope-text');
        if (!listContainer) return;

        const isSearching = Boolean(this.searchQuery);

        // 検索時は全範囲、通常時は選択中セクション（100語単位）
        let baseWords = this.allWords;
        const secStart = (this.currentSection - 1) * 100 + 1;
        const secEnd = Math.min(this.currentSection * 100, this.allWords.length);

        if (!isSearching) {
            baseWords = this.allWords.filter(w => {
                if (typeof w.id === 'number') {
                    return w.id >= secStart && w.id <= secEnd;
                }
                return true;
            });
        }

        // 検索スコープインジケータとセクションタブの表示更新
        if (scopeIndicator && scopeText) {
            if (isSearching) {
                scopeIndicator.style.display = 'flex';
                scopeText.textContent = `全 ${this.allWords.length} 語から「${this.searchQuery}」を検索中`;
            } else {
                scopeIndicator.style.display = 'none';
            }
        }
        this.updateSectionTabActive();

        // フィルタリング処理
        let filtered = baseWords.filter(w => {
            // 検索クエリ適合
            if (isSearching) {
                const matchWord = w.word.toLowerCase().includes(this.searchQuery);
                const matchMeaning = w.meaning.toLowerCase().includes(this.searchQuery);
                if (!matchWord && !matchMeaning) return false;
            }

            // ステータスフィルター
            const record = this.store.getWordRecord(w.id);
            if (this.currentFilter === 'bookmarked') return record.bookmarked;
            if (this.currentFilter === 'weak') return record.status === 'weak';
            if (this.currentFilter === 'learning') return record.status === 'learning';
            if (this.currentFilter === 'mastered') return record.status === 'mastered';
            return true;
        });

        // カウント表示
        const filterNames = {
            all: '',
            bookmarked: '・お気に入り',
            weak: '・要復習',
            learning: '・学習中',
            mastered: '・マスター'
        };
        const filterSuffix = filterNames[this.currentFilter] || '';

        if (isSearching) {
            countText.textContent = `全範囲検索${filterSuffix}: ${filtered.length} 語ヒット`;
        } else {
            countText.textContent = `Section ${this.currentSection} (No. ${secStart}–${secEnd})${filterSuffix}: ${filtered.length} 語`;
        }

        if (filtered.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">${icons.inbox(40)}</div>
                    <div class="empty-title">一致する単語がありません</div>
                    <div class="empty-desc">${isSearching ? '別のキーワードをお試しください' : 'このセクションに該当する単語はありません'}</div>
                </div>
            `;
            return;
        }

        // 描画（セクション内は最大100件、検索時はパフォーマンスのため最大200件）
        const displayList = filtered.slice(0, 200);

        listContainer.innerHTML = displayList.map(w => {
            const record = this.store.getWordRecord(w.id);
            const isBkm = record.bookmarked;
            const statusLabel = {
                new: '未学習',
                weak: '要復習',
                learning: '学習中',
                mastered: 'マスター'
            }[record.status] || '未学習';

            const hint = getWordHint(w);
            return `
                <div class="word-dict-card ${hint ? 'has-hint' : ''}" data-word-id="${w.id}">
                    <div class="dict-card-main">
                        <div class="dict-top-row">
                            <button class="dict-star-btn ${isBkm ? 'active' : ''}" data-word-id="${w.id}" type="button" aria-label="お気に入り" title="お気に入り">${icons.star(18)}</button>
                            <span class="dict-no-badge">No. ${w.id}</span>
                            <div class="dict-word-wrap">
                                <span class="dict-word">${w.word}</span>
                                <span class="pos-badge">${w.pos || '単語'}</span>
                                <button class="dict-speak-btn" data-word="${w.word}" type="button" aria-label="発音" title="発音を聞く">${icons.volume(16)}</button>
                            </div>
                            <div class="dict-card-actions">
                                <span class="status-pill status-${record.status}">${statusLabel}</span>
                                ${hint ? `
                                    <button class="dict-chevron-btn" type="button" aria-label="覚え方を展開" title="覚え方を展開">
                                        ${icons.chevronDown(16)}
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                        <div class="dict-meaning-row">
                            <div class="dict-meaning">${w.meaning}</div>
                        </div>
                    </div>
                    ${hint ? `
                        <div class="dict-hint-accordion">
                            <div class="dict-hint-content">
                                <div class="dict-hint-inner dict-hint-drawer">
                                    ${hint.origin ? `<div class="hint-row"><span class="hint-tag origin-tag">語源</span><span class="hint-text">${hint.origin}</span></div>` : ''}
                                    ${hint.link ? `<div class="hint-row"><span class="hint-tag link-tag">連想</span><span class="hint-text">${hint.link}</span></div>` : ''}
                                    ${hint.note ? `<div class="hint-row"><span class="hint-tag note-tag">補足</span><span class="hint-text">${hint.note}</span></div>` : ''}
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');

        // イベント設定: お気に入り
        listContainer.querySelectorAll('.dict-star-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const wordId = parseInt(btn.dataset.wordId, 10);
                const isNowBookmarked = this.store.toggleBookmark(wordId);
                btn.classList.toggle('active', isNowBookmarked);
            });
        });

        // イベント設定: 音声発音
        listContainer.querySelectorAll('.dict-speak-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                initAudio();
                speak(btn.dataset.word);
            });
        });

        // イベント設定: アコーディオン展開（ヒントが存在する単語のみ）
        listContainer.querySelectorAll('.word-dict-card.has-hint').forEach(card => {
            const toggle = () => {
                card.classList.toggle('is-hint-open');
            };

            const chevronBtn = card.querySelector('.dict-chevron-btn');
            if (chevronBtn) {
                chevronBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggle();
                });
            }

            card.addEventListener('click', (e) => {
                if (e.target.closest('.dict-star-btn') || e.target.closest('.dict-speak-btn') || e.target.closest('.dict-chevron-btn')) {
                    return;
                }
                toggle();
            });
        });
    }
}
