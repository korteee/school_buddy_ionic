(function() {
    'use strict';

    angular
        .module('app')
        .service('User', User);

    User.inject = ['http'];

    function User(http) {

        var service = {
            feeling: getUserFeeling
        };

        return service;

        function getUserFeeling(userId) {
            let params = {};
            return http.get(params, `/feeling/${userId}`);
        }

    }
})();