/**
 * VocabFlow Service Worker (Cache-first offline strategy)
 */

const CACHE_NAME = 'wordtest-v11';
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
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS).catch(() => {});
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
        caches.match(e.request).then((res) => {
            return res || fetch(e.request).catch(() => {});
        })
    );
});
