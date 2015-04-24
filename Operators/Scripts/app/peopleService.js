
angular
    .module('myApp.service.load', [])
    .factory('loadSubscriperService', [
        '$http',
        function($http) {

            return {
                getPeople: function() {
                    return $http({
                        method: 'GET',
                        url: '/api/Subscriber/GetAll'
                    });
                },
                getPeopleFilter: function (city, provider) {
                    return $http({
                        method: 'GET',
                        url: '/api/Subscriber/GetFiltered?city=' + city + '&provider=' + provider
                    });
                },

                createPerson: function(person) {
                    return $http({
                        method: 'POST',
                        url: '/api/Subscriber/InsertSubscriber',
                        data: person
                    });
                },

                readPerson: function(phone) {
                    return $http({
                        method: 'GET',
                        url: '/api/Subscriber/GetOne?person=' + phone
                    });
                },
                updatePerson: function(person) {
                    return $http({
                        method: 'POST',
                        url: '/api/Subscriber/UpdateSubscriber',
                        data: person
                    });
                },                
                deletePerson: function (phone) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/Subscriber/DeleteSubscriber?person=' + phone
                    });
                }
            };
        }])

.factory('loadProviderService', [
        '$http',
        function ($http) {
            return {
                getProvider: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/Operator/GetAll'
                    });
                },               

                createProvider: function (provider) {
                    return $http({
                        method: 'POST',
                        url: '/api/Operator/InsertOperator',
                        data: provider
                    });
                },
                deleteProvider: function (provider) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/Operator/DeleteOperator?provider=' + provider
                    });
                }
            };
        }])

    .factory('loadCityService', [
        '$http',
        function ($http) {

            return {
                getCity: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/City/GetAll'
                    });
                },                
                createCity: function (city) {
                    return $http({
                        method: 'POST',
                        url: '/api/City/InsertCity',
                        data: city
                    });
                },          

                deleteCity: function (city) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/City/DeleteCity?city=' + city
                    });
                }
            };
        }]);

