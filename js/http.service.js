(function() {
    'use strict';

    angular
        .module('app')
        .service('http', http);

    http.inject = ['$http', 'API'];

    function http($http, API) {

        var service = {
            get: getRequest,
            post: postRequest,
            delete: deleteRequest,
            put: putRequest
        };

        return service;


        function getRequest(params, endpoint) {

            console.log(`${API.url}${endpoint}`);
            console.log(params);

            return $http({
                method: 'GET',
                params,
                url: `${API.url}${endpoint}`,
                headers: 'application/json'
            })

        }

        function postRequest(payload, endpoint) {

            console.log(`${API.url}${endpoint}`)
            console.log(payload);


            return $http({
                method: 'POST',
                data: angular.toJson(payload),
                url: `${API.url}${endpoint}`,
                headers: 'application/json'
            })

        }

        function deleteRequest(params, endpoint) {

            return $http({
                method: 'DELETE',
                url: `${API.url}${endpoint}`
            })

        }

        function putRequest(payload, endpoint) {

            return $http({
                method: 'PUT',
                url: `${API.url}${endpoint}`,
                data: payload
            })

        }

    }
})();