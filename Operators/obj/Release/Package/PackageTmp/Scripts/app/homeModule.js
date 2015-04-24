
angular
    .module('myApp', [
        'ngSanitize',
        'myApp.ctrl.home',
        'myApp.ctrl.list',
        'myApp.ctrl.detail',
        'myApp.ctrl.edit',
        'myApp.ctrl.providers',
        'myApp.ctrl.cities',
        'utf8-base64',
        'myApp.service.load',
        ////'myApp.service.providers',
        //'myApp.service.city',
               
    ])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider.when('/', {
            templateUrl: '/Home/List',
            controller: 'listCtrl'
        });        
        //$routeProvider.when('/detail/:id', {
        //    templateUrl: '/Home/Detail',
        //    controller: 'detailCtrl'
        //});
        $routeProvider.when('/edit/:phone', {
            templateUrl: '/Home/Edit',
            controller: 'editCtrl'
        });
        $routeProvider.when('/create', {
            templateUrl: '/Home/Edit',
            controller: 'editCtrl'
        });
        $routeProvider.when('/delete/:phone', {
            templateUrl: '/Home/Detail',
            controller: 'detailCtrl',
            isDeleteRequested: true
        });
        $routeProvider.when('/cities', {
            templateUrl: '/Home/Cities',
            controller: 'citiesCtrl'
        });
        $routeProvider.when('/operators', {
            templateUrl: '/Home/Providers',
            controller: 'providersCtrl'
        });        
        $routeProvider.otherwise({
            redirectTo: '/'
        });

        // Specify HTML5 mode (using the History APIs) or HashBang syntax.
        $locationProvider.html5Mode(true);
        //$locationProvider.html5Mode(false).hashPrefix('!');

    }]);
