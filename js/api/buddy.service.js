(function() {
    'use strict';

    angular
        .module('app')
        .service('Buddy', Buddy);

    Buddy.inject = ['http'];

    function Buddy(http) {

        var service = {
            info: getBuddyGroupInfo,
            groups: getBuddyGroups,
            purchasedGroups: getPurchasedGroups,
            purchase: purchaseBuddy,
            setDefault: setDefaultBg
        };

        return service;

        function getBuddyGroupInfo(buddyGroupId) {
            let params = {};

            return http.get(params, `/buddy_groups/${buddyGroupId}`);
        }

        function getBuddyGroups() {
            let params = {};

            return http.get(params, `/buddy_groups`);
        }

        function getPurchasedGroups(userId) {
            let params = {};

            return http.get(params, `/buddy_groups/purchased/${userId}`)
        }

        function purchaseBuddy(buddyGroupId, userId) {
            let payload = {
                userId
            };

            return http.post(payload, `/buddy_groups/purchase/${buddyGroupId}`);
        }

        function setDefaultBg(bgId, userId) {
            let payload = {
                userId
            };

            return http.put(payload, `/buddy_groups/default/${bgId}`);
        }

    }
})();