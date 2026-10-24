/**
 * 単語帳・辞書画面View
 * セクション別分割表示 (Section 1〜14)、全範囲検索、単語番号バッジ、厳選ヒントのアコーディオン表示
 */

import { initAudio, speak } from '../modules/audio.js?v=5.80';
import { icons } from '../modules/icons.js?v=5.80';
import { getWordHint } from '../../data/hints1400.js?v=5.80';

export class WordsView {
    constructor({ container, store }) {
        this.container = container;
        this.store = store;
        this.allWords = [];
        this.searchQuery = '';
        this.currentFilter = 'all'; // 'all' | 'bookmarked' | 'weak' | 'learning' | 'mastered'
        this.currentSection = 1;    // 1-indexed (Section 1 = No. 1-100)
        this.viewMode = this.store.settings.wordsViewMode || 'list'; // 'list' | 'card'
        this.cardIndex = 0;
        this.isCardFlipped = false;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.lastActiveMask = (this.store.settings.wordsMask && this.store.settings.wordsMask !== 'none') ? this.store.settings.wordsMask : 'meaning';
        this.setupKeyboardShortcuts();
    }

    setWords(words) {
        this.allWords = words || [];
        this.currentSection = 1;
        this.cardIndex = 0;
        this.isCardFlipped = false;
        this.render();
    }

    getSectionCount() {
        return Math.max(1, Math.ceil(this.allWords.length / 100));
    }

    setupKeyboardShortcuts() {
        window.addEventListener('keydown', (e) => {
            // 単語帳タブかつカードめくりモードの時のみ反応
            if (this.viewMode !== 'card' || !this.container || this.container.closest('.view-panel')?.style.display === 'none') {
                return;
            }
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            if (e.code === 'Space') {
                e.preventDefault();
                this.toggleCardFlip();
            } else if (e.code === 'ArrowRight') {
                e.preventDefault();
                this.markCurrentCard('mastered');
            } else if (e.code === 'ArrowLeft') {
                e.preventDefault();
                this.markCurrentCard('weak');
            } else if (e.key === 's' || e.key === 'S') {
                e.preventDefault();
                this.speakCurrentCard();
            }
        });
    }

    getFilteredWords() {
        const isSearching = Boolean(this.searchQuery);
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

        return baseWords.filter(w => {
            if (isSearching) {
                const matchWord = w.word.toLowerCase().includes(this.searchQuery);
                const matchMeaning = w.meaning.toLowerCase().includes(this.searchQuery);
                if (!matchWord && !matchMeaning) return false;
            }

            const record = this.store.getWordRecord(w.id);
            if (this.currentFilter === 'bookmarked') return record.bookmarked;
            if (this.currentFilter === 'weak') return record.status === 'weak';
            if (this.currentFilter === 'learning') return record.status === 'learning';
            if (this.currentFilter === 'mastered') return record.status === 'mastered';
            return true;
        });
    }

    render() {
        if (!this.container) return;

        const totalSections = this.getSectionCount();
        const sections = Array.from({ length: totalSections }, (_, i) => i + 1);
        const maskMode = this.store.settings.wordsMask || 'none';
        const isRedSheetActive = maskMode !== 'none';

        this.container.innerHTML = `
            <div class="words-view-container" aria-label="単語帳">
                <div class="words-header">
                    <!-- 上部: フラットなアンダーライン型 2分割タブ -->
                    <div class="words-mode-tabs" role="tablist" aria-label="単語帳表示形式">
                        <button class="words-mode-tab ${this.viewMode === 'list' ? 'active' : ''}" data-mode="list" role="tab" aria-selected="${this.viewMode === 'list'}" type="button">
                            ${icons.bookOpen(16)}
                            <span>リスト一覧</span>
                        </button>
                        <button class="words-mode-tab ${this.viewMode === 'card' ? 'active' : ''}" data-mode="card" role="tab" aria-selected="${this.viewMode === 'card'}" type="button">
                            ${icons.layers(16)}
                            <span>カードめくり</span>
                        </button>
                    </div>

                    ${this.viewMode === 'list' ? `
                        <!-- 検索バー行（横幅いっぱい配置） -->
                        <div class="words-search-row">
                            <div class="search-box">
                                <span class="search-icon">${icons.search(16)}</span>
                                <input type="text" id="words-search-input" class="search-input" placeholder="英単語や意味で検索 (全範囲)..." value="${this.searchQuery}">
                                ${this.searchQuery ? `<button id="words-search-clear" class="search-clear-btn" type="button" aria-label="検索をクリア">${icons.x(14)}</button>` : ''}
                            </div>
                        </div>
                    ` : ''}

                    <!-- セクションステッパー ＆ フィルタードロップダウン -->
                    <div class="words-control-row">
                        <!-- セクションステッパー（前へ ◀ セレクト ▶ 次へ） -->
                        <div class="section-stepper" ${this.searchQuery ? 'style="opacity: 0.5; pointer-events: none;"' : ''}>
                            <button id="sec-prev-btn" class="stepper-arrow-btn" type="button" aria-label="前のセクションへ" ${this.currentSection <= 1 ? 'disabled' : ''}>
                                ${icons.arrowLeft(15)}
                            </button>
                            <div class="stepper-select-wrap">
                                <select id="section-select" class="section-select" aria-label="セクション選択">
                                    ${sections.map(s => {
                                        const startNo = (s - 1) * 100 + 1;
                                        const endNo = Math.min(s * 100, this.allWords.length);
                                        return `<option value="${s}" ${s === this.currentSection ? 'selected' : ''}>Section ${s} (${startNo}–${endNo})</option>`;
                                    }).join('')}
                                </select>
                                <span class="select-chevron">${icons.chevronDown(13)}</span>
                            </div>
                            <button id="sec-next-btn" class="stepper-arrow-btn" type="button" aria-label="次のセクションへ" ${this.currentSection >= totalSections ? 'disabled' : ''}>
                                ${icons.arrowRight(15)}
                            </button>
                        </div>

                        <!-- フィルタードロップダウン -->
                        <div class="filter-select-wrap">
                            <select id="filter-select" class="filter-select" aria-label="単語絞り込み">
                                <option value="all" ${this.currentFilter === 'all' ? 'selected' : ''}>すべて (${this.allWords.length})</option>
                                <option value="bookmarked" ${this.currentFilter === 'bookmarked' ? 'selected' : ''}>お気に入り</option>
                                <option value="weak" ${this.currentFilter === 'weak' ? 'selected' : ''}>要復習</option>
                                <option value="learning" ${this.currentFilter === 'learning' ? 'selected' : ''}>学習中</option>
                                <option value="mastered" ${this.currentFilter === 'mastered' ? 'selected' : ''}>マスター</option>
                            </select>
                            <span class="select-chevron">${icons.chevronDown(13)}</span>
                        </div>
                    </div>

                    <!-- 全範囲検索インジケータ -->
                    <div id="search-scope-indicator" class="search-scope-indicator" style="${this.searchQuery ? 'display: flex;' : 'display: none;'}">
                        <span class="search-scope-tag">全範囲検索</span>
                        <span id="search-scope-text">全 ${this.allWords.length} 語から「${this.searchQuery}」を検索中</span>
                    </div>
                </div>

                <!-- メイン表示領域（リスト または カードめくり） -->
                <div id="words-main-area">
                    ${this.viewMode === 'list' 
                        ? '<div id="words-list" class="words-list"></div>' 
                        : '<div id="flashcard-stage" class="flashcard-stage"></div>'}
                </div>

                <!-- フローティング赤シート FAB（リスト表示時のみ） -->
                ${this.viewMode === 'list' ? `
                    <div class="red-sheet-fab-container ${isRedSheetActive ? 'active' : ''}">
                        ${isRedSheetActive ? `
                            <button id="btn-sheet-target" class="sheet-fab-target-btn" type="button" aria-label="隠す対象切り替え" title="意味 ⇄ 英語を切り替え">
                                <span>${maskMode === 'word' ? '英語隠し' : '意味隠し'}</span>
                                ${icons.rotateCcw(12)}
                            </button>
                        ` : ''}
                        <button id="btn-red-sheet" class="sheet-fab-main-btn" type="button" aria-label="赤シート切り替え" title="赤シートを敷く / 外す">
                            <span class="sheet-fab-icon">${isRedSheetActive ? icons.eye(17) : icons.eyeOff(17)}</span>
                            <span class="sheet-fab-label">${isRedSheetActive ? '赤シート中' : '赤シート'}</span>
                        </button>
                    </div>
                ` : ''}
            </div>
        `;

        // 表示モードタブ切り替えイベント（リスト ⇄ カード）
        this.container.querySelectorAll('.words-mode-tab').forEach(tabBtn => {
            tabBtn.addEventListener('click', () => {
                const mode = tabBtn.dataset.mode;
                if (mode !== this.viewMode) {
                    this.viewMode = mode;
                    this.store.settings.wordsViewMode = mode;
                    this.store.save();
                    this.isCardFlipped = false;
                    this.render();
                }
            });
        });

        // 検索入力イベント（リストモード時のみ）
        const searchInput = this.container.querySelector('#words-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.trim().toLowerCase();
                this.updateClearBtn();
                this.updateList();
            });
            this.bindClearBtn();
        }

        // セクションステッパー: 前へ
        const prevBtn = this.container.querySelector('#sec-prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentSection > 1) {
                    this.currentSection--;
                    this.cardIndex = 0;
                    this.isCardFlipped = false;
                    this.render();
                }
            });
        }

        // セクションステッパー: 次へ
        const nextBtn = this.container.querySelector('#sec-next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentSection < totalSections) {
                    this.currentSection++;
                    this.cardIndex = 0;
                    this.isCardFlipped = false;
                    this.render();
                }
            });
        }

        // セクションステッパー: セレクト選択
        const secSelect = this.container.querySelector('#section-select');
        if (secSelect) {
            secSelect.addEventListener('change', (e) => {
                this.currentSection = parseInt(e.target.value, 10);
                this.cardIndex = 0;
                this.isCardFlipped = false;
                if (this.searchQuery) {
                    this.searchQuery = '';
                    if (searchInput) searchInput.value = '';
                    this.updateClearBtn();
                }
                this.render();
            });
        }

        // フィルタードロップダウン切り替え
        const filterSelect = this.container.querySelector('#filter-select');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.currentFilter = e.target.value;
                this.cardIndex = 0;
                this.isCardFlipped = false;
                this.updateView();
            });
        }

        // 赤シート（暗記マスク）ワンタップトグル（FAB）
        const redSheetBtn = this.container.querySelector('#btn-red-sheet');
        if (redSheetBtn) {
            redSheetBtn.addEventListener('click', () => {
                const current = this.store.settings.wordsMask || 'none';
                if (current === 'none') {
                    this.store.settings.wordsMask = this.lastActiveMask || 'meaning';
                } else {
                    this.lastActiveMask = current;
                    this.store.settings.wordsMask = 'none';
                }
                this.store.save();
                this.render();
            });
        }

        // 隠す対象（意味 ⇄ 英語）のインライン切り替え
        const sheetTargetBtn = this.container.querySelector('#btn-sheet-target');
        if (sheetTargetBtn) {
            sheetTargetBtn.addEventListener('click', () => {
                const current = this.store.settings.wordsMask || 'meaning';
                const next = (current === 'word') ? 'meaning' : 'word';
                this.store.settings.wordsMask = next;
                this.lastActiveMask = next;
                this.store.save();
                this.render();
            });
        }

        this.updateView();
    }

    updateView() {
        if (this.viewMode === 'card') {
            this.updateFlashcard();
        } else {
            this.updateList();
        }
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
        const stepper = this.container.querySelector('.section-stepper');
        if (stepper) {
            stepper.style.opacity = isSearching ? '0.5' : '1';
            stepper.style.pointerEvents = isSearching ? 'none' : 'auto';
        }
        const select = this.container.querySelector('#section-select');
        if (select) {
            select.value = String(this.currentSection);
        }
        const prevBtn = this.container.querySelector('#sec-prev-btn');
        if (prevBtn) {
            prevBtn.disabled = this.currentSection <= 1;
        }
        const nextBtn = this.container.querySelector('#sec-next-btn');
        if (nextBtn) {
            const totalSections = this.getSectionCount();
            nextBtn.disabled = this.currentSection >= totalSections;
        }
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

        if (countText) {
            if (isSearching) {
                countText.textContent = `全範囲検索${filterSuffix}: ${filtered.length} 語ヒット`;
            } else {
                countText.textContent = `Section ${this.currentSection} (No. ${secStart}–${secEnd})${filterSuffix}: ${filtered.length} 語`;
            }
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

        // マスク設定の取得
        const maskMode = this.store.settings.wordsMask || 'none';
        const isWordMasked = (maskMode === 'word');
        const isMeaningMasked = (maskMode === 'meaning');

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
                                <span class="dict-word ${isWordMasked ? 'is-masked' : ''}" title="${isWordMasked ? 'タップして単語を表示' : ''}">${w.word}</span>
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
                            <div class="dict-meaning ${isMeaningMasked ? 'is-masked' : ''}" title="${isMeaningMasked ? 'タップして意味を表示' : ''}">${w.meaning}</div>
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

        // イベント設定: マスクされた項目のタッチ覗き見（Peek）とタップ展開（Reveal）
        listContainer.querySelectorAll('.is-masked').forEach(el => {
            const startPeek = () => {
                el.classList.add('is-peeking');
            };
            const stopPeek = () => {
                el.classList.remove('is-peeking');
            };

            // タッチ操作（スマホ）
            el.addEventListener('touchstart', startPeek, { passive: true });
            el.addEventListener('touchend', stopPeek);
            el.addEventListener('touchcancel', stopPeek);

            // マウス操作（PCホバー）
            el.addEventListener('mouseenter', startPeek);
            el.addEventListener('mouseleave', stopPeek);

            // クリック（永続展開トグル）
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                stopPeek();
                el.classList.toggle('is-revealed');
            });
        });

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
                if (e.target.closest('.dict-star-btn') || e.target.closest('.dict-speak-btn') || e.target.closest('.dict-chevron-btn') || e.target.closest('.is-masked')) {
                    return;
                }
                toggle();
            });
        });
    }

    updateFlashcard() {
        const stage = this.container.querySelector('#flashcard-stage');
        const countText = this.container.querySelector('#words-count-text');
        if (!stage) return;

        const filtered = this.getFilteredWords();
        const total = filtered.length;

        const filterNames = {
            all: '',
            bookmarked: '・お気に入り',
            weak: '・要復習',
            learning: '・学習中',
            mastered: '・マスター'
        };
        const filterSuffix = filterNames[this.currentFilter] || '';

        if (countText) {
            countText.textContent = `Sec ${this.currentSection}${filterSuffix}: ${total} 語`;
        }

        if (total === 0) {
            stage.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">${icons.inbox(40)}</div>
                    <div class="empty-title">該当する単語がありません</div>
                    <div class="empty-desc">フィルターを変更するか別のセクションを選択してください</div>
                </div>
            `;
            return;
        }

        // インデックスの正規化
        if (this.cardIndex < 0) this.cardIndex = 0;
        if (this.cardIndex >= total) this.cardIndex = total - 1;

        const w = filtered[this.cardIndex];
        const record = this.store.getWordRecord(w.id);
        const isBkm = record.bookmarked;
        const hint = getWordHint(w);

        stage.innerHTML = `
            <!-- 上部バー: 進捗バッジ & ステップナビ -->
            <div class="flashcard-top-nav">
                <span class="flashcard-progress-badge">
                    ${this.cardIndex + 1} / ${total}
                </span>
                <div class="flashcard-step-nav">
                    <button class="flashcard-step-btn" id="card-prev-btn" type="button" aria-label="前の単語" ${this.cardIndex === 0 ? 'disabled style="opacity: 0.35; cursor: default;"' : ''}>
                        ${icons.arrowLeft(16)}
                    </button>
                    <button class="flashcard-step-btn" id="card-next-btn" type="button" aria-label="次の単語" ${this.cardIndex === total - 1 ? 'disabled style="opacity: 0.35; cursor: default;"' : ''}>
                        ${icons.arrowRight(16)}
                    </button>
                </div>
            </div>

            <!-- 単語カード本体（タップで裏表めくり） -->
            <div class="flashcard-wrapper" id="flashcard-wrapper">
                <div class="flashcard ${this.isCardFlipped ? 'is-flipped' : ''}" id="flashcard-card">
                    <div class="flashcard-header">
                        <div class="flashcard-header-left">
                            <span class="dict-no-badge">No. ${w.id}</span>
                            <span class="pos-badge">${w.pos || '単語'}</span>
                        </div>
                        <div class="flashcard-header-right">
                            <button class="dict-star-btn ${isBkm ? 'active' : ''}" id="card-star-btn" type="button" aria-label="お気に入り">
                                ${icons.star(20)}
                            </button>
                        </div>
                    </div>

                    <div class="flashcard-body">
                        ${!this.isCardFlipped ? `
                            <!-- 表面: 英単語 -->
                            <div class="flashcard-word">${w.word}</div>
                            <div class="flashcard-footer-tip">
                                ${icons.rotateCcw(13)} タップして意味を表示
                            </div>
                        ` : `
                            <!-- 裏面: 意味 & 語源ヒント -->
                            <div class="flashcard-meaning">${w.meaning}</div>
                            <div class="flashcard-footer-tip" style="color: var(--primary-color);">
                                <small>${w.word}</small>
                            </div>
                            ${hint ? `
                                <div class="flashcard-hint-box">
                                    ${hint.origin ? `<div class="flashcard-hint-item"><strong>語源:</strong> ${hint.origin}</div>` : ''}
                                    ${hint.link ? `<div class="flashcard-hint-item"><strong>連想:</strong> ${hint.link}</div>` : ''}
                                    ${hint.note ? `<div class="flashcard-hint-item"><strong>補足:</strong> ${hint.note}</div>` : ''}
                                </div>
                            ` : ''}
                        `}
                    </div>
                </div>
            </div>

            <!-- 下部・親指片手操作バー -->
            <div class="flashcard-thumb-actions">
                <button class="btn-card-action btn-card-weak" id="card-weak-btn" type="button" aria-label="要復習にする">
                    ${icons.rotateCcw(17)} 要復習
                </button>
                <button class="btn-card-action btn-card-speak" id="card-speak-btn" type="button" aria-label="発音を聞く" title="発音を聞く">
                    ${icons.volume(20)}
                </button>
                <button class="btn-card-action btn-card-master" id="card-master-btn" type="button" aria-label="覚えた（マスター）にする">
                    ${icons.check(18)} 覚えた
                </button>
            </div>
        `;

        // カードめくりタップイベント
        const cardWrapper = stage.querySelector('#flashcard-wrapper');
        if (cardWrapper) {
            cardWrapper.addEventListener('click', (e) => {
                if (e.target.closest('#card-star-btn')) return;
                this.toggleCardFlip();
            });

            // スマホスワイプ対応
            cardWrapper.addEventListener('touchstart', (e) => {
                if (e.changedTouches && e.changedTouches[0]) {
                    this.touchStartX = e.changedTouches[0].screenX;
                    this.touchStartY = e.changedTouches[0].screenY;
                }
            }, { passive: true });

            cardWrapper.addEventListener('touchend', (e) => {
                if (!e.changedTouches || !e.changedTouches[0]) return;
                const diffX = e.changedTouches[0].screenX - this.touchStartX;
                const diffY = e.changedTouches[0].screenY - this.touchStartY;
                if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
                    if (diffX > 0) {
                        // 右スワイプ: 覚えた
                        this.markCurrentCard('mastered');
                    } else {
                        // 左スワイプ: 要復習
                        this.markCurrentCard('weak');
                    }
                }
            });
        }

        // お気に入りボタン
        const starBtn = stage.querySelector('#card-star-btn');
        if (starBtn) {
            starBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isNowBookmarked = this.store.toggleBookmark(w.id);
                starBtn.classList.toggle('active', isNowBookmarked);
            });
        }

        // 前へ・次へボタン
        const prevBtn = stage.querySelector('#card-prev-btn');
        if (prevBtn && this.cardIndex > 0) {
            prevBtn.addEventListener('click', () => {
                this.cardIndex--;
                this.isCardFlipped = false;
                this.updateFlashcard();
            });
        }

        const nextBtn = stage.querySelector('#card-next-btn');
        if (nextBtn && this.cardIndex < total - 1) {
            nextBtn.addEventListener('click', () => {
                this.cardIndex++;
                this.isCardFlipped = false;
                this.updateFlashcard();
            });
        }

        // 発音ボタン
        const speakBtn = stage.querySelector('#card-speak-btn');
        if (speakBtn) {
            speakBtn.addEventListener('click', () => {
                this.speakCurrentCard();
            });
        }

        // 要復習ボタン
        const weakBtn = stage.querySelector('#card-weak-btn');
        if (weakBtn) {
            weakBtn.addEventListener('click', () => {
                this.markCurrentCard('weak');
            });
        }

        // 覚えたボタン
        const masterBtn = stage.querySelector('#card-master-btn');
        if (masterBtn) {
            masterBtn.addEventListener('click', () => {
                this.markCurrentCard('mastered');
            });
        }
    }

    toggleCardFlip() {
        this.isCardFlipped = !this.isCardFlipped;
        this.updateFlashcard();
    }

    speakCurrentCard() {
        const filtered = this.getFilteredWords();
        if (filtered[this.cardIndex]) {
            initAudio();
            speak(filtered[this.cardIndex].word);
        }
    }

    markCurrentCard(status) {
        const filtered = this.getFilteredWords();
        if (!filtered[this.cardIndex]) return;
        const w = filtered[this.cardIndex];

        this.store.setWordStatus(w.id, status);

        // 次のカードへ
        if (this.cardIndex < filtered.length - 1) {
            this.cardIndex++;
            this.isCardFlipped = false;
        } else {
            // セクション終端
            this.isCardFlipped = false;
        }
        this.updateFlashcard();
    }
}
