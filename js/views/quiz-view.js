/**
 * スピードクイズ（4択 / スペル入力）の画面View
 */

import { initAudio, playSE, speak } from '../modules/audio.js?v=4.80';
import { saveResultAsImage } from '../modules/share.js?v=4.60';
import { icons } from '../modules/icons.js?v=4.60';
import { getWordHint } from '../../data/hints1400.js?v=4.60';

export class QuizView {
    constructor({ container, store, engine, onFinish }) {
        this.container = container;
        this.store = store;
        this.engine = engine;
        this.onFinish = onFinish;
        this.title = 'スピードテスト';
        this.autoAdvanceTimer = null;
        this.isAnswering = false;
        this.setupKeyListeners();
    }

    startSession({ words, title = 'スピードテスト', mode = 'en2ja', limit = 0, timeLimit = 10 }) {
        this.title = title;
        this.engine.startQuiz({ words, mode, limit, timeLimit });
        this.isAnswering = false;
        this.renderQuestionScreen();
        this.displayNextQuestion();
    }

    renderQuestionScreen() {
        this.container.innerHTML = `
            <div class="session-container">
                <!-- セッションヘッダー -->
                <div class="session-header">
                    <button id="quiz-back-btn" class="icon-btn" aria-label="中断">${icons.x(18)}</button>
                    <div class="session-title-wrap">
                        <span class="session-category">${this.title}</span>
                        <div class="session-progress-text" id="quiz-progress-text">1 / 10</div>
                    </div>
                    <div id="quiz-combo-badge" class="combo-badge" style="display: none;">${icons.flame(16)} <span>0 COMBO</span></div>
                </div>

                <!-- プログレスバー（全体進行） -->
                <div class="session-progress-track">
                    <div id="quiz-progress-fill" class="session-progress-fill" style="width: 0%"></div>
                </div>

                <!-- 出題エリア -->
                <div class="quiz-card">
                    <div class="quiz-card-top">
                        <span id="quiz-pos-badge" class="pos-badge">名詞</span>
                        <div id="quiz-timer-ring-container" class="quiz-timer-ring-container" title="制限時間">
                            <svg class="timer-ring-svg" width="36" height="36" viewBox="0 0 36 36">
                                <circle class="timer-ring-bg" cx="18" cy="18" r="14" fill="none" stroke-width="3"></circle>
                                <circle id="quiz-timer-circle" class="timer-ring-progress" cx="18" cy="18" r="14" fill="none" stroke-width="3" stroke-dasharray="87.96" stroke-dashoffset="0"></circle>
                            </svg>
                            <span id="quiz-timer-text" class="timer-ring-text">10</span>
                        </div>
                        <button id="quiz-bookmark-btn" class="icon-btn-star" aria-label="ブックマーク">${icons.star(20)}</button>
                    </div>

                    <div class="quiz-word-row">
                        <h2 id="quiz-word-display" class="quiz-word">loading...</h2>
                        <button id="quiz-speak-btn" class="speak-btn" type="button" aria-label="発音を聞く">
                            ${icons.volume(20)}
                        </button>
                    </div>

                    <div id="quiz-feedback" class="quiz-feedback"></div>
                </div>

                <!-- 4択選択肢グリッド -->
                <div id="quiz-options-grid" class="quiz-options-grid"></div>

                <!-- 次へボタン（誤答時・手動進行時用） -->
                <div class="quiz-footer">
                    <button id="quiz-next-btn" class="btn btn-primary btn-full" style="display: none;">
                        次へ進む (Space / Enter)
                    </button>
                </div>
            </div>
        `;

        this.container.querySelector('#quiz-back-btn').addEventListener('click', () => {
            if (confirm('テストを中断してホームに戻りますか？')) {
                clearTimeout(this.autoAdvanceTimer);
                this.engine.stopTimer();
                this.onFinish();
            }
        });

        this.container.querySelector('#quiz-next-btn').addEventListener('click', () => {
            this.handleNext();
        });
    }

    displayNextQuestion() {
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
        }
        clearTimeout(this.autoAdvanceTimer);
        this.engine.stopTimer();
        const q = this.engine.getCurrentQuestion();
        if (!q) {
            this.renderResultScreen();
            return;
        }

        this.isAnswering = true;
        const progressFill = this.container.querySelector('#quiz-progress-fill');
        const progressText = this.container.querySelector('#quiz-progress-text');
        const timerContainer = this.container.querySelector('#quiz-timer-ring-container');
        const timerCircle = this.container.querySelector('#quiz-timer-circle');
        const timerText = this.container.querySelector('#quiz-timer-text');
        const comboBadge = this.container.querySelector('#quiz-combo-badge');
        const posBadge = this.container.querySelector('#quiz-pos-badge');
        const bookmarkBtn = this.container.querySelector('#quiz-bookmark-btn');
        const wordDisplay = this.container.querySelector('#quiz-word-display');
        const speakBtn = this.container.querySelector('#quiz-speak-btn');
        const feedback = this.container.querySelector('#quiz-feedback');
        const optionsGrid = this.container.querySelector('#quiz-options-grid');
        const nextBtn = this.container.querySelector('#quiz-next-btn');

        nextBtn.style.display = 'none';
        feedback.innerHTML = '';
        feedback.className = 'quiz-feedback';

        // 進行度更新
        const percent = ((q.index) / q.total) * 100;
        progressFill.style.width = `${percent}%`;
        progressText.textContent = `${q.index + 1} / ${q.total}`;

        // 問題カードのシェイク解除
        const quizCard = this.container.querySelector('.quiz-card');
        if (quizCard) {
            quizCard.classList.remove('is-shaking');
        }

        // 円形タイマーリング初期化
        const circumference = 87.96;
        if (timerContainer) {
            if (q.timeLimit > 0) {
                timerContainer.style.display = 'flex';
                timerContainer.classList.remove('timer-warning');
                if (timerCircle) {
                    timerCircle.style.strokeDashoffset = '0';
                }
                if (timerText) {
                    timerText.textContent = `${Math.ceil(q.timeLimit)}`;
                }
            } else {
                timerContainer.style.display = 'none';
            }
        }

        // コンボ更新
        if (q.combo >= 2) {
            comboBadge.style.display = 'inline-flex';
            comboBadge.style.alignItems = 'center';
            comboBadge.style.gap = '0.3rem';
            comboBadge.innerHTML = `${icons.flame(16)} <span>${q.combo} COMBO</span>`;
            comboBadge.classList.remove('combo-pop-animate');
            void comboBadge.offsetWidth;
            comboBadge.classList.add('combo-pop-animate');
        } else {
            comboBadge.style.display = 'none';
        }

        // 単語情報
        posBadge.textContent = q.word.pos || '単語';
        wordDisplay.textContent = q.word.word;

        // ブックマーク状態
        const isBkm = this.store.isBookmarked(q.word.id);
        bookmarkBtn.className = `icon-btn-star ${isBkm ? 'active' : ''}`;
        bookmarkBtn.onclick = () => {
            const newState = this.store.toggleBookmark(q.word.id);
            bookmarkBtn.className = `icon-btn-star ${newState ? 'active' : ''}`;
        };

        // 音声
        speakBtn.onclick = () => {
            initAudio();
            speak(q.word.word);
        };
        if (this.store.settings.autoSpeak) {
            setTimeout(() => speak(q.word.word), 250);
        }

        // 選択肢描画
        optionsGrid.innerHTML = '';
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.dataset.key = (idx + 1).toString();
            btn.dataset.wordId = opt.id;
            btn.innerHTML = `
                <span class="option-key">${idx + 1}</span>
                <span class="option-text">${opt.main_meaning}</span>
            `;
            btn.addEventListener('click', () => this.handleSelectAnswer(opt.id, btn));
            optionsGrid.appendChild(btn);
        });

        // 1問ごとのカウントダウンタイマー開始
        if (q.timeLimit > 0) {
            const circumference = 87.96;
            this.engine.startTimer({
                onTick: (remaining, percentage) => {
                    if (timerCircle) {
                        const offset = circumference * (1 - percentage / 100);
                        timerCircle.style.strokeDashoffset = `${offset}`;
                    }
                    if (timerText) {
                        timerText.textContent = remaining > 1 ? Math.ceil(remaining) : remaining.toFixed(1);
                    }
                    if (timerContainer) {
                        if (remaining <= 3.0) {
                            timerContainer.classList.add('timer-warning');
                        } else {
                            timerContainer.classList.remove('timer-warning');
                        }
                    }
                },
                onTimeUp: () => {
                    this.handleTimeUp();
                }
            });
        }
    }

    handleSelectAnswer(selectedId, selectedBtn) {
        if (!this.isAnswering) return;
        this.isAnswering = false;
        this.engine.stopTimer();

        if (selectedBtn && typeof selectedBtn.blur === 'function') {
            selectedBtn.blur();
        }
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
        }

        const q = this.engine.getCurrentQuestion();
        if (!q) return;

        const isCorrect = (selectedId === q.word.id);
        this.engine.recordAnswer({ isCorrect });

        const optionsGrid = this.container.querySelector('#quiz-options-grid');
        const feedback = this.container.querySelector('#quiz-feedback');
        const nextBtn = this.container.querySelector('#quiz-next-btn');
        const comboBadge = this.container.querySelector('#quiz-combo-badge');

        // ボタン無効化と正解強調
        Array.from(optionsGrid.children).forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.dataset.wordId, 10) === q.word.id) {
                btn.classList.add('is-correct');
            }
        });

        if (isCorrect) {
            selectedBtn.classList.add('is-correct');
            const currentCombo = (q.combo || 0) + 1;
            if (currentCombo >= 2 && comboBadge) {
                comboBadge.style.display = 'inline-flex';
                comboBadge.style.alignItems = 'center';
                comboBadge.style.gap = '0.3rem';
                comboBadge.innerHTML = `${icons.flame(16)} <span>${currentCombo} COMBO</span>`;
                comboBadge.classList.remove('combo-pop-animate');
                void comboBadge.offsetWidth;
                comboBadge.classList.add('combo-pop-animate');
            }

            feedback.innerHTML = `正解！`;
            feedback.className = 'quiz-feedback feedback-correct';
            if (this.store.settings.soundEnabled) {
                playSE('correct');
                if (q.combo + 1 >= 3) {
                    setTimeout(() => playSE('combo', q.combo + 1), 120);
                }
            }

            // オートアドバンス（自動送り）
            if (this.store.settings.autoAdvance) {
                this.autoAdvanceTimer = setTimeout(() => {
                    this.handleNext();
                }, 600);
            } else {
                nextBtn.style.display = 'block';
            }
        } else {
            selectedBtn.classList.add('is-wrong');

            // カード全体に微細な物理シェイクを付与
            const quizCard = this.container.querySelector('.quiz-card');
            if (quizCard) {
                quizCard.classList.remove('is-shaking');
                void quizCard.offsetWidth;
                quizCard.classList.add('is-shaking');
            }

            const hint = getWordHint(q.word);
            let hintHtml = '';
            if (hint) {
                hintHtml = `
                    <div class="feedback-hint-card">
                        <div class="feedback-hint-title">${icons.bookOpen(14)} 覚え方のコツ・重要語法</div>
                        ${hint.origin ? `<div class="hint-row"><span class="hint-tag origin-tag">語源</span><span class="hint-text">${hint.origin}</span></div>` : ''}
                        ${hint.link ? `<div class="hint-row"><span class="hint-tag link-tag">連想</span><span class="hint-text">${hint.link}</span></div>` : ''}
                        ${hint.note ? `<div class="hint-row"><span class="hint-tag note-tag">補足</span><span class="hint-text">${hint.note}</span></div>` : ''}
                    </div>
                `;
            }
            feedback.innerHTML = `
                <div class="feedback-wrong-header">正解: <strong>${q.word.meaning}</strong></div>
                ${hintHtml}
            `;
            feedback.className = 'quiz-feedback feedback-wrong';
            if (this.store.settings.soundEnabled) {
                playSE('wrong');
            }
            speak(q.word.word);
            nextBtn.style.display = 'block';
            nextBtn.focus();
        }
    }

    handleTimeUp() {
        if (!this.isAnswering) return;
        this.isAnswering = false;
        this.engine.stopTimer();

        const timerContainer = this.container.querySelector('#quiz-timer-ring-container');
        const timerCircle = this.container.querySelector('#quiz-timer-circle');
        const timerText = this.container.querySelector('#quiz-timer-text');
        if (timerCircle) {
            timerCircle.style.strokeDashoffset = '87.96';
        }
        if (timerText) {
            timerText.textContent = '0';
        }
        if (timerContainer) {
            timerContainer.classList.add('timer-warning');
        }

        const q = this.engine.getCurrentQuestion();
        if (!q) return;

        this.engine.recordTimeUp();

        const optionsGrid = this.container.querySelector('#quiz-options-grid');
        const feedback = this.container.querySelector('#quiz-feedback');
        const nextBtn = this.container.querySelector('#quiz-next-btn');

        // カード全体にシェイクを付与
        const quizCard = this.container.querySelector('.quiz-card');
        if (quizCard) {
            quizCard.classList.remove('is-shaking');
            void quizCard.offsetWidth;
            quizCard.classList.add('is-shaking');
        }

        // ボタン無効化と正解強調
        Array.from(optionsGrid.children).forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.dataset.wordId, 10) === q.word.id) {
                btn.classList.add('is-correct');
            }
        });

        // 赤枠の正解と覚え方メモを表示
        const hint = getWordHint(q.word);
        let hintHtml = '';
        if (hint) {
            hintHtml = `
                <div class="feedback-hint-card">
                    <div class="feedback-hint-title">${icons.bookOpen(14)} 覚え方のコツ・重要語法</div>
                    ${hint.origin ? `<div class="hint-row"><span class="hint-tag origin-tag">語源</span><span class="hint-text">${hint.origin}</span></div>` : ''}
                    ${hint.link ? `<div class="hint-row"><span class="hint-tag link-tag">連想</span><span class="hint-text">${hint.link}</span></div>` : ''}
                    ${hint.note ? `<div class="hint-row"><span class="hint-tag note-tag">補足</span><span class="hint-text">${hint.note}</span></div>` : ''}
                </div>
            `;
        }

        feedback.innerHTML = `
            <div class="feedback-wrong-header"><span class="timeup-tag">TIME UP</span>正解: <strong>${q.word.meaning}</strong></div>
            ${hintHtml}
        `;
        feedback.className = 'quiz-feedback feedback-wrong';

        if (this.store.settings.soundEnabled) {
            playSE('wrong');
        }
        speak(q.word.word);

        // 「次へ進む (Space / Enter)」ボタンをフォーカス
        nextBtn.style.display = 'block';
        nextBtn.focus();
    }

    handleNext() {
        clearTimeout(this.autoAdvanceTimer);
        this.engine.stopTimer();
        if (this.engine.nextQuestion()) {
            this.displayNextQuestion();
        } else {
            this.renderResultScreen();
        }
    }

    renderResultScreen() {
        this.engine.stopTimer();
        const results = this.engine.getResults();

        const isPerfect = (results.accuracy === 100);
        let resultTitle = 'Keep Going!';
        let celebrationBadge = '';
        if (isPerfect) {
            resultTitle = 'Perfect Score!';
            celebrationBadge = `<div class="result-perfect-badge">${icons.crown(18)} 全問正解達成！</div>`;
        } else if (results.accuracy >= 80) {
            resultTitle = 'Great Job!';
        } else if (results.accuracy >= 60) {
            resultTitle = 'Good Effort!';
        }

        this.container.innerHTML = `
            <div class="result-container">
                <!-- 正答率の円形プログレスリング -->
                <div class="result-ring-wrapper ${isPerfect ? 'is-perfect' : ''}">
                    <svg class="result-progress-ring" width="140" height="140" viewBox="0 0 140 140">
                        <defs>
                            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#fbbf24" />
                                <stop offset="100%" stop-color="#d97706" />
                            </linearGradient>
                        </defs>
                        <circle class="ring-bg" cx="70" cy="70" r="58" />
                        <circle class="ring-progress" id="quiz-result-ring" cx="70" cy="70" r="58"
                                style="stroke-dasharray: 364.425; stroke-dashoffset: 364.425;" />
                    </svg>
                    <div class="result-ring-content">
                        <span class="result-score-percent" id="quiz-result-percent">0%</span>
                        <span class="result-score-sub">正答率</span>
                    </div>
                </div>

                ${celebrationBadge}
                <h2 class="result-title ${isPerfect ? 'is-perfect-title' : ''}">${resultTitle}</h2>
                <p class="result-stats-text">
                    スコア: <strong>${results.score} / ${results.total}</strong> 語 | 最大コンボ: <strong>${results.maxCombo}</strong>
                </p>

                <!-- 出題単語振り返りリスト -->
                <div class="result-words-box">
                    <div class="result-words-box-header">
                        <h3 class="result-words-box-title">出題単語の振り返り</h3>
                        <span class="result-words-desc">タップして「覚え方のコツ」を確認</span>
                    </div>
                    <ul class="result-words-list">
                        ${results.details.map(item => {
                            const hint = getWordHint(item);
                            return `
                                <li class="result-word-row" data-word-id="${item.id}">
                                    <div class="result-word-main">
                                        <span class="result-status-mark ${item.isCorrect ? 'mark-correct' : 'mark-wrong'}">
                                            ${item.isCorrect ? icons.check(14) : icons.x(14)}
                                        </span>
                                        <div class="result-word-body">
                                            <span class="result-word-name">${item.word}</span>
                                            <span class="result-word-meaning">${item.meaning}</span>
                                            ${item.isTimeUp ? '<span class="timeup-mini-badge">TIME UP</span>' : ''}
                                        </div>
                                        ${hint ? `
                                            <button class="result-hint-toggle-btn" type="button" aria-label="覚え方を見る">
                                                ${icons.bookOpen(14)} 覚え方
                                            </button>
                                        ` : ''}
                                    </div>
                                    ${hint ? `
                                        <div class="result-hint-drawer" style="display: none;">
                                            ${hint.origin ? `<div class="hint-row"><span class="hint-tag origin-tag">語源</span><span class="hint-text">${hint.origin}</span></div>` : ''}
                                            ${hint.link ? `<div class="hint-row"><span class="hint-tag link-tag">連想</span><span class="hint-text">${hint.link}</span></div>` : ''}
                                            ${hint.note ? `<div class="hint-row"><span class="hint-tag note-tag">補足</span><span class="hint-text">${hint.note}</span></div>` : ''}
                                        </div>
                                    ` : ''}
                                </li>
                            `;
                        }).join('')}
                    </ul>
                </div>

                <!-- アクションボタン -->
                <div class="result-btn-col">
                    ${results.wrongWords.length > 0 ? `
                        <button id="res-retry-wrong-btn" class="btn btn-warning btn-full">
                            間違えた単語（${results.wrongWords.length}語）を今すぐ特訓
                        </button>
                    ` : ''}
                    <button id="res-finish-btn" class="btn btn-primary btn-full">ホームに戻る</button>
                </div>
            </div>
        `;

        // 円形プログレスリング & カウントアップのアニメーション実行
        const ring = this.container.querySelector('#quiz-result-ring');
        const percentDisplay = this.container.querySelector('#quiz-result-percent');
        const circumference = 364.425;
        const targetOffset = circumference * (1 - (results.accuracy / 100));

        requestAnimationFrame(() => {
            setTimeout(() => {
                if (ring) {
                    ring.style.strokeDashoffset = targetOffset.toString();
                }
                if (percentDisplay) {
                    const duration = 1200;
                    const start = performance.now();
                    const animateCount = (now) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const currentVal = Math.round(results.accuracy * easeProgress);
                        percentDisplay.textContent = `${currentVal}%`;
                        if (progress < 1) {
                            requestAnimationFrame(animateCount);
                        } else {
                            percentDisplay.textContent = `${results.accuracy}%`;
                        }
                    };
                    requestAnimationFrame(animateCount);
                }
            }, 80);
        });

        const retryBtn = this.container.querySelector('#res-retry-wrong-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                this.startSession({
                    words: results.wrongWords,
                    title: 'ミス単語リベンジ特訓',
                    mode: this.engine.mode
                });
            });
        }

        // リザルト内のヒント開閉
        this.container.querySelectorAll('.result-word-row').forEach(row => {
            const toggle = () => {
                const drawer = row.querySelector('.result-hint-drawer');
                if (drawer) {
                    const isOpen = drawer.style.display !== 'none';
                    drawer.style.display = isOpen ? 'none' : 'block';
                    row.classList.toggle('is-hint-open', !isOpen);
                }
            };
            const btn = row.querySelector('.result-hint-toggle-btn');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggle();
                });
            }
            row.addEventListener('click', () => toggle());
        });

        this.container.querySelector('#res-finish-btn').addEventListener('click', () => {
            this.onFinish();
        });
    }

    setupKeyListeners() {
        window.addEventListener('keydown', (e) => {
            if (!this.container || this.container.offsetParent === null) return;

            // 回答中なら 1〜4 キー
            if (this.isAnswering) {
                const num = parseInt(e.key, 10);
                if (num >= 1 && num <= 4) {
                    const btn = this.container.querySelector(`.quiz-option-btn[data-key="${num}"]`);
                    if (btn && !btn.disabled) {
                        e.preventDefault();
                        btn.classList.add('is-active-press');
                        setTimeout(() => {
                            btn.classList.remove('is-active-press');
                        }, 120);
                        btn.click();
                        if (typeof btn.blur === 'function') {
                            btn.blur();
                        }
                    }
                }
            } else {
                // 回答後なら Space / Enter で次へ
                const nextBtn = this.container.querySelector('#quiz-next-btn');
                if (nextBtn && nextBtn.style.display !== 'none') {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        this.handleNext();
                    }
                }
            }
        });
    }
}
