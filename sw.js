var cacheName = 'SFG-QA-902';

const fileNamesToSaveInCache = [
        './favicon.88713139.png',
        './icon-128.ff019093.png',
        './icon-192.e5430ece.png',
        './icon-256.98d1b0b8.png',
        './icon-64.6e8fbfd6.png', 
        './icon-96.53402665.png',  
        './icon-32.88713139.png',
        './icon-512.816770eb.png',
        './manifest.json',
        './overlay.4e8d8e75.png',
        './start.7df4af0c.js',
        './start.7df4af0c.js.map',
        './assets/images/levelchars2.png',
        './assets/images/levelchars2.json',
        './assets/fonts/BRLNSDB.css',
        './assets/fonts/BRLNSDB.eot',
        './assets/fonts/BRLNSDB.otf',
        './assets/fonts/BRLNSDB.svg',
        './assets/fonts/BRLNSDB.ttf',
        './assets/fonts/BRLNSDB.woff',
        './assets/ui/button-achievements.png',
        './assets/ui/button-back.png',
        './assets/ui/button-continue.png',
        './assets/ui/button-credits.png',
        './assets/ui/button-home.png',
        './assets/ui/button-mainmenu.png',
        './assets/ui/button-music-off.png',
        './assets/ui/button-music-on.png',
        './assets/ui/button-pause.png',
        './assets/ui/button-settings.png',
        './assets/ui/button-sound-off.png',
        './assets/ui/button-sound-on.png',
        './assets/ui/button-start.png',
        './assets/ui/button-tryagain.png',
        './assets/ui/loading-background.png',
        './assets/backgrounds/pattern.png',
	      './assets/backgrounds/title.png',
        './assets/images/heaven_castle.png',
        './assets/backgrounds/quiz.png',
        './assets/backgrounds/overlay.png',
	      './assets/images/girl.png',
        './assets/ui/textbox.png',
        './assets/ui/textbox_edit.png',
        './assets/images/helmet.png',
        './assets/images/boots.png',
        './assets/images/belt.png',
        './assets/images/sword.png',
        './assets/images/shield.png',
        './assets/images/wings.png',
        './assets/images/halo.png',
        './assets/images/breastplate.png',
        './assets/images/silhouette_girl.png',
        './assets/images/girl_helmet.png',
        './assets/images/girl_boots.png',
        './assets/images/girl_breastplate.png',
        './assets/images/girl_belt.png',
        './assets/images/girl_sword.png',
        './assets/images/girl_shield.png',
        './assets/images/girl_wings.png',
        './assets/images/girl_halo.png',	
        './assets/effects/blue.png',
        './assets/images/rainbow.png',
        './assets/effects/shine.png',
        './assets/images/Logos.png',
        './assets/images/angel_harp.png',
        './assets/images/armour_intro1.png',
        './assets/images/armour_wings.png',
        './assets/images/girl_intro.png',
        './assets/ui/loader.png',
        './assets/effects/columneffect.png',
        './assets/effects/heavensparkle.png',
        './assets/ui/fullscreen.png',
        './assets/effects/flares.png',
        './assets/effects/space.png',
        './assets/images/frames.png',
        './assets/images/scroll.png',
        './assets/sfx/correct.mp3',
        './assets/sfx/correct.ogg',
        './assets/sfx/correct.m4a',
        './assets/sfx/incorrect.mp3',
        './assets/sfx/incorrect.ogg',
        './assets/sfx/incorrect.m4a',
        './assets/sfx/audio-button.m4a',
        './assets/sfx/audio-button.mp3',
        './assets/sfx/audio-button.ogg',
        './assets/music/for-the-king.m4a',
        './assets/music/for-the-king.mp3',
        './assets/music/for-the-king.ogg',
        './assets/music/award.m4a',
        './assets/music/award.mp3',
        './assets/music/award.ogg',
        './assets/music/quiz.ogg',
        './assets/music/quiz.m4a',
        './assets/music/addaward.m4a',
        './assets/music/addaward.mp3',
        './assets/music/addaward.ogg',
        './assets/ui/purplebutton_shiney.png',
        './assets/ui/purplebutton.png',
        './assets/effects/space.json',
        './assets/effects/flares.json',
        './assets/images/frames.json',
        './assets/images/scroll.json',
        './assets/ui/logo-spirit-filled-games.png',
        './assets/images/quiz_angel_cover.png',
        './assets/images/title.png',
        './assets/backgrounds/heaven.png',
        './assets/backgrounds/intro.png',
        './assets/ui/clickme.png',
        './assets/levels/levels.json',
        './assets/levels/advanced_levels.json',
        './assets/levels/basic_levels.json',
        './assets/levels/master_levels.json',
        './assets/levels/medium_levels.json',
        './assets/effects/flare_0.png',
      ];


      const logInTheUIWhenActivated = function (what) {
        console.log(what);
      };
    

      const fillServiceWorkerCache2 = function () {
        /*It will not cache and also not reject for individual resources that failed to be added in the cache. unlike fillServiceWorkerCache which stops caching as soon as one problem occurs. see http://stackoverflow.com/questions/41388616/what-can-cause-a-promise-rejected-with-invalidstateerror-here*/
        return caches.open(cacheName).then(function (cache) {
            return Promise.all(
                fileNamesToSaveInCache.map(function (url) {
                    console.log(["installing: " + url])
                    return cache.add(url).catch(function (reason) {
                        return logInTheUIWhenActivated([url + " failed: " + String(reason)]);
                    });
                })
            );
        });
    };
   
      self.addEventListener("install", function (event) {
        /*the install event can occur while another service worker is still active
        waitUntil blocks the state (here installing) of the service worker until the
        promise is fulfilled (resolved or rejected). It is useful to make the service worker more readable and more deterministic
        save in cache some static fileNames
        this happens before activation */
        event.waitUntil(
            fillServiceWorkerCache2()
            .then(skipWaiting)
        );
    });


self.addEventListener('fetch', function(e) {
  console.log('request:');
  console.log(e.request.url);

  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('sw activate');
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});





