// ===================================================================================
// アプリケーションのコード
// ===================================================================================

let allWords = [];
let allWords1200 = [];
let allWords1400 = [];
let wordStats = {};
let quizWords = [];
let currentQuestionIndex = 0;
let score = 0;
let answeredWords = []; // ★追加：回答済みの単語を記録する配列

// --- 正答率記録機能 ---
function getStatsKey() {
    const selected = document.querySelector('input[name="wordSet"]:checked').value;
    return selected === '1200' ? 'wordTestStats' : 'wordTestStats_' + selected;
}

function loadStats() {
    const storedStats = localStorage.getItem(getStatsKey());
    if (storedStats) {
        wordStats = JSON.parse(storedStats);
    } else {
        wordStats = {};
    }
}

function saveStats() {
    localStorage.setItem(getStatsKey(), JSON.stringify(wordStats));
}

function updateStats(wordId, isCorrect) {
    if (!wordStats[wordId]) {
        wordStats[wordId] = { correct: 0, incorrect: 0 };
    }
    if (isCorrect) {
        wordStats[wordId].correct++;
    } else {
        wordStats[wordId].incorrect++;
    }
}

function getWeakWords(count) {
    const wordIds = Object.keys(wordStats);
    wordIds.sort((a, b) => {
        const statsA = wordStats[a];
        const statsB = wordStats[b];
        
        if (statsB.incorrect !== statsA.incorrect) {
            return statsB.incorrect - statsA.incorrect;
        }
        return statsA.correct - statsB.correct;
    });
    
    return wordIds.slice(0, count);
}
// --- ここまで正答率記録機能（変更なし） ---


function parseTSV(data) {
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

function extractPos(meaningStr) {
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

function preprocessWords(words) {
    return words.map(w => ({
        ...w,
        pos: extractPos(w.meaning),
        main_meaning: w.meaning.split('；')[0].replace(/（.*?）|【.*?】|〔.*?〕/g, '').trim()
    }));
}

function speak(text) {
    if (!window.speechSynthesis) {
        alert("お使いのブラウザは音声合成に対応していません．");
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

let audioCtx;
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playSE(type) {
    if (!audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    if (type === 'correct') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        setTimeout(() => {
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            gain2.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(783.99, audioCtx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.start(audioCtx.currentTime);
            osc2.stop(audioCtx.currentTime + 0.15);
        }, 100);
    } else {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(110, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.2);
    }
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.2);
}

const setupScreen = document.getElementById('setup-screen');
const testScreen = document.getElementById('test-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const startReviewBtn = document.getElementById('start-review-btn');
const restartBtn = document.getElementById('restart-btn');
const nextBtn = document.getElementById('next-btn');
const quitBtn = document.getElementById('quit-btn');
const saveImageBtn = document.getElementById('save-image-btn');
const copyImageBtn = document.getElementById('copy-image-btn');
const startRangeInput = document.getElementById('start-range');

let currentTestMode = 'en2ja'; // 現在の問題の形式を保持
const endRangeInput = document.getElementById('end-range');
const numQuestionsInput = document.getElementById('num-questions');
const numReviewQuestionsInput = document.getElementById('num-review-questions');
const progressInfo = document.getElementById('progress-info');
const wordDisplay = document.getElementById('word-display');
const speakBtn = document.getElementById('speak-btn');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const scoreDisplay = document.getElementById('score-display');
const accuracyDisplay = document.getElementById('accuracy-display');
const resultDetails = document.getElementById('result-details'); // ★追加
const spellingContainer = document.getElementById('spelling-container');
const spellingHint = document.getElementById('spelling-hint');
const spellingLengthHint = document.getElementById('spelling-length-hint');
const spellingInput = document.getElementById('spelling-input');
const submitSpellingBtn = document.getElementById('submit-spelling-btn');

function updateSpellingHint(isFinal = false) {
    if (currentQuestionIndex >= quizWords.length) return;
    const w = quizWords[currentQuestionIndex].word;
    const typed = spellingInput.value;
    
    // コンテナの幅に合わせて動的にサイズを調整
    const containerWidth = spellingHint.offsetWidth || 300;
    const maxChars = Math.max(w.length, 10);
    const availableWidth = containerWidth * 0.9; // 余白を考慮
    
    let boxWidthRem = 2.2;
    let fontSizeRem = 1.8;
    
    // 1rem = 16px換算で計算
    const pixelsPerRem = 16;
    const targetBoxWidthPx = availableWidth / maxChars;
    const targetBoxWidthRem = targetBoxWidthPx / pixelsPerRem;
    
    if (targetBoxWidthRem < boxWidthRem) {
        boxWidthRem = Math.max(0.8, targetBoxWidthRem);
        fontSizeRem = Math.max(0.7, boxWidthRem * 0.8);
    }
    
    let html = '';
    const displayLength = Math.max(typed.length, w.length);
    for (let i = 0; i < displayLength; i++) {
        let char = '';
        let color = '#4a4e69';  // var(--text-color)
        let border = '#e9ecef'; // var(--border-color)
        let opacity = '1';
        
        const expectedChar = w.charAt(i) || '';
        const isSpace = (expectedChar === ' ' || expectedChar === '-');

        if (i < typed.length) {
            char = typed.charAt(i);
            border = '#e9c46a'; // var(--primary-color)
        } else if (i === 0 && typed.length === 0 && !isFinal) {
            char = w.charAt(0);
            color = '#e9c46a';
            opacity = '0.5';
            if (isSpace) border = 'transparent';
        } else {
            char = isSpace ? expectedChar : '';
            color = isSpace ? '#9a8c98' : 'transparent';
            border = isSpace ? 'transparent' : '#e9ecef';
        }
        
        if (isFinal) {
            const correctWord = w.toLowerCase();
            const typedWord = typed.toLowerCase();
            const isCorrect = (correctWord === typedWord);
            
            if (i < typed.length) {
                border = isCorrect ? '#84a59d' : '#e2979c'; // success/danger
                color = isCorrect ? '#4a4e69' : '#e2979c';
                if (isSpace && typed.charAt(i) === expectedChar) border = 'transparent';
            } else {
                border = isCorrect ? '#84a59d' : '#e2979c';
                if (isSpace) border = 'transparent';
            }
        }
        
        if (char === ' ') char = '&nbsp;';
        
        html += `<div style="display: inline-block; width: ${boxWidthRem}rem; height: 3rem; line-height: 3rem; font-size: ${fontSizeRem}rem; font-family: 'Segoe UI', monospace; font-weight: 700; text-align: center; border-bottom: 3px solid ${border}; margin: 0 0.05rem; color: ${color}; opacity: ${opacity}; text-transform: lowercase; vertical-align: bottom; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); flex-shrink: 0; white-space: nowrap;">${char}</div>`;
    }
    
    spellingHint.innerHTML = html;
    if (!isFinal) {
        spellingLengthHint.textContent = `${w.length} characters`;
    } else {
        spellingLengthHint.textContent = '';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTest(isReview = false) {
    initAudio();
    
    let availableWords;

    if (isReview) {
        const numReviewQuestions = parseInt(numReviewQuestionsInput.value);
        if (isNaN(numReviewQuestions) || numReviewQuestions < 1) {
            alert("復習する問題数を正しく入力してください．");
            return;
        }
        const weakWordIds = getWeakWords(numReviewQuestions);
        if (weakWordIds.length === 0) {
            alert("まだ学習記録がありません。まずは通常テストで学習を進めてください．");
            return;
        }
        if (weakWordIds.length < numReviewQuestions) {
            alert(`記録のある苦手な単語は${weakWordIds.length}語です。その数でテストを開始します．`);
        }
        availableWords = weakWordIds.map(id => allWords.find(w => w.id == id));
        quizWords = availableWords;
    } else {
        const startId = parseInt(startRangeInput.value);
        const endId = parseInt(endRangeInput.value);
        const numQuestions = parseInt(numQuestionsInput.value);

        if (isNaN(startId) || isNaN(endId) || isNaN(numQuestions)) {
            alert("有効な数値を入力してください．");
            return;
        }
        const maxId = allWords.length > 0 ? allWords[allWords.length - 1].id : 0;
        if (startId > endId || startId < 1 || endId > maxId) {
            alert(`出題範囲の指定が正しくありません (1～${maxId}の範囲で指定)．`);
            return;
        }
        availableWords = allWords.filter(w => w.id >= startId && w.id <= endId);
        if (numQuestions > availableWords.length) {
            alert(`指定範囲の単語数（${availableWords.length}語）を超える問題数は設定できません．`);
            return;
        }
        if (numQuestions < 1) {
            alert("問題数を1以上に設定してください．");
            return;
        }
        shuffleArray(availableWords);
        quizWords = availableWords.slice(0, numQuestions);
    }
    
    currentQuestionIndex = 0;
    score = 0;
    answeredWords = []; // ★追加：テスト開始時に配列を初期化
    setupScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    testScreen.style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    feedback.textContent = '';
    nextBtn.style.display = 'none';
    if (currentQuestionIndex >= quizWords.length) {
        showResult();
        return;
    }
    progressInfo.textContent = `残り: ${quizWords.length - currentQuestionIndex}問 / 全${quizWords.length}問`;
    const currentWord = quizWords[currentQuestionIndex];
    const selectedMode = document.querySelector('input[name="testMode"]:checked').value;

    if (selectedMode === 'random') {
        currentTestMode = Math.random() < 0.5 ? 'en2ja' : 'ja2en';
    } else {
        currentTestMode = selectedMode;
    }

    if (currentTestMode === 'en2ja') {
        wordDisplay.textContent = currentWord.word;
        speakBtn.style.display = 'inline';
        speakBtn.onclick = () => { initAudio(); speak(currentWord.word); };
        optionsContainer.style.display = 'grid';
        spellingContainer.style.display = 'none';
        optionsContainer.innerHTML = '';
        
        // ★追加: 出題時に自動で音声を再生する
        initAudio();
        speak(currentWord.word);
        
        let options = [currentWord];
        let dummyCandidates = allWords.filter(w => w.pos === currentWord.pos && w.id !== currentWord.id);
        shuffleArray(dummyCandidates);
        options = options.concat(dummyCandidates.slice(0, 7));
        if (options.length < 8) {
            let otherCandidates = allWords.filter(w => !options.some(opt => opt.id === w.id));
            shuffleArray(otherCandidates);
            options = options.concat(otherCandidates.slice(0, 8 - options.length));
        }
        shuffleArray(options);
        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.main_meaning;
            button.classList.add('option-btn');
            button.dataset.wordId = option.id;
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });
    } else {
        wordDisplay.textContent = currentWord.meaning;
        speakBtn.style.display = 'none';
        optionsContainer.style.display = 'none';
        spellingContainer.style.display = 'block';
        
        const w = currentWord.word;
        
        spellingInput.value = '';
        spellingInput.disabled = false;
        spellingInput.style.backgroundColor = '';
        spellingInput.style.borderColor = '#dcdfe6';
        updateSpellingHint();
        submitSpellingBtn.style.display = 'block';
        spellingInput.focus();
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const currentWord = quizWords[currentQuestionIndex];
    const correctId = currentWord.id;
    const selectedId = parseInt(selectedButton.dataset.wordId);
    let isCorrect = (selectedId === correctId);

    updateStats(currentWord.id, isCorrect);
    answeredWords.push({ // ★追加：回答結果を記録
        word: currentWord.word,
        meaning: currentWord.meaning,
        isCorrect: isCorrect
    });

    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        if (parseInt(btn.dataset.wordId) === correctId) {
            btn.classList.add('correct');
        }
    });

    if (isCorrect) {
        playSE('correct');
        score++;
        const correctText = Array.from(optionsContainer.children).find(btn => parseInt(btn.dataset.wordId) === correctId)?.textContent || '';
        feedback.innerHTML = `正解！ <br><span style="font-size: 1.1rem; color: var(--success-color);"><strong>${correctText}</strong></span>`;
        feedback.style.color = 'var(--success-color)';
    } else {
        playSE('wrong');
        selectedButton.classList.add('wrong');
        const correctText = Array.from(optionsContainer.children).find(btn => parseInt(btn.dataset.wordId) === correctId)?.textContent || '';
        feedback.innerHTML = `不正解<br><span style="font-size: 1.1rem; color: var(--text-color);">正解: <strong>${correctText}</strong></span>`;
        feedback.style.color = 'var(--danger-color)';
    }
    nextBtn.style.display = 'inline-block';
}

function submitSpellingAnswer() {
    const answer = spellingInput.value.trim().toLowerCase();
    if (answer === '') return;
    
    const currentWord = quizWords[currentQuestionIndex];
    const correctWord = currentWord.word.toLowerCase();
    const isCorrect = (answer === correctWord);

    updateStats(currentWord.id, isCorrect);
    answeredWords.push({
        word: currentWord.word,
        meaning: currentWord.meaning,
        isCorrect: isCorrect
    });
    
    spellingInput.disabled = true;
    submitSpellingBtn.style.display = 'none';
    
    speakBtn.style.display = 'inline';
    speakBtn.onclick = () => { initAudio(); speak(currentWord.word); };
    initAudio();
    speak(currentWord.word);
    
    updateSpellingHint(true);

    if (isCorrect) {
        playSE('correct');
        score++;
        feedback.innerHTML = `正解！<br><span style="font-size: 1.2rem; color: var(--success-color);"><strong>${currentWord.word}</strong></span>`;
        feedback.style.color = 'var(--success-color)';
    } else {
        playSE('wrong');
        feedback.innerHTML = `不正解<br><span style="font-size: 1.2rem; color: var(--text-color);">正解: <strong>${currentWord.word}</strong></span>`;
        feedback.style.color = 'var(--danger-color)';
    }
    nextBtn.style.display = 'inline-block';
    setTimeout(() => nextBtn.focus(), 100);
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function showResult() {
    saveStats();
    testScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    const accuracy = quizWords.length > 0 ? ((score / quizWords.length) * 100).toFixed(1) : 0;
    scoreDisplay.textContent = `スコア: ${score} / ${quizWords.length}`;
    accuracyDisplay.textContent = `正答率: ${accuracy}%`;

    // ★追加：リザルトリストの表示
    resultDetails.innerHTML = '';
    const list = document.createElement('ul');
    list.classList.add('result-list');
    answeredWords.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('result-item');
        listItem.innerHTML = `
            <div>
                <div class="result-word">${item.word}</div>
                <div class="result-meaning">${item.meaning}</div>
            </div>
            <div class="result-status status-${item.isCorrect ? 'correct' : 'wrong'}">${item.isCorrect ? '⭕️' : '❌'}</div>
        `;
        list.appendChild(listItem);
    });
    resultDetails.appendChild(list);
}

function updateRangeMax() {
    const maxId = allWords.length > 0 ? allWords[allWords.length - 1].id : 0;
    startRangeInput.max = maxId;
    endRangeInput.value = maxId;
    endRangeInput.max = maxId;
}

function init() {
    const rawWords1200 = parseTSV(words1200Data);
    allWords1200 = preprocessWords(rawWords1200);
    
    const rawWords1400 = parseTSV(words1400Data);
    allWords1400 = preprocessWords(rawWords1400);

    allWords = allWords1400;
    
    loadStats();
    updateRangeMax();
    
    document.querySelectorAll('input[name="wordSet"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === '1200') {
                allWords = allWords1200;
            } else {
                allWords = allWords1400;
            }
            loadStats();
            updateRangeMax();
        });
    });
    
    startBtn.addEventListener('click', () => startTest(false));
    startReviewBtn.addEventListener('click', () => startTest(true));
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', () => {
        resultScreen.style.display = 'none';
        setupScreen.style.display = 'block';
    });

    saveImageBtn.addEventListener('click', () => {
        const container = document.querySelector('.container');
        const resultList = document.querySelector('.result-list');
        
        // 保存ボタンとやり直しボタンを一時的に隠す
        saveImageBtn.style.display = 'none';
        restartBtn.style.display = 'none';
        
        // リストのスクロール制限を一時的に解除して全件表示させる
        const originalMaxHeight = resultList.style.maxHeight;
        const originalOverflow = resultList.style.overflowY;
        resultList.style.maxHeight = 'none';
        resultList.style.overflowY = 'visible';

        html2canvas(container, {
            backgroundColor: '#f8f9fa',
            scale: 2, // 高解像度
            logging: false,
            useCORS: true
        }).then(canvas => {
            const date = new Date().toISOString().slice(0, 10);
            const fileName = `word-test-result-${date}.png`;

            // Web Share API (スマホ用共有機能) が使えるかチェック
            canvas.toBlob(blob => {
                const file = new File([blob], fileName, { type: 'image/png' });
                
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    // スマホの共有メニューを開く
                    navigator.share({
                        files: [file],
                        title: '英単語テスト結果',
                        text: '本日のテスト結果です。'
                    }).then(() => {
                        console.log('Shared successfully');
                    }).catch(err => {
                        console.error('Share failed:', err);
                        // ユーザーキャンセル以外の場合はダウンロードにフォールバック
                        if (err.name !== 'AbortError') downloadImage(canvas, fileName);
                    }).finally(() => restoreUI(resultList, originalMaxHeight, originalOverflow));
                } else {
                    // PCや非対応ブラウザはダウンロード
                    downloadImage(canvas, fileName);
                    restoreUI(resultList, originalMaxHeight, originalOverflow);
                }
            }, 'image/png');
        });
    });

    function downloadImage(canvas, fileName) {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    function restoreUI(resultList, originalMaxHeight, originalOverflow) {
        saveImageBtn.style.display = 'block';
        if (copyImageBtn) copyImageBtn.style.display = 'block';
        restartBtn.style.display = 'block';
        resultList.style.maxHeight = originalMaxHeight;
        resultList.style.overflowY = originalOverflow;
    }

    copyImageBtn.addEventListener('click', () => {
        const container = document.querySelector('.container');
        const resultList = document.querySelector('.result-list');
        
        // ボタンを一時的に隠す
        saveImageBtn.style.display = 'none';
        copyImageBtn.style.display = 'none';
        restartBtn.style.display = 'none';
        
        const originalMaxHeight = resultList.style.maxHeight;
        const originalOverflow = resultList.style.overflowY;
        resultList.style.maxHeight = 'none';
        resultList.style.overflowY = 'visible';

        html2canvas(container, {
            backgroundColor: '#fefae0', // --bg-color
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            canvas.toBlob(blob => {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(() => {
                    alert("画像をクリップボードにコピーしました！");
                }).catch(err => {
                    console.error("Copy failed:", err);
                    alert("コピーに失敗しました。お使いのブラウザが対応していない可能性があります。");
                }).finally(() => {
                    // 状態を戻す
                    saveImageBtn.style.display = 'block';
                    copyImageBtn.style.display = 'block';
                    restartBtn.style.display = 'block';
                    resultList.style.maxHeight = originalMaxHeight;
                    resultList.style.overflowY = originalOverflow;
                });
            }, 'image/png');
        });
    });

    quitBtn.addEventListener('click', () => {
        if (confirm("テストを中断してメニューに戻りますか？\n（これまでの進捗は保存されません）")) {
            testScreen.style.display = 'none';
            setupScreen.style.display = 'block';
        }
    });

    submitSpellingBtn.addEventListener('click', submitSpellingAnswer);
    spellingInput.addEventListener('input', updateSpellingHint);
    spellingInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!spellingInput.disabled) {
                submitSpellingAnswer();
            }
        }
    });

    document.body.addEventListener('click', initAudio, { once: true });
}

init();
