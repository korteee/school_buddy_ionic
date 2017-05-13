(function() {
    'use strict';

    angular
        .module('app')
        .service('Notification', Notification);

    Notification.inject = ['http'];

    function Notification(http) {
        var service = {
            all: getAllNotifications,
            delete: deleteNotification
        };

        return service;

        function getAllNotifications(userId) {
            let params = {};

            return http.get(params, `/notifications/${userId}`);
        }

        function deleteNotification(notificationId) {
            let params = {};

            return http.delete(params, `/notifications/${notificationId}`)
        }
    }
})();