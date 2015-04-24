
angular
    .module('myApp.ctrl.edit', [])
    .controller('editCtrl', [
        '$scope',
        '$http',
        '$routeParams',
        '$templateCache',
        'base64',
        'loadSubscriperService',
        'loadProviderService',
        'loadCityService',
        function ($scope, $http, $routeParams, $templateCache, base64, loadSubscriperService, loadProviderService, loadCityService) {

            $scope.person = {
                Surname: "",
                Name: "",
                Lastname: "",
                PhoneNumber: "",
                Passport: "",
                City: "",
                Provider: ""
            };

            $scope.myCity = null;
            $scope.myProvider = null;
            $scope.providers = {};
            $scope.cities = {};
            $scope.noSurname = false;
            $scope.noName = false;
            $scope.noLastName = false;
            $scope.noPhone = false;
            $scope.noPassport = false;
            $scope.noCity = false;
            $scope.noProvider = false;


            loadProviderService
              .getProvider()
              .success(function (data, status, headers, config) {
                  $scope.providers = data;                  
              });

            loadCityService.
             getCity()
                .success(function (data, status, headers, config) {
                    $scope.cities = data;                   
                });

            $scope.isNew = angular.isUndefined($routeParams.phone);

            if (!$scope.isNew) {
                loadSubscriperService.
                  readPerson(base64.decode($routeParams.phone))
                    .success(function (data, status, headers, config) {                        
                        $scope.person = data;                        
                        var provName = $scope.person.Provider.Name;
                        var citName = $scope.person.City.Name;                        
                        var i = 0;
                        while (provName != $scope.providers[i].Name) {
                            i++;                            
                        }                        
                        $scope.myProvider = $scope.providers[i];
                        var j = 0;
                        while (citName != $scope.cities[j].Name) {
                            j++;                            
                        }                        
                        $scope.myCity = $scope.cities[j];
                    });               
            }

            $scope.returnToList = function() {
                $scope.navigationManager.goToListPage();
            };            

            $scope.save = function () {          
                
                if (($scope.person.Surname !== "") &&
                    ($scope.person.Name !== "") &&
                    ($scope.person.Lastname !== "") &&
                    ($scope.person.PhoneNumber !== "") &&
                    ($scope.person.Passport != "") &&
                    ($scope.myCity !== null) &&
                    ($scope.myProvider !== null)) {

                    if ($scope.isNew) {
                        $scope.person.City = $scope.myCity;
                        $scope.person.Provider = $scope.myProvider;
                        console.log($scope.person);
                        loadSubscriperService
                            .createPerson($scope.person)
                            .success(function (data, status, headers, config) {
                                console.log(status);
                                console.log(data);
                                console.log(headers);
                                $scope.navigationManager.goToListPage();
                            })
                            .error(function (data, status, headers, config) {
                                console.log(status);
                                console.log(data);
                                console.log(headers);
                                if (status == 409) {
                                    $scope.errorMessage = "Человек с таким номером телефона уже есть";
                                }
                                
                            });

                    } else {
                        $scope.person.City = $scope.myCity;
                        $scope.person.Provider = $scope.myProvider;
                        console.log($scope.person);
                        loadSubscriperService
                            .updatePerson($scope.person)
                            .success(function (data, status, headers, config) {
                                $scope.navigationManager.goToListPage();
                            })
                            .error(function (data, status, headers, config) {
                                $scope.errorMessage = (data || { message: "Update operation failed." }).message + (' [HTTP-' + status + ']');
                            });
                    }
                }
                else {
                    if ($scope.person.Surname == "") {
                        $scope.noSurname = true;
                    }
                    else {
                        $scope.noSurname = false;
                    }
                    if ($scope.person.Name == "") {
                        $scope.noName = true;
                    }
                    else {
                        $scope.noName = false;
                    }
                    if ($scope.person.Lastname == "") {
                        $scope.noLastName = true;
                    }
                    else {
                        $scope.noLastName = false;
                    }
                    if ($scope.person.PhoneNumber == "") {
                        $scope.noPhone = true;
                    }
                    else {
                        $scope.noPhone = false;
                    }
                    if ($scope.person.Passport == "") {
                        $scope.noPassport = true;
                    }
                    else {
                        $scope.noPassport = false;
                    }
                    if ($scope.myCity == null) {
                        $scope.noCity = true;
                    }
                    else {
                        $scope.noCity = false;
                    }
                    if ($scope.myProvider == null) {
                        $scope.noProvider = true;
                    }
                    else {
                        $scope.noProvider = false;
                    }
                }
                
            };

            
            
           
           

        }]);
