
angular
    .module('myApp.ctrl.detail', [])
    .controller('detailCtrl', [
        '$scope',
        '$routeParams',
        '$route',
        'base64',
        'loadSubscriperService',
        'loadProviderService',
        'loadCityService',
        function ($scope, $routeParams, $route, base64, loadSubscriperService, loadProviderService, loadCityService) {

            //$scope.person = {
            //    title: '',
            //    firstName: '',
            //    middleName: '',
            //    lastName: '',
            //    suffix: ''
            //};

            $scope.isDeleteRequested = !!$route.current.isDeleteRequested;

            $scope.deletePerson = function () {

                loadSubscriperService
                    .deletePerson(base64.decode($routeParams.phone))
                    .success(function (data, status, headers, config) {
                        $scope.navigationManager.goToListPage();
                    })
                    .error(function (data, status, headers, config) {
                        $scope.errorMessage = (data || { message: "Delete operation failed." }).message + (' [HTTP-' + status + ']');
                    });

            };

            $scope.returnToList = function () {
                $scope.navigationManager.goToListPage();
            };

            loadSubscriperService.
                  readPerson(base64.decode($routeParams.phone))
                    .success(function (data, status, headers, config) {
                        $scope.person = data;
                        console.log(data);
                    });

        }]);
