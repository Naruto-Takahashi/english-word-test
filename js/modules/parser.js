/**
 * 単語データのパースおよび品詞推測モジュール
 */

export function parseTSV(data) {
    const cleanData = data.trim().replace(/\\s*/g, '');
    const lines = cleanData.split('\n');
    lines.shift();
    const words = lines.map(line => {
        const parts = line.split('\t');
        if (parts.length < 3) return null;
        const id = parseInt(parts[0], 10);
        const word = parts[1].trim();
        const meaning = parts[2].trim();
        if (isNaN(id) || !word) return null;
        return { id, word, meaning };
    }).filter(Boolean);
    return words;
}

export function extractPos(meaningStr) {
    const meaning_raw = String(meaningStr);
    const pos_map = { '名': '名詞', '動': '動詞', '形': '形容詞', '副': '副詞', '助': '助動詞', '前': '前置詞', '接': '接続詞', '代': '代名詞' };
    const match = meaning_raw.match(/[（【(](名|動|形|副|助|前|接|代)[)）】]/);
    if (match) return pos_map[match[1]] || 'その他';

    const meaning = meaning_raw.replace(/（.*?）|【.*?】|〔.*?〕|\(.*?\)/g, '').split('，')[0].split('、')[0].split('；')[0].trim();
    if (meaning.endsWith('する') || /[うくぐすずずつづぬふぶむゆる]$/.test(meaning) || meaning.includes('を') || meaning.includes('に ') || meaning.includes('と ')) {
        return '動詞';
    } else if (meaning.endsWith('い') || meaning.endsWith('な') || meaning.endsWith('的') || meaning.includes('な ')) {
        return '形容詞';
    } else if (meaning.endsWith('に') || meaning.endsWith('く') || meaning.endsWith('で')) {
        return '副詞';
    } else {
        return '名詞';
    }
}

export function preprocessWords(words) {
    return words.map(w => ({
        ...w,
        pos: extractPos(w.meaning),
        main_meaning: w.meaning.split('；')[0].replace(/（.*?）|【.*?】|〔.*?〕/g, '').trim()
    }));
}
