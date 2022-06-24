const sw = self;

sw.addEventListener('install', (event) => {
  // sw.skipWaiting();
  console.log('install:',event);
  event.waitUntil(
    caches.open('cache').then((cache) => {
      return cache.add('./js/application.js')
    })
  )
});

sw.addEventListener('activate', event => {
  sw.clients.claim();
  console.log('activate');
});

sw.addEventListener('fetch', event => {
  // 这里可能存在db未初始化的情况。这种情况下不进行拦截
  console.log('fetch');
  event.respondWith(
    fetch(event.request).catch(async () => {
      const aa = await caches.match('./js/application.js')
      console.log(aa, '--')
      return caches.match('./js/application.js')
    })
  )
  return "fff"
});
