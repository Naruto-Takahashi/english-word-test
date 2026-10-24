/**
 * PWA 1クリック・インストール管理モジュール
 * beforeinstallprompt の捕捉、1クリックインストールダイアログ呼び出し、iOS向け案内ガイド
 */

import { icons } from './icons.js?v=5.70';

let deferredPrompt = null;
const listeners = new Set();

/**
 * スタンドアロン（PWAアプリ版）として実行中かどうか判定
 * @returns {boolean}
 */
export function isStandalone() {
    return (
        (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
        (typeof window !== 'undefined' && window.navigator && window.navigator.standalone === true) ||
        (typeof document !== 'undefined' && document.referrer && document.referrer.includes('android-app://')) ||
        false
    );
}

/**
 * iOS端末（iPhone / iPad / iPadOS）かどうか判定
 * @returns {boolean}
 */
export function isIOS() {
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return isIOSDevice || isIPadOS;
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
 * beforeinstallprompt イベントが届くまで少し待機するヘルパー
 * @param {number} timeoutMs
 * @returns {Promise<any>}
 */
function waitForPrompt(timeoutMs = 1200) {
    if (deferredPrompt) return Promise.resolve(deferredPrompt);
    return new Promise(resolve => {
        let timer = null;
        const handler = (e) => {
            clearTimeout(timer);
            resolve(e);
        };
        timer = setTimeout(() => {
            window.removeEventListener('beforeinstallprompt', handler);
            resolve(deferredPrompt);
        }, timeoutMs);
        window.addEventListener('beforeinstallprompt', handler, { once: true });
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

    // iOS (Safari) の場合: AppleのOSセキュリティ制約によりWebページからのダイアログ直接起動が不可能なため、わかりやすい図解ガイドを表示
    if (isIOS()) {
        showIOSInstallModal();
        return { installed: false, outcome: 'ios_guide' };
    }

    // Android / PC (Chrome / Edge 等): ロード直後の押下時に備えてプロンプトを少し待機
    if (!deferredPrompt) {
        await waitForPrompt(1200);
    }

    if (deferredPrompt) {
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
            deferredPrompt = null;
            notifyListeners();
            return { installed: true, outcome: 'accepted' };
        } else {
            return { installed: false, outcome: 'dismissed' };
        }
    }

    // 既にインストール済み、または beforeinstallprompt 非対応環境の場合
    showGeneralInstallModal();
    return { installed: false, outcome: 'general_guide' };
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
                    <p class="ios-sheet-sub">全画面・オフラインで高速学習できます</p>
                </div>
                <button class="ios-sheet-close" id="btn-close-ios-modal" aria-label="閉じる">${icons.x(18)}</button>
            </div>

            <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: 8px; padding: 0.6rem 0.8rem; margin-bottom: 1rem; font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
                ※ iOS Safari は Apple の仕様により、共有メニューから追加します（AndroidやPCでは1クリックで直接インストールできます）。
            </div>

            <div class="ios-steps-list">
                <div class="ios-step-item">
                    <span class="ios-step-num">1</span>
                    <div class="ios-step-text">
                        Safari 下部（iPadは上部）の <strong>共有ボタン</strong> 
                        <span class="ios-share-icon">${icons.share(16)}</span> をタップします。
                    </div>
                </div>
                <div class="ios-step-item">
                    <span class="ios-step-num">2</span>
                    <div class="ios-step-text">
                        共有メニューを少しスクロールし、<strong>「ホーム画面に追加」</strong> を選択します。
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
 * PC / その他ブラウザ向けの手動インストール案内モーダル
 */
export function showGeneralInstallModal() {
    const existing = document.getElementById('general-install-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'general-install-modal';
    modal.className = 'ios-install-overlay';
    modal.innerHTML = `
        <div class="ios-install-sheet">
            <div class="ios-sheet-handle"></div>
            <div class="ios-sheet-header">
                <div class="ios-sheet-icon">
                    <img src="./icons/icon-192.png" alt="英単語テスト" width="48" height="48" style="border-radius: 12px;">
                </div>
                <div>
                    <h3 class="ios-sheet-title">アプリをインストール</h3>
                    <p class="ios-sheet-sub">全画面・オフラインで利用できます</p>
                </div>
                <button class="ios-sheet-close" id="btn-close-general-modal" aria-label="閉じる">${icons.x(18)}</button>
            </div>

            <div style="font-size: 0.88rem; color: var(--text-color); line-height: 1.6; margin: 0.8rem 0;">
                <p style="margin-bottom: 0.6rem;">
                    <strong>Chrome / Edge の場合:</strong><br>
                    アドレスバーの右側にある <strong>「インストール」アイコン</strong>（またはブラウザ右上の「︙」メニュー →「英単語テストをインストール」）をクリックしてください。
                </p>
                <p>
                    <strong>Android Chrome の場合:</strong><br>
                    右上のメニュー（︙）から <strong>「アプリをインストール」</strong> または <strong>「ホーム画面に追加」</strong> をタップしてください。
                </p>
            </div>

            <button class="btn btn-primary" id="btn-ok-general-modal" style="width: 100%; margin-top: 1rem;">
                とじる
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();
    modal.querySelector('#btn-close-general-modal').addEventListener('click', closeModal);
    modal.querySelector('#btn-ok-general-modal').addEventListener('click', closeModal);
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
