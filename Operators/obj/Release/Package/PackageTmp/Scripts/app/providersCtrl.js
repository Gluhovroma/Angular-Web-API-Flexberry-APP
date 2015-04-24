angular
    .module('myApp.ctrl.providers', [])
    .controller('providersCtrl', [
        '$scope',
        '$http',
        '$routeParams',
        '$templateCache',
        'base64',        
        'loadProviderService',        
        function ($scope, $http, $routeParams, $templateCache, base64, loadProviderService) {          
            $scope.navigationManager.setListPage();

            loadProviderService
                .getProvider()
                .success(function (data, status, headers, config) {                    
                    $scope.providers = data;
                });
            $scope.providerBool = false;
            $scope.addProvider = function (provider) {
                $scope.provider = provider;
                loadProviderService
                    .createProvider($scope.provider)
                    .success(function (data, status, headers, config) {
                        $scope.providerBool = false;
                        loadProviderService
                            .getProvider()
                            .success(function (data, status, headers, config) {
                                $scope.providers = data;
                            });
                    })
                    .error(function (data, status, headers, config) {
                        $scope.providerBool = true ;
                    });

            };
            $scope.deleteProvider = function (providerName) {
                $scope.providerName = providerName;
                loadProviderService
                    .deleteProvider($scope.providerName)
                    .success(function (data, status, headers, config) {
                        loadProviderService
                            .getProvider()
                            .success(function (data, status, headers, config) {
                                $scope.providers = data;
                            });
                    })
                    .error(function (data, status, headers, config) {

                    });
            };

        }]);
