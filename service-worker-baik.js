let CACHE_NAME = "baikapp-cache-v4";
var urlsToCache = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/favicon.ico",
  "/assets/css/dashboard.css",
  "/assets/css/login.css",
  // "/assets/img/001-digital-marketing.png",
  // "/assets/img/002-wallet.png",
  // "/assets/img/003-money.png",
  // "/assets/img/004-money-transfer.png",
  // "/assets/img/005-light-bulb.png",
  // "/assets/img/006-home.png",
  // "/assets/img/001-safe-box.png",
  // "/assets/img/002-shopping-cart.png",
  "/assets/img/baik_logo1.png",
  "/assets/img/baik_logo3.png",
  "/assets/img/login_bg.jpg",
  "/assets/img/team1.jpg",
  "/assets/img/team2.jpg",
  "/vendor/bootstrap4/bootstrap.min.css",
  "/vendor/bootstrap4/bootstrap.min.js",
  "/vendor/fontawesome/css/font-awesome.min.css",
  "/vendor/fontawesome/fonts/FontAwesome.otf",
  "/vendor/fontawesome/fonts/fontawesome-webfont.eot",
  "/vendor/fontawesome/fonts/fontawesome-webfont.svg",
  "/vendor/fontawesome/fonts/fontawesome-webfont.ttf",
  "/vendor/fontawesome/fonts/fontawesome-webfont.woff",
  "/vendor/fontawesome/fonts/fontawesome-webfont.woff2",
  "/vendor/html5-qrcode/html5-qrcode.min.js",
  "/vendor/jquery/jquery-3.5.1.min.js",
  "/vendor/popper/popper.min.js",
  "/vendor/sweetalert/sweetalert.min.js",
  "/fallback.json",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Install service worker and opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  var url = new URL(request.url);

  // pisahkan API dan internal
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then(function (response) {
        return response || fetch(request);
      })
    );
  } else {
    event.respondWith(
      caches.open("products-cache").then(function (cache) {
        return fetch(request)
          .then(function (liveResponse) {
            cache.put(request, liveResponse.clone());
            return liveResponse;
          })
          .catch(function () {
            return caches.match(request).then(function (response) {
              if (response) {
                return response;
              } else {
                return caches.match("/fallback.json");
              }
            });
          });
      })
    );
  }
});

self.addEventListener("activate", function (event) {
  var cacheAllowlist = ["pages-cache-v1", "blog-posts-cache-v1"];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName != CACHE_NAME;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
