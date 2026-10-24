/**
 * html2canvas を用いた結果画像の共有・保存・クリップボードコピーモジュール
 */

function downloadImage(canvas, fileName) {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function prepareForCapture(resultList, buttons) {
    buttons.forEach(btn => {
        if (btn) btn.style.display = 'none';
    });
    const originalMaxHeight = resultList ? resultList.style.maxHeight : '';
    const originalOverflow = resultList ? resultList.style.overflowY : '';
    if (resultList) {
        resultList.style.maxHeight = 'none';
        resultList.style.overflowY = 'visible';
    }
    return () => {
        buttons.forEach(btn => {
            if (btn) btn.style.display = 'block';
        });
        if (resultList) {
            resultList.style.maxHeight = originalMaxHeight;
            resultList.style.overflowY = originalOverflow;
        }
    };
}

export async function saveResultAsImage(container, resultList, buttonsToHide) {
    if (!window.html2canvas) {
        alert('html2canvas ライブラリが読み込まれていません。');
        return;
    }

    const restore = prepareForCapture(resultList, buttonsToHide);

    try {
        const canvas = await window.html2canvas(container, {
            backgroundColor: '#f8f9fa',
            scale: 2,
            logging: false,
            useCORS: true
        });

        const date = new Date().toISOString().slice(0, 10);
        const fileName = `word-test-result-${date}.png`;

        canvas.toBlob(async (blob) => {
            if (!blob) {
                restore();
                return;
            }
            const file = new File([blob], fileName, { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: '英単語テスト結果',
                        text: '本日のテスト結果です。'
                    });
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        downloadImage(canvas, fileName);
                    }
                }
            } else {
                downloadImage(canvas, fileName);
            }
            restore();
        }, 'image/png');
    } catch (err) {
        console.error('Image capture failed:', err);
        restore();
    }
}

export async function copyResultImageToClipboard(container, resultList, buttonsToHide) {
    if (!window.html2canvas) {
        alert('html2canvas ライブラリが読み込まれていません。');
        return;
    }

    const restore = prepareForCapture(resultList, buttonsToHide);

    try {
        const canvas = await window.html2canvas(container, {
            backgroundColor: '#fefae0',
            scale: 2,
            logging: false,
            useCORS: true
        });

        canvas.toBlob(async (blob) => {
            if (!blob) {
                restore();
                return;
            }
            try {
                const item = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([item]);
                alert('画像をクリップボードにコピーしました！');
            } catch (err) {
                console.error('Clipboard copy failed:', err);
                alert('コピーに失敗しました。お使いのブラウザが対応していない可能性があります。');
            } finally {
                restore();
            }
        }, 'image/png');
    } catch (err) {
        console.error('Image capture failed:', err);
        restore();
    }
}
