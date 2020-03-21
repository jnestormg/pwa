//asignar nombre y version de cache
const CACHE_NAME= 'v1_nestor_pwa'
//ficheros que se cachearan
var urlsToCache =[
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/facebook.png',
    './img/twitter.png',
    './img/instagram.png',
    
    
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
];
//eventos

//install del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() =>{
                        self.skipWaiting();
                    });
                    
            })
            .catch(err => console.log('No se ha registrado el cache', err))
            
    );
});

// activar
//funcion de la app sin conexion
self.addEventListener('activate', e =>{
    const cacheWhitelist =[CACHE_NAME];
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhitelist.indexOf(cacheName) ===-1){
                            //borrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(()=>{
                self.clients.claim();
            })

    );
});

//fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
                .then(res =>{
                    if(res){
                        //devuelvo datos desde cache
                        return res;
                    }
                    return fetch(e.request);
                })
    );

});