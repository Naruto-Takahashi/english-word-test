/**
 * 効果音（Web Audio API）および音声読み上げ（SpeechSynthesis）モジュール
 */

let audioCtx = null;

export function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

export function playSE(type, param = 1) {
    if (!audioCtx) initAudio();
    if (!audioCtx) return;

    const t = audioCtx.currentTime;

    if (type === 'correct') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.32, t);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.12);

        setTimeout(() => {
            if (!audioCtx) return;
            const t2 = audioCtx.currentTime;
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            gain2.gain.setValueAtTime(0.32, t2);
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(783.99, t2); // G5
            gain2.gain.exponentialRampToValueAtTime(0.0001, t2 + 0.18);
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.start(t2);
            osc2.stop(t2 + 0.18);
        }, 80);
    } else if (type === 'combo') {
        // コンボ数に応じてピッチが少しずつ上がる明るいチャイム
        const baseFreq = 523.25;
        const semitones = Math.min(param, 12);
        const freq = baseFreq * Math.pow(2, semitones / 12);

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.35, t);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.22);
    } else if (type === 'wrong') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.25, t);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, t);
        osc.frequency.exponentialRampToValueAtTime(90, t + 0.22);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + 0.22);
    }
}

let preferredEnglishVoice = null;

function loadEnglishVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // 高品質な英語ネイティブボイスを優先選択
    preferredEnglishVoice = voices.find(v => 
        (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Natural') || v.name.includes('David')) &&
        (v.lang === 'en-US' || v.lang === 'en_US')
    ) || voices.find(v => v.lang === 'en-US' || v.lang === 'en_US')
      || voices.find(v => v.lang.startsWith('en'))
      || null;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    loadEnglishVoices();
    window.speechSynthesis.onvoiceschanged = loadEnglishVoices;
}

let ttsAudioElement = null;

export function speak(text) {
    if (typeof window === 'undefined') return;

    if (!preferredEnglishVoice) {
        loadEnglishVoices();
    }

    // 1. 端末に英語ネイティブボイスが存在する場合は Web Speech API を使用（低遅延）
    if (preferredEnglishVoice && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = preferredEnglishVoice;
        utterance.lang = preferredEnglishVoice.lang;
        utterance.rate = 0.90;
        utterance.volume = 0.85;
        window.speechSynthesis.speak(utterance);
        return;
    }

    // 2. 端末に日本語ボイスしかなく英語ボイスが無い環境（日本の学校PCやAndroid環境など）：
    // 日本語音声による「ローマ字読み」を確実に防止するため、Google TTS のネイティブ英語音声を再生
    try {
        if (ttsAudioElement) {
            ttsAudioElement.pause();
            ttsAudioElement.currentTime = 0;
        }
        const cleanWord = text.trim();
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(cleanWord)}`;
        ttsAudioElement = new Audio(url);
        ttsAudioElement.playbackRate = 0.95;
        ttsAudioElement.volume = 0.85;
        ttsAudioElement.play().catch(() => {
            // オフライン等で再生できない場合のみ、SpeechSynthesisにフォールバック
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const fallback = new SpeechSynthesisUtterance(cleanWord);
                fallback.lang = 'en-US';
                fallback.volume = 0.85;
                window.speechSynthesis.speak(fallback);
            }
        });
    } catch {
        // 例外処理
    }
}
