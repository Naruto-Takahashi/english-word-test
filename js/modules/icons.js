/**
 * Lucide Icons 準拠のインラインSVGアイコンモジュール
 * 統一された2pxストローク、currentColor連携、ゼロ外部依存
 */

function svg(paths, size = 20, className = '') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon ${className}">${paths}</svg>`;
}

export const icons = {
    // ロゴ・稲妻
    zap: (size = 20, cls = '') => svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>', size, cls),

    // 本（学習）
    bookOpen: (size = 20, cls = '') => svg('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>', size, cls),

    // 単語帳・しおり
    bookmark: (size = 20, cls = '', filled = false) => {
        const fill = filled ? 'fill="currentColor"' : 'fill="none"';
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" ${fill} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon ${cls}"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>`;
    },

    // 設定・スライダー
    sliders: (size = 20, cls = '') => svg('<line x1="4" x2="4" y1="21" y2="14"></line><line x1="4" x2="4" y1="10" y2="3"></line><line x1="12" x2="12" y1="21" y2="12"></line><line x1="12" x2="12" y1="8" y2="3"></line><line x1="20" x2="20" y1="21" y2="16"></line><line x1="20" x2="20" y1="12" y2="3"></line><line x1="1" x2="7" y1="14" y2="14"></line><line x1="9" x2="15" y1="8" y2="8"></line><line x1="17" x2="23" y1="16" y2="16"></line>', size, cls),

    // スマート復習（リロード・反復）
    rotateCcw: (size = 20, cls = '') => svg('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path>', size, cls),

    // 星・お気に入り
    star: (size = 20, cls = '', filled = false) => {
        const fill = filled ? 'fill="currentColor"' : 'fill="none"';
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" ${fill} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon ${cls}"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    },

    // カードデッキ（カード暗記）
    layers: (size = 20, cls = '') => svg('<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>', size, cls),

    // テスト・チェック
    checkCircle: (size = 20, cls = '') => svg('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>', size, cls),

    // コンボ・炎
    flame: (size = 20, cls = '') => svg('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>', size, cls),

    // 発音・スピーカー
    volume: (size = 20, cls = '') => svg('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>', size, cls),

    // 検索
    search: (size = 20, cls = '') => svg('<circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line>', size, cls),

    // 閉じる・バツ
    x: (size = 20, cls = '') => svg('<line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line>', size, cls),

    // 矢印
    arrowLeft: (size = 20, cls = '') => svg('<line x1="19" x2="5" y1="12" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>', size, cls),
    arrowRight: (size = 20, cls = '') => svg('<line x1="5" x2="19" y1="12" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>', size, cls),

    // 空状態（受信トレイ）
    inbox: (size = 32, cls = '') => svg('<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>', size, cls),

    // ダウンロード
    download: (size = 18, cls = '') => svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" x2="12" y1="15" y2="3"></line>', size, cls),

    // アップロード
    upload: (size = 18, cls = '') => svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line>', size, cls),

    // ゴミ箱
    trash: (size = 18, cls = '') => svg('<polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>', size, cls),

    // チェックマーク
    check: (size = 16, cls = '') => svg('<polyline points="20 6 9 17 4 12"></polyline>', size, cls),

    // シェブロン（展開・折りたたみ）
    chevronDown: (size = 20, cls = '') => svg('<polyline points="6 9 12 15 18 9"></polyline>', size, cls),
    chevronUp: (size = 20, cls = '') => svg('<polyline points="18 15 12 9 6 15"></polyline>', size, cls),

    // 共有・デバイス（PWA用）
    share: (size = 20, cls = '') => svg('<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" x2="12" y1="2" y2="15"></line>', size, cls),
    smartphone: (size = 20, cls = '') => svg('<rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect><line x1="12" x2="12.01" y1="18" y2="18"></line>', size, cls)
};
