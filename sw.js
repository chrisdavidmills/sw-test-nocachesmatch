this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(
        '/sw-test/',
        '/sw-test/index.html',
        '/sw-test/style.css',
        '/sw-test/app.js',
        '/sw-test/image-list.js',
        '/sw-test/star-wars-logo.jpg',
        '/sw-test/gallery/',
        '/sw-test/gallery/bountyHunters.jpg',
        '/sw-test/gallery/myLittleVader.jpg',
        '/sw-test/gallery/snowTroopers.jpg'
      );
    })
  );
});

this.addEventListener('fetch', function(event) {
  var cachedResponse = caches.open('v1').then(function(cache) {
    cache.match(event.request).catch(function() {
      return fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    });
  }).catch(function() {
    caches.open('v1').then(function(cache) {
      return cache.match('/sw-test/gallery/myLittleVader.jpg');
    })
  });
    
  event.respondWith(cachedResponse);
});

