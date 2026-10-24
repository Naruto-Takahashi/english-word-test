/**
 * 統計＆設定画面View
 * 学習データ可視化、単語セット切り替え、環境設定、JSONバックアップ/復元
 */

import { icons } from '../modules/icons.js?v=5.50';
import { promptInstallPWA, isStandalone, canInstallPWA, onPWAStateChange } from '../modules/pwa.js?v=5.50';

export class StatsView {
    constructor({ container, store, onSetChange }) {
        this.container = container;
        this.store = store;
        this.onSetChange = onSetChange;
        this.allWords = [];
    }

    setWords(words) {
        this.allWords = words;
        this.render();
    }

    render() {
        if (!this.container) return;
        const stats = this.store.getOverallStats(this.allWords);
        const standalone = isStandalone();

        this.container.innerHTML = `
            <div class="stats-view-container">
                <h2 class="view-title">設定・統計</h2>

                <!-- アプリ版インストール（PWA）カード -->
                <div class="settings-card pwa-install-card">
                    <div class="pwa-card-header">
                        <div class="pwa-card-icon">
                            ${icons.smartphone(24)}
                        </div>
                        <div class="pwa-card-meta">
                            <h3 class="settings-card-title" style="margin-bottom: 0.25rem;">アプリ版として使う (PWA)</h3>
                            <p class="settings-desc" style="margin-bottom: 0;">
                                ${standalone 
                                    ? 'アプリ版として正常にインストールされています。全画面・高速起動・オフラインで学習可能です。' 
                                    : 'ホーム画面やデスクトップに追加すると、ブラウザのアドレスバーなしでアプリのように全画面・高速起動・オフライン対応で利用できます。'}
                            </p>
                        </div>
                    </div>
                    <div class="pwa-action-row" style="margin-top: 1rem;">
                        ${standalone ? `
                            <div class="pwa-installed-badge">
                                ${icons.checkCircle(18)}
                                <span>アプリ版で動作中</span>
                            </div>
                        ` : `
                            <button id="pwa-install-btn" class="btn btn-primary pwa-btn-install" type="button">
                                ${icons.download(16)} アプリをインストール
                            </button>
                        `}
                    </div>
                </div>

                <!-- 単語セット切り替えセクション -->
                <div class="settings-card">
                    <h3 class="settings-card-title">単語セット選択</h3>
                    <div class="set-selector-row">
                        <button class="set-btn ${this.store.currentSet === '1400' ? 'active' : ''}" data-set="1400">
                            Target 1400
                        </button>
                        <button class="set-btn ${this.store.currentSet === '1200' ? 'active' : ''}" data-set="1200">
                            Target 1200
                        </button>
                    </div>
                </div>

                <!-- 統計詳細カード -->
                <div class="settings-card">
                    <h3 class="settings-card-title">学習データ</h3>
                    <div class="stats-grid">
                        <div class="stat-box box-mastered">
                            <span class="stat-number">${stats.mastered}</span>
                            <span class="stat-label">マスター</span>
                        </div>
                        <div class="stat-box box-learning">
                            <span class="stat-number">${stats.learning}</span>
                            <span class="stat-label">学習中</span>
                        </div>
                        <div class="stat-box box-weak">
                            <span class="stat-number">${stats.weak}</span>
                            <span class="stat-label">要復習</span>
                        </div>
                        <div class="stat-box box-new">
                            <span class="stat-number">${stats.new}</span>
                            <span class="stat-label">未学習</span>
                        </div>
                    </div>
                </div>

                <!-- テスト出題設定 -->
                <div class="settings-card">
                    <h3 class="settings-card-title">テスト出題設定</h3>

                    <div class="setting-item-block">
                        <span class="setting-item-title">出題形式</span>
                        <div class="setting-pills-row" data-setting="quizMode">
                            <button class="setting-pill ${this.store.settings.quizMode === 'en2ja' ? 'active' : ''}" data-value="en2ja" type="button">英 → 日 (英語から意味)</button>
                            <button class="setting-pill ${this.store.settings.quizMode === 'ja2en' ? 'active' : ''}" data-value="ja2en" type="button">日 → 英 (意味から単語)</button>
                        </div>
                    </div>

                    <div class="setting-item-block">
                        <span class="setting-item-title">回答制限時間</span>
                        <div class="setting-pills-row" data-setting="timeLimit">
                            <button class="setting-pill ${this.store.settings.timeLimit === 10 ? 'active' : ''}" data-value="10" type="button">10秒 (標準)</button>
                            <button class="setting-pill ${this.store.settings.timeLimit === 5 ? 'active' : ''}" data-value="5" type="button">5秒 (実戦スピード)</button>
                            <button class="setting-pill ${this.store.settings.timeLimit === 0 ? 'active' : ''}" data-value="0" type="button">制限なし</button>
                        </div>
                    </div>

                    <div class="setting-item-block">
                        <span class="setting-item-title">出題順序</span>
                        <div class="setting-pills-row" data-setting="quizOrder">
                            <button class="setting-pill ${this.store.settings.quizOrder === 'random' ? 'active' : ''}" data-value="random" type="button">ランダム</button>
                            <button class="setting-pill ${this.store.settings.quizOrder === 'sequential' ? 'active' : ''}" data-value="sequential" type="button">No.順 (番号通り)</button>
                        </div>
                    </div>
                </div>

                <!-- 学習オプション設定 -->
                <div class="settings-card">
                    <h3 class="settings-card-title">学習環境設定</h3>

                    <label class="setting-toggle-row">
                        <span class="setting-label">正解時の自動送り（オートアドバンス）</span>
                        <span class="toggle-switch">
                            <input type="checkbox" id="set-auto-advance" ${this.store.settings.autoAdvance ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </span>
                    </label>

                    <label class="setting-toggle-row">
                        <span class="setting-label">出題時の発音自動再生</span>
                        <span class="toggle-switch">
                            <input type="checkbox" id="set-auto-speak" ${this.store.settings.autoSpeak ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </span>
                    </label>

                    <label class="setting-toggle-row">
                        <span class="setting-label">効果音（サウンド）</span>
                        <span class="toggle-switch">
                            <input type="checkbox" id="set-sound" ${this.store.settings.soundEnabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </span>
                    </label>
                </div>

                <!-- 周回学習・ステータス整理 -->
                <div class="settings-card">
                    <h3 class="settings-card-title">周回学習・データ整理</h3>
                    <p class="settings-desc">周回学習の開始や、苦手単語の整理を行えます（全消去はされません）。</p>
                    <div class="backup-btn-row">
                        <button id="reset-mastered-btn" class="btn btn-outline" type="button">${icons.rotateCcw(16)} マスター単語を学習中に戻す (2周目)</button>
                        <button id="clear-weak-btn" class="btn btn-outline" type="button">${icons.check(16)} 要復習フラグを一括クリア</button>
                    </div>
                </div>

                <!-- データバックアップ・復元 -->
                <div class="settings-card">
                    <h3 class="settings-card-title">データ保護（バックアップ / 復元）</h3>
                    <p class="settings-desc">端末変更やブラウザのデータ消去に備え、進捗データをJSONファイルとして保存できます。</p>

                    <div class="backup-btn-row">
                        <button id="backup-export-btn" class="btn btn-outline" type="button">${icons.download(16)} 進捗をダウンロード</button>
                        <button id="backup-import-btn" class="btn btn-outline" type="button">${icons.upload(16)} バックアップを復元</button>
                        <input type="file" id="backup-file-input" accept=".json" style="display: none;">
                    </div>
                </div>

                <!-- データ初期化 -->
                <div class="settings-card danger-card">
                    <h3 class="settings-card-title" style="color: var(--danger-color);">データの初期化</h3>
                    <p class="settings-desc">現在の単語セット（${this.store.currentSet}語）の学習履歴をすべて消去します。</p>
                    <button id="reset-data-btn" class="btn btn-danger-outline" type="button">${icons.trash(16)} 現在の学習履歴をリセット</button>
                </div>
            </div>
        `;

        // PWA インストールボタン
        const pwaInstallBtn = this.container.querySelector('#pwa-install-btn');
        if (pwaInstallBtn) {
            pwaInstallBtn.addEventListener('click', async () => {
                const res = await promptInstallPWA();
                if (res.installed) {
                    this.render();
                }
            });
        }

        // 単語セット切り替え
        this.container.querySelectorAll('.set-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newSet = btn.dataset.set;
                if (newSet !== this.store.currentSet) {
                    this.onSetChange(newSet);
                }
            });
        });

        // 設定ピル切り替え
        this.container.querySelectorAll('.setting-pills-row').forEach(row => {
            const key = row.dataset.setting;
            row.querySelectorAll('.setting-pill').forEach(pill => {
                pill.addEventListener('click', () => {
                    let val = pill.dataset.value;
                    if (key === 'timeLimit') val = parseInt(val, 10);
                    this.store.settings[key] = val;
                    this.store.save();
                    row.querySelectorAll('.setting-pill').forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                });
            });
        });

        // 設定トグル
        this.container.querySelector('#set-auto-advance').addEventListener('change', (e) => {
            this.store.settings.autoAdvance = e.target.checked;
            this.store.save();
        });

        this.container.querySelector('#set-auto-speak').addEventListener('change', (e) => {
            this.store.settings.autoSpeak = e.target.checked;
            this.store.save();
        });

        this.container.querySelector('#set-sound').addEventListener('change', (e) => {
            this.store.settings.soundEnabled = e.target.checked;
            this.store.save();
        });

        // 周回学習: マスター単語を学習中に戻す
        this.container.querySelector('#reset-mastered-btn').addEventListener('click', () => {
            const stats = this.store.getOverallStats(this.allWords);
            if (stats.mastered === 0) {
                alert('現在「マスター」の単語はありません。');
                return;
            }
            if (confirm(`マスター済みの ${stats.mastered} 語を「学習中」に戻して2周目の学習を開始しますか？\n（お気に入り・ブックマークは保持されます）`)) {
                const count = this.store.resetMasteredToLearning();
                alert(`${count} 語を学習中に戻しました。2周目を始めましょう！`);
                this.render();
            }
        });

        // 周回学習: 要復習フラグを一括クリア
        this.container.querySelector('#clear-weak-btn').addEventListener('click', () => {
            const stats = this.store.getOverallStats(this.allWords);
            if (stats.weak === 0) {
                alert('現在「要復習」の単語はありません。');
                return;
            }
            if (confirm(`要復習の ${stats.weak} 語を一括クリアして「学習中」に戻しますか？`)) {
                const count = this.store.clearWeakStatus();
                alert(`${count} 語の要復習フラグをクリアしました。`);
                this.render();
            }
        });

        // エクスポート
        this.container.querySelector('#backup-export-btn').addEventListener('click', () => {
            const jsonStr = this.store.exportJSON();
            const date = new Date().toISOString().slice(0, 10);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `vocabflow-backup-${this.store.currentSet}-${date}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });

        // インポート
        const fileInput = this.container.querySelector('#backup-file-input');
        this.container.querySelector('#backup-import-btn').addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const res = this.store.importJSON(event.target.result);
                if (res.success) {
                    alert('バックアップデータを正常に復元しました！');
                    this.render();
                } else {
                    alert(`復元に失敗しました: ${res.error}`);
                }
            };
            reader.readAsText(file);
        });

        // リセット
        this.container.querySelector('#reset-data-btn').addEventListener('click', () => {
            if (confirm(`本当に「${this.store.currentSet}語セット」の学習履歴をリセットしますか？\nこの操作は取り消せません。`)) {
                this.store.resetCurrentSetData();
                alert('学習履歴をリセットしました。');
                this.render();
            }
        });
    }
}
