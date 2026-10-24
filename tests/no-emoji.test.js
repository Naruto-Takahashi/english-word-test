import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { icons } from '../js/modules/icons.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Unicode絵文字を判定する関数
 * @param {number} code 
 * @returns {boolean}
 */
function isEmojiCodePoint(code) {
    // Emoticons, Symbols & Pictographs, Transport & Map, Supplemental Symbols, Extended-A
    if (code >= 0x1F300 && code <= 0x1FAFF) return True_Emoji(code);
    // Dingbats, Miscellaneous Symbols
    if (code >= 0x2600 && code <= 0x27BF) return true;
    // Regional Indicator Symbols (Flags)
    if (code >= 0x1F1E6 && code <= 0x1F1FF) return true;
    // Variation Selectors (Emoji presentation)
    if (code >= 0xFE00 && code <= 0xFE0F) return true;
    return false;
}

function True_Emoji(code) {
    // 幾何学図形や通常の記号のうち除外が必要なものがあればここで調整
    return true;
}

/**
 * ディレクトリ内の全ファイルを再帰取得
 */
function getFilesRecursively(dir, exts, skipDirs) {
    let results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        if (skipDirs.has(entry.name)) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getFilesRecursively(fullPath, exts, skipDirs));
        } else if (entry.isFile() && exts.some(ext => entry.name.endsWith(ext))) {
            results.push(fullPath);
        }
    }
    return results;
}

test('Ensure zero emoji characters exist in application source files', () => {
    const targetExts = ['.js', '.html', '.css', '.json'];
    const skipDirs = new Set(['node_modules', '.git', '.gemini', 'scratch', 'icons']);
    const files = getFilesRecursively(rootDir, targetExts, skipDirs);

    const violations = [];

    for (const filePath of files) {
        const relativePath = path.relative(rootDir, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');

        lines.forEach((line, lineIdx) => {
            for (let i = 0; i < line.length; i++) {
                const code = line.codePointAt(i);
                if (isEmojiCodePoint(code)) {
                    const char = String.fromCodePoint(code);
                    violations.push({
                        file: relativePath,
                        line: lineIdx + 1,
                        char,
                        snippet: line.trim()
                    });
                    // サロゲートペアをスキップ
                    if (code > 0xFFFF) i++;
                }
            }
        });
    }

    if (violations.length > 0) {
        const errorMsg = violations.map(v => 
            `  - ${v.file}:${v.line} -> [${v.char}] ${v.snippet}`
        ).join('\n');
        assert.fail(`Found ${violations.length} emoji occurrences in codebase. Strictly forbidden:\n${errorMsg}`);
    }

    assert.equal(violations.length, 0, 'No emojis found in codebase');
});

test('icons.crown renders clean line SVG', () => {
    assert(typeof icons.crown === 'function', 'icons.crown exists');
    const svgStr = icons.crown(18);
    assert(svgStr.includes('<svg'), 'returns svg tag');
    assert(svgStr.includes('stroke="currentColor"'), 'uses currentColor');
    assert(svgStr.includes('width="18"'), 'applies custom size');
});
