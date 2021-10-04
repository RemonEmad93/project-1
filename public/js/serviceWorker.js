const staticCacheName = 'v11';

const assets = [
    '/manifest.json',
    '/css/styles.css',
    '/vendor/bootstrap/css/bootstrap.min.css',
    '/vendor/bootstrap/js/bootstrap.min.js',
    '/js/pwa.js',
    'offline.html'

]

const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

self.addEventListener('install', evt => {
    console.log('serviceWorker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    console.log('serviceWorker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName )
                .map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', evt => {
  console.log('serviceWorker fetched');
  evt.respondWith(
      caches.match(evt.request).then(cachRes=>{
        return cachRes || fetch(evt.request).then(fetchRes =>{
          
            
            return fetchRes;
          
        });
      }).catch(()=>{
        return caches.match("offline.html");
      })
    )
  });
