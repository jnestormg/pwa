if('serviceWorker' in navigator){
    console.log('puedes usar service worker');
    navigator.serviceWorker.register('./sw.js')
                                .then(res => console.log('serviceworker cargado correctamente',res))
                                .catch(err => console.log('serviceworker no se ha podido registrar',err));
}
else{
    console.log('no puedes usar service worker');

}