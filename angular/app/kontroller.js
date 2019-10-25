ugurgelisken.controller('anasayfaCtrl', function($scope) {
     $scope.baslik = 'Uğur GELİŞKEN.com';
    $scope.resim = 'assets/ugurgelisken.jpg';
    $scope.icerik = 'Merhaba sevgili okur. Aşağıdaki sosyal medya hesaplarıma ait ikonlara tıklayarak bana ulaşabilirsiniz.';   
    $scope.facebookURL = 'https://www.facebook.com/UgurGELISKEN';
    $scope.linkedinURL = 'https://tr.linkedin.com/in/uğur-gelişken-53007361';
});
 
ugurgelisken.controller('hakkimdaCtrl', function($scope) {
    $scope.baslik = 'HAKKIMDA';
    $scope.resim = 'assets/ugurgelisken.jpg';
    $scope.icerik = '1983 doğumlu Uğur GELİŞKEN, yayınlamış olduğu eserler, makaleler ve yaptığı projelerle 2013/2014/2015 yıllarında Adobe Community Professional programında, 9 farklı alanda uzmanlık seviyesi ile (Web Design, Graphic Design, Print Design, Digital Publishing, eLearning, Web Application Development, Mobile Application Development, Mobile Flash Gaming, Gamification) Adobe Topluluk Uzmanı (ACP) olarak seçildi. Şu anda IT Sorumlusu olarak iş hayatına devam etmekte, okurlarına özel eğitimler vermekte, yazarlar için danışmanlık yapmakta ve Mobil Programlama / Oyun Geliştirme alanlarında kendini geliştirmeye devam etmektedir. Yazar ve yeni projeleri hakkında daha detaylı bilgi almak için www.ugurgelisken.com adresini ziyaret edebilirsiniz.';   
});
 
ugurgelisken.controller('portfolyoCtrl', function($scope,$http) {
    $scope.baslik = 'PORTFOLYO';
    $scope.icerik = 'Bu kitaptan önce, en son hazırlamış olduğum iki kitabı aşağıda görebilirsiniz.';
    $http.get("json/portfolyo.json")
                .success(function(response) {
                $scope.sonuc = response;
           });
});
 
ugurgelisken.controller('iletisimCtrl', function($scope) {
    $scope.baslik = 'İLETİŞİM';
    $scope.icerik = 'Sorularınız varsa, e-mail adresimden bana yazabilirsiniz.';    
    $scope.email = 'ugurgelisken@gmail.com';
});
 
ugurgelisken.directive('activeLink', function () {
    return {
        link: function (scope, element, attrs) {
            element.find('.nav a').on('click', function () {
                angular.element(this)
                    .parent().siblings('.active')
                    .removeClass('active');
                angular.element(this)
                    .parent()
                    .addClass('active');
            });
        }
    };
});