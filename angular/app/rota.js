ugurgelisken.config(function($routeProvider) {
$routeProvider
    // İNDEX
    .when('/', {
        templateUrl : 'template/anasayfa.html',
        controller  : 'anasayfaCtrl'
    })
     
    // ANA SAYFA
    .when('/anasayfa', {
        templateUrl : 'template/anasayfa.html',
        controller: 'anasayfaCtrl'
    })
         
    // HAKKIMDA
    .when('/hakkimda', {
        templateUrl : 'template/hakkimda.html',
        controller  : 'hakkimdaCtrl'
    })
 
    // PORTFOLYO
    .when('/portfolyo', {
        templateUrl : 'template/portfolyo.html',
        controller  : 'portfolyoCtrl'
    })
 
    // İLETİŞİM
    .when('/iletisim', {
        templateUrl : 'template/iletisim.html',
         controller  : 'iletisimCtrl'
    });
});