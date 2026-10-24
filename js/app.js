/**
 * 英単語テスト - メインエントリーポイント & ルーター
 */

import { target1200Data } from '../data/target1200.js?v=5.50';
import { target1400Data } from '../data/target1400.js?v=5.50';
import { parseTSV, preprocessWords } from './modules/parser.js?v=5.50';
import { VocabStore } from './modules/store.js?v=5.50';
import { QuizEngine } from './modules/quiz-engine.js?v=5.50';
import { initAudio } from './modules/audio.js?v=5.50';

import { LearnView } from './views/learn-view.js?v=5.50';
import { QuizView } from './views/quiz-view.js?v=5.50';
import { WordsView } from './views/words-view.js?v=5.50';
import { StatsView } from './views/stats-view.js?v=5.50';
import { initPWA, promptInstallPWA, onPWAStateChange } from './modules/pwa.js?v=5.50';

class App {
    constructor() {
        this.store = new VocabStore();
        this.quizEngine = new QuizEngine({ store: this.store });

        this.words1200 = [];
        this.words1400 = [];
        this.currentWords = [];

        // DOMスロット
        this.slots = {
            learn: document.getElementById('view-learn'),
            quiz: document.getElementById('view-quiz'),
            words: document.getElementById('view-words'),
            stats: document.getElementById('view-stats')
        };

        this.nav = document.getElementById('app-nav');
        this.setLabelBadge = document.getElementById('active-set-badge');

        this.activeTab = 'learn';
    }

    init() {
        // データ前処理
        this.words1200 = preprocessWords(parseTSV(target1200Data));
        this.words1400 = preprocessWords(parseTSV(target1400Data));
        this.setWordSet(this.store.currentSet, false);

        // 各Viewの初期化
        this.learnView = new LearnView({
            container: this.slots.learn,
            store: this.store,
            onStartQuiz: (options) => this.startQuiz(options)
        });

        this.quizView = new QuizView({
            container: this.slots.quiz,
            store: this.store,
            engine: this.quizEngine,
            onFinish: () => this.endSession()
        });

        this.wordsView = new WordsView({
            container: this.slots.words,
            store: this.store
        });

        this.statsView = new StatsView({
            container: this.slots.stats,
            store: this.store,
            onSetChange: (newSet) => this.setWordSet(newSet, true)
        });

        this.updateViewsWithWords();
        this.setupNavigation();
        this.switchTab('learn');

        // 音声アンロック
        document.body.addEventListener('click', initAudio, { once: true });
        document.body.addEventListener('keydown', initAudio, { once: true });

        // PWA インストールマネージャー初期化
        initPWA();
        const headerInstallBtn = document.getElementById('btn-header-install');
        if (headerInstallBtn) {
            headerInstallBtn.addEventListener('click', async () => {
                await promptInstallPWA();
            });

            onPWAStateChange(({ isStandalone }) => {
                if (isStandalone) {
                    headerInstallBtn.style.display = 'none';
                } else {
                    headerInstallBtn.style.display = 'inline-flex';
                }
            });
        }

        // Service Worker 登録 (PWA)
        if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
            navigator.serviceWorker.register('./sw.js?v=5.50').catch(() => {});
        }
    }

    setWordSet(setName, rerender = true) {
        this.store.load(setName);
        this.currentWords = (setName === '1200') ? this.words1200 : this.words1400;
        this.quizEngine.setWords(this.currentWords);

        if (this.setLabelBadge) {
            this.setLabelBadge.textContent = (setName === '1400') ? 'Target 1400' : 'Target 1200';
        }

        if (rerender) {
            this.updateViewsWithWords();
        }
    }

    updateViewsWithWords() {
        if (this.learnView) this.learnView.setWords(this.currentWords);
        if (this.wordsView) this.wordsView.setWords(this.currentWords);
        if (this.statsView) this.statsView.setWords(this.currentWords);
    }

    setupNavigation() {
        if (!this.nav) return;

        // PC（幅 820px以上: ヘッダー中央配置）とスマホ（幅 820px未満: 画面最下部ボトムナビ）でDOM配置を同期
        const headerCenter = document.querySelector('#header-center');
        const appLayout = document.querySelector('.app-layout');
        const syncPlacement = () => {
            if (window.innerWidth >= 820) {
                if (headerCenter && this.nav.parentElement !== headerCenter) {
                    headerCenter.appendChild(this.nav);
                }
            } else {
                if (appLayout && this.nav.parentElement !== appLayout) {
                    appLayout.appendChild(this.nav);
                }
            }
        };
        syncPlacement();
        window.addEventListener('resize', syncPlacement);

        this.nav.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const tab = item.dataset.tab;
                this.switchTab(tab);
            });
        });
    }

    switchTab(tabName) {
        this.activeTab = tabName;
        document.body.classList.remove('in-session');

        // タブボタンのアクティブ状態
        if (this.nav) {
            this.nav.querySelectorAll('.nav-item').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === tabName);
            });
        }

        // ビューパネルの表示切り替え
        Object.keys(this.slots).forEach(name => {
            const panel = this.slots[name];
            if (!panel) return;
            if (name === tabName) {
                panel.style.display = 'block';
                panel.classList.add('active');
            } else {
                panel.style.display = 'none';
                panel.classList.remove('active');
            }
        });

        // タブ切り替え時のリフレッシュ
        if (tabName === 'learn' && this.learnView) {
            this.learnView.render();
        } else if (tabName === 'words' && this.wordsView) {
            this.wordsView.render();
        } else if (tabName === 'stats' && this.statsView) {
            this.statsView.render();
        }

        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    startQuiz({ words, title = 'スピードテスト', mode = undefined, limit = 0 }) {
        initAudio();
        document.body.classList.add('in-session');
        Object.keys(this.slots).forEach(name => {
            this.slots[name].style.display = (name === 'quiz') ? 'block' : 'none';
        });
        this.quizView.startSession({ words, title, mode, limit });
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    endSession() {
        this.switchTab('learn');
    }
}

const app = new App();
window.app = app;
app.init();
