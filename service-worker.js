var cacheName = 'petstore-v1'; 
var cacheFiles = [ 
'Petstore.html', 
'products.js', 
'petstore.webmanifest', 
'images/cat.jpg', 
'images/catbowl.jpeg', 
'images/icon-store-512.png', 
'images/icon-store-32.png'
]; 

self.addEventListener('install', (e) => { 
    console.log('[Service Worker] Install'); 
    e.waitUntil( 
    caches.open(cacheName).then((cache) => { 
    console.log('[Service Worker] Caching all the files'); 
    return cache.addAll(cacheFiles); 
    }) 
    ); 
    }); 

    self.addEventListener('fetch', function (e) { 
        e.respondWith( 
        caches.match(e.request).then(function (r) { 
        // Download the file if it is not in the cache,  
        return r || fetch(e.request).then(function (response) { 
        // add the new file to cache 
        return caches.open(cacheName).then(function (cache) { 
        cache.put(e.request, response.clone()); 
        return response; 
        }); 
        }); 
        }) 
        ); 
        }); 