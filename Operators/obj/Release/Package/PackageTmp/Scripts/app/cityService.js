angular
    .module('myApp.service.city', [])
    .factory('cityService', [
        '$http',
        function ($http) {

            return {
                getPeople: function () {
                    return $http({
                        method: 'GET',
                        url: 'api/Subscriber'
                    });
                },

                createPerson: function (person) {
                    return $http({
                        method: 'POST',
                        url: '/api/people',
                        data: person
                    });
                },

                readPerson: function (personId) {
                    return $http({
                        method: 'GET',
                        url: '/api/people/' + personId
                    });
                },

                updatePerson: function (person) {
                    return $http({
                        method: 'PUT',
                        url: '/api/people',
                        data: person
                    });
                },

                deletePerson: function (personId) {
                    return $http({
                        method: 'DELETE',
                        url: '/api/people/' + personId
                    });
                }
            };
        }]);
