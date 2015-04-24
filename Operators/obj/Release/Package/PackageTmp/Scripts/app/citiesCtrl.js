angular
    .module('myApp.ctrl.cities', [])
    .controller('citiesCtrl', [
        '$scope',
        '$http',
        '$routeParams',
        '$templateCache',
        'base64',
        'loadCityService',
        function ($scope, $http, $routeParams, $templateCache, base64, loadCityService) {
            $scope.navigationManager.setListPage();
            loadCityService.
                getCity()
                .success(function (data, status, headers, config) {                   
                    $scope.cities = data;
                });
            $scope.cityBool = false;
            $scope.addCity = function (city) {
                if (city) {
                    console.log(city);
                    $scope.city = city;
                    loadCityService
                        .createCity($scope.city)
                        .success(function (data, status, headers, config) {
                            $scope.cityBool = false;
                            loadCityService
                                .getCity()
                                .success(function (data, status, headers, config) {
                                    $scope.cities = data;
                                });
                        })
                        .error(function () {
                            $scope.cityBool = true;
                        });
                }                
                

            };

            $scope.deleteCity = function (cityName) {
                $scope.cityName = cityName;
                loadCityService
                    .deleteCity($scope.cityName)
                    .success(function (data, status, headers, config) {
                        loadCityService
                            .getCity()
                            .success(function (data, status, headers, config) {
                                $scope.cities = data;
                            });
                    })
            };

        }]);
