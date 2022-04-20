
console.log('service_worker.js LOADING');

// https://developers.google.com/web/fundamentals/primers/service-workers
// One subtlety with theÊregister()Êmethod is the location of the service worker file. You'll notice in this
// case that the service worker file is at the root of the domain. This means that the service worker's scope
// will be the entire origin. In other words, this service worker will receiveÊfetchÊevents for everything on
// this domain. If we register the service worker file atÊ/example/sw.js, then the service worker would only
// seeÊfetchÊevents for pages whose URL starts withÊ/example/Ê(i.e.Ê/example/page1/,Ê/example/page2/).
// for flask thats /application/static 


let verion_numner_passed_in = '00';

const CACHE_NAME = `dtk-assets-cache_${verion_numner_passed_in}`;  // TODO add version number for ServWrkr updates

// run
// build_cache_file_list.py from project root
// to create updated list

const FILES_TO_CACHE = [
  '/static/favicon.ico',
  '/static/index.html',
  '/static/manifest.json',
  '/static/offline.html',
  '/static/service_worker.js',
  '/static/css/bootstrap.min.css',
  '/static/css/styles.css',
  '/static/css/weigh_in.css',
  '/static/html/blank.html',
  '/static/html/home.html',
  '/static/html/recipe.html',
  '/static/html/snap.html',
  '/static/html/tracker.html',
  '/static/html/weigh_in.html',
  '/static/images/20200625_224208_kofte & couscous salad sandwich.jpg',
  '/static/images/s&p pork arancini.jpg',
  '/static/images/icons/icon-128x128.png',
  '/static/images/icons/icon-144x144.png',
  '/static/images/icons/icon-152x152.png',
  '/static/images/icons/icon-192x192.png',
  '/static/images/icons/icon-256x256.png',
  '/static/images/icons/icon-32x32.png',
  '/static/images/icons/icon-512x512.png',
  '/static/images/png/check1.png',
  '/static/images/png/cog.png',
  '/static/images/png/edit.png',
  '/static/images/png/heart.png',
  '/static/images/png/home.png',
  '/static/images/png/pencil.png',
  '/static/images/png/search.png',
  '/static/images/png/snap.png',
  '/static/images/png/weigh_in.png',
  '/static/images/svg/check1.svg',
  '/static/images/svg/cog.svg',
  '/static/images/svg/graph.svg',
  '/static/images/svg/heart.svg',
  '/static/images/svg/home.svg',
  '/static/images/svg/pencil.svg',
  '/static/images/svg/snap.svg',
  '/static/images/svg/weigh_in.svg',
  '/static/js_modules/app.js',
  '/static/js_modules/dtk_storage.js',
  '/static/js_modules/module_page_blank.js',
  '/static/js_modules/module_page_home.js',
  '/static/js_modules/module_page_snap.js',
  '/static/js_modules/module_page_tracker.js',
  '/static/js_modules/module_page_weigh_in.js',
  '/static/js_modules/navbarMod.js',
  '/static/js_modules/weigh_in.js',
  '/static/uploads/20170918_164301_banh_xeo.jpg',
  '/static/uploads/light_lunch.JPG',
];


self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});


self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {               // DELETE all caches EXCEPT the one just created!
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});


// fetch event - service network requests 
//self.addEventListener('fetch', function(event) {
//  event.respondWith(fetch(event.request));          // pass request to network
//});

// fetch event - network only w/ OFFLINE page
//self.addEventListener('fetch', (evt) => {
//  if (evt.request.mode !== 'navigate') {
//    return;
//  }
//  evt.respondWith(fetch(evt.request).catch(() => {
//      return caches.open(CACHE_NAME).then((cache) => {
//        return cache.match('static/offline.html');
//      });
//    })
//  );
//});

// fetch event - Cache falling back to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});