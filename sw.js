/**
 * VocabFlow Service Worker (Cache-first offline strategy with HTTP cache bypass)
 */

const CACHE_NAME = 'wordtest-v16';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './css/quiz-animations.css',
    './css/microinteractions.css',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon.svg',
    './icons/apple-touch-icon.png',
    './data/target1200.js',
    './data/target1400.js',
    './data/hints1400.js',
    './js/app.js',
    './js/modules/icons.js',
    './js/modules/parser.js',
    './js/modules/store.js',
    './js/modules/audio.js',
    './js/modules/quiz-engine.js',
    './js/modules/share.js',
    './js/modules/pwa.js',
    './js/views/learn-view.js',
    './js/views/quiz-view.js',
    './js/views/words-view.js',
    './js/views/stats-view.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            // cache: 'reload' でスマホのローカルHTTPキャッシュをバイパスし、確実に最新版を取得してキャッシュ
            for (const asset of ASSETS) {
                try {
                    const res = await fetch(asset, { cache: 'reload' });
                    if (res && res.ok) {
                        await cache.put(asset, res);
                    }
                } catch (err) {
                    try {
                        await cache.add(asset);
                    } catch (_) {}
                }
            }
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request, { ignoreSearch: true }).then((cached) => {
            if (cached) return cached;
            return fetch(e.request).then((networkRes) => {
                if (networkRes && networkRes.ok && e.request.method === 'GET' && e.request.url.startsWith('http')) {
                    const clone = networkRes.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                }
                return networkRes;
            }).catch(() => {});
        })
    );
});
