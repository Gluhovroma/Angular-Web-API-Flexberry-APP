
angular
    .module('myApp.ctrl.list', [])
    .controller('listCtrl', [
        '$scope',
        '$location',
        'base64',
        'loadSubscriperService',
        'loadProviderService',
        'loadCityService',        
        function ($scope, $location,base64, loadSubscriperService, loadProviderService, loadCityService) {

            $scope.people = [];
            $scope.providers = [];
            $scope.cities = [];
            $scope.myProvider = null;
            $scope.myCity = null;
            //$scope.viewPerson = function(id) {
            //    $location.path("/detail/" + id);
            //};
            loadSubscriperService
                .getPeople()
                .success(function(data, status, headers, config) {
                    $scope.people = data;
                    console.log($scope.people);
                });
            loadProviderService
                .getProvider()
                .success(function (data, status, headers, config) {
                    $scope.providers = data;
                    console.log($scope.providers);
                });
            loadCityService
                .getCity()
                .success(function (data, status, headers, config) {
                    $scope.cities = data;
                    console.log($scope.cities);
                });           
            $scope.navigationManager.setListPage();            

            $scope.editPerson = function (phone) {                
                $location.path("/edit/" + base64.encode(phone));
            };

            $scope.deletePerson = function(phone) {
                $location.path("/delete/" + base64.encode(phone));
            };

            $scope.createPerson = function() {
                $location.path("/create");
            };            

            $scope.subscriberFilter = function () {
                $scope.people = null;
                var filteredCity = null;
                var filteredProvider = null;
                if ($scope.myCity == null && $scope.myProvider == null) {
                    loadSubscriperService
                        .getPeople()
                        .success(function (data, status, headers, config) {
                            $scope.people = data;
                            console.log($scope.people);
                        });
                }
                else {
                    if ($scope.myCity != null)
                    {
                        filteredCity = $scope.myCity.Name;
                    }
                    if ($scope.myProvider != null) {
                        filteredProvider = $scope.myProvider.Name;
                    }
                    loadSubscriperService
                        .getPeopleFilter(filteredCity, filteredProvider)
                        .success(function (data, status, headers, config) {
                            $scope.people = data;
                            console.log($scope.people);
                    }); 
                }                              
            }          
        }]);
