/**
 * 設定画面View
 * アプリ管理（PWA）、環境設定（自動送り・発音・効果音）、周回学習・データバックアップ/初期化
 */

import { icons } from '../modules/icons.js?v=5.80';
import { promptInstallPWA, isStandalone, canInstallPWA, onPWAStateChange } from '../modules/pwa.js?v=5.80';

export class StatsView {
    constructor({ container, store, onSetChange }) {
        this.container = container;
        this.store = store;
        this.onSetChange = onSetChange;
        this.allWords = [];
    }

    setWords(words) {
        this.allWords = words || [];
        this.render();
    }

    render() {
        if (!this.container) return;
        const standalone = isStandalone();

        this.container.innerHTML = `
            <div class="stats-view-container" aria-label="設定画面">
                <h2 class="view-title">設定・データ管理</h2>

                <!-- アプリ版インストール（PWA）カード -->
                <div class="settings-card pwa-install-card">
                    <div class="pwa-card-header">
                        <div class="pwa-card-icon">
                            ${icons.smartphone(24)}
                        </div>
                        <div class="pwa-card-meta">
                            <h3 class="settings-card-title">アプリ版として使う (PWA)</h3>
                            <p class="settings-desc">
                                ${standalone 
                                    ? 'アプリ版として正常にインストールされています。全画面・高速起動・オフラインで利用可能です。' 
                                    : 'ホーム画面に追加すると、アドレスバーなしの全画面・高速起動・オフライン対応で利用できます。'}
                            </p>
                        </div>
                    </div>
                    <div class="pwa-action-row">
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

                <!-- 学習環境設定 -->
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
                        <button id="reset-mastered-btn" class="btn btn-outline" type="button">
                            ${icons.rotateCcw(16)} マスター単語を学習中に戻す (2周目)
                        </button>
                        <button id="reset-weak-btn" class="btn btn-outline" type="button">
                            ${icons.rotateCcw(16)} 要復習ステータスをリセット
                        </button>
                    </div>
                </div>

                <!-- データバックアップ・復元・初期化 -->
                <div class="settings-card">
                    <h3 class="settings-card-title">データ管理</h3>
                    <p class="settings-desc">学習記録のバックアップ（JSONファイル保存）や、他端末への移行ができます。</p>
                    <div class="backup-btn-row">
                        <button id="backup-btn" class="btn btn-outline" type="button">
                            ${icons.download(16)} バックアップ保存
                        </button>
                        <label class="btn btn-outline btn-upload" style="margin: 0; cursor: pointer;">
                            ${icons.upload(16)} 復元 (ファイル選択)
                            <input type="file" id="restore-file-input" accept=".json" style="display: none;">
                        </label>
                    </div>
                    <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                        <button id="reset-all-btn" class="btn btn-danger-outline" type="button">
                            ${icons.trash(16)} 全学習記録の初期化
                        </button>
                    </div>
                </div>
            </div>
        `;

        // PWA インストールボタン
        const pwaBtn = this.container.querySelector('#pwa-install-btn');
        if (pwaBtn) {
            pwaBtn.addEventListener('click', async () => {
                await promptInstallPWA();
            });
        }

        // トグル設定
        const bindToggle = (id, settingKey) => {
            const input = this.container.querySelector(id);
            if (input) {
                input.addEventListener('change', (e) => {
                    this.store.settings[settingKey] = e.target.checked;
                    this.store.save();
                });
            }
        };

        bindToggle('#set-auto-advance', 'autoAdvance');
        bindToggle('#set-auto-speak', 'autoSpeak');
        bindToggle('#set-sound', 'soundEnabled');

        // マスター単語を学習中に戻す（2周目）
        const resetMasteredBtn = this.container.querySelector('#reset-mastered-btn');
        if (resetMasteredBtn) {
            resetMasteredBtn.addEventListener('click', () => {
                if (confirm('マスター済みの単語をすべて「学習中」に戻しますか？\n（ブックマークやお気に入り情報は保持されます）')) {
                    this.store.resetMasteredToLearning();
                    alert('マスター単語を学習中に戻しました。2周目を始めましょう！');
                    this.render();
                }
            });
        }

        // 要復習ステータスリセット
        const resetWeakBtn = this.container.querySelector('#reset-weak-btn');
        if (resetWeakBtn) {
            resetWeakBtn.addEventListener('click', () => {
                if (confirm('要復習に登録されている単語を「学習中」に戻しますか？')) {
                    this.store.clearWeakStatuses();
                    alert('要復習ステータスをリセットしました。');
                    this.render();
                }
            });
        }

        // バックアップ保存
        const backupBtn = this.container.querySelector('#backup-btn');
        if (backupBtn) {
            backupBtn.addEventListener('click', () => {
                const dataStr = this.store.exportJSON();
                const blob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                const now = new Date();
                const dateStr = now.toISOString().slice(0, 10);
                a.href = url;
                a.download = `vocab-backup-${this.store.currentSet}-${dateStr}.json`;
                a.click();
                URL.revokeObjectURL(url);
            });
        }

        // 復元（ファイル読み込み）
        const restoreInput = this.container.querySelector('#restore-file-input');
        if (restoreInput) {
            restoreInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    try {
                        const jsonStr = event.target.result;
                        const success = this.store.importJSON(jsonStr);
                        if (success) {
                            alert('学習データを正常に復元しました！');
                            this.render();
                        } else {
                            alert('データの復元に失敗しました。ファイル形式を確認してください。');
                        }
                    } catch (err) {
                        alert('ファイル読み込みエラーが発生しました。');
                    }
                };
                reader.readAsText(file);
            });
        }

        // 全初期化
        const resetAllBtn = this.container.querySelector('#reset-all-btn');
        if (resetAllBtn) {
            resetAllBtn.addEventListener('click', () => {
                if (confirm('警告: すべての学習進捗・ブックマークを消去して初期状態に戻しますか？\nこの操作は元に戻せません。')) {
                    this.store.reset();
                    alert('すべての学習記録を初期化しました。');
                    this.render();
                }
            });
        }
    }
}
