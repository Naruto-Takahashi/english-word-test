/**
 * 統計＆設定画面View
 * 学習データ可視化、単語セット切り替え、環境設定、JSONバックアップ/復元
 */

import { icons } from '../modules/icons.js?v=4.60';
import { promptInstallPWA, isStandalone, canInstallPWA, onPWAStateChange } from '../modules/pwa.js?v=4.60';

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

                <!-- データバックアップ・復元 -->
                <div class="settings-card">
                    <h3 class="settings-card-title">データ保護（バックアップ / 復元）</h3>
                    <p class="settings-desc">端末変更やブラウザのデータ消去に備え、進捗データをJSONファイルとして保存できます。</p>

                    <div class="backup-btn-row">
                        <button id="backup-export-btn" class="btn btn-outline">${icons.download(16)} 進捗をダウンロード</button>
                        <button id="backup-import-btn" class="btn btn-outline">${icons.upload(16)} バックアップを復元</button>
                        <input type="file" id="backup-file-input" accept=".json" style="display: none;">
                    </div>
                </div>

                <!-- データ初期化 -->
                <div class="settings-card danger-card">
                    <h3 class="settings-card-title" style="color: var(--danger-color);">データの初期化</h3>
                    <p class="settings-desc">現在の単語セット（${this.store.currentSet}語）の学習履歴をすべて消去します。</p>
                    <button id="reset-data-btn" class="btn btn-danger-outline">${icons.trash(16)} 現在の学習履歴をリセット</button>
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
