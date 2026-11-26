// ملف الخدمة لمستودع gsoury7 - يضمن التحديث الفوري دون احتجاز نسخ قديمة في الكاش
const CACHE_NAME = 'josour-gsoury7-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // جلب أحدث نسخة من الشبكة دائماً لضمان تحديث البيانات والكود فوراً على GitHub Pages
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});