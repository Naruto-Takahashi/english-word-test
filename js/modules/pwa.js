/**
 * PWA 1クリック・インストール管理モジュール
 * beforeinstallprompt の捕捉、1クリックインストールダイアログ呼び出し、iOS向け案内ガイド
 */

import { icons } from './icons.js';

let deferredPrompt = null;
const listeners = new Set();

/**
 * スタンドアロン（PWAアプリ版）として実行中かどうか判定
 * @returns {boolean}
 */
export function isStandalone() {
    return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://')
    );
}

/**
 * iOS端末（Safari）かどうか判定
 * @returns {boolean}
 */
export function isIOS() {
    const ua = window.navigator.userAgent;
    return /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
}

/**
 * PWAインストールが可能かどうか（未インストールかつサポート環境）
 * @returns {boolean}
 */
export function canInstallPWA() {
    if (isStandalone()) return false;
    return Boolean(deferredPrompt) || isIOS();
}

/**
 * PWAインストールの状態変化リスナー登録
 * @param {Function} callback
 */
export function onPWAStateChange(callback) {
    listeners.add(callback);
    callback({
        canInstall: canInstallPWA(),
        isStandalone: isStandalone(),
        isIOS: isIOS()
    });
    return () => listeners.delete(callback);
}

function notifyListeners() {
    const state = {
        canInstall: canInstallPWA(),
        isStandalone: isStandalone(),
        isIOS: isIOS()
    };
    listeners.forEach(cb => {
        try { cb(state); } catch (e) { console.error(e); }
    });
}

/**
 * 1クリックインストール実行
 * @returns {Promise<{ installed: boolean, outcome?: string }>}
 */
export async function promptInstallPWA() {
    if (isStandalone()) {
        return { installed: true };
    }

    // Android / PC Chrome / Edge 等: beforeinstallprompt がある場合
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
            deferredPrompt = null;
            notifyListeners();
            return { installed: true, outcome: 'accepted' };
        } else {
            return { installed: false, outcome: 'dismissed' };
        }
    }

    // iOS Safari の場合: 案内モーダルを表示
    if (isIOS()) {
        showIOSInstallModal();
        return { installed: false, outcome: 'ios_guide' };
    }

    // それ以外（既にインストール済み、または非対応ブラウザ）
    alert('お使いのブラウザメニューから「ホーム画面に追加」または「アプリをインストール」を選択してください。');
    return { installed: false, outcome: 'manual' };
}

/**
 * iOS向けホーム画面追加ガイドモーダル
 */
export function showIOSInstallModal() {
    const existing = document.getElementById('ios-install-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'ios-install-modal';
    modal.className = 'ios-install-overlay';
    modal.innerHTML = `
        <div class="ios-install-sheet">
            <div class="ios-sheet-handle"></div>
            <div class="ios-sheet-header">
                <div class="ios-sheet-icon">
                    <img src="./icons/icon-192.png" alt="英単語テスト" width="48" height="48" style="border-radius: 12px;">
                </div>
                <div>
                    <h3 class="ios-sheet-title">「英単語テスト」をホーム画面に追加</h3>
                    <p class="ios-sheet-sub">全画面・オフラインで快適に学習できます</p>
                </div>
                <button class="ios-sheet-close" id="btn-close-ios-modal" aria-label="閉じる">${icons.x(18)}</button>
            </div>

            <div class="ios-steps-list">
                <div class="ios-step-item">
                    <span class="ios-step-num">1</span>
                    <div class="ios-step-text">
                        Safari 下部のツールバーにある <strong>共有ボタン</strong> 
                        <span class="ios-share-icon">${icons.share(16)}</span> をタップします。
                    </div>
                </div>
                <div class="ios-step-item">
                    <span class="ios-step-num">2</span>
                    <div class="ios-step-text">
                        メニューを少し下にスクロールし、<strong>「ホーム画面に追加」</strong> を選択します。
                    </div>
                </div>
                <div class="ios-step-item">
                    <span class="ios-step-num">3</span>
                    <div class="ios-step-text">
                        右上の <strong>「追加」</strong> をタップすると、ホーム画面にアプリアイコンが登録されます。
                    </div>
                </div>
            </div>

            <button class="btn btn-primary" id="btn-ok-ios-modal" style="width: 100%; margin-top: 1.2rem;">
                わかりました
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('#btn-close-ios-modal').addEventListener('click', closeModal);
    modal.querySelector('#btn-ok-ios-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

/**
 * PWAインストーラー初期化
 */
export function initPWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        notifyListeners();
    });

    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        notifyListeners();
    });

    // 初回状態通知
    setTimeout(notifyListeners, 300);
}
