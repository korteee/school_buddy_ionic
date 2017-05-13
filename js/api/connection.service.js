(function() {
    'use strict';

    angular
        .module('app')
        .service('Connection', Connection);

    Connection.inject = ['http'];

    function Connection(http) {

        var service = {
            register: register,
            login: login
        }

        return service;

        function login(username, password) {
            let payload = {
                username,
                password
            }

            return http.post(payload, '/login');
        }

        function register(username, password, firstName, lastName, type) {
            let payload = {
                username,
                password,
                firstName,
                lastName,
                type
            };

            return http.post(payload, '/users');
        }

    }
})();