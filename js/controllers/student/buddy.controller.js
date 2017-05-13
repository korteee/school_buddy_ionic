(function() {
    'use strict';

    angular
        .module('app')
        .controller('buddyCtrl', buddyCtrl);

    buddyCtrl.$inject = ['$http', '$scope', 'User', 'Buddy', 'Notification', '$ionicPopup', '$q', 'API'];

    function buddyCtrl($http, $scope, User, Buddy, Notification, $ionicPopup, $q, API) {
        var vm = this;
        vm.openNotifications = openNotifications;
        vm.hasUnreadNotifications = hasUnreadNotifications;
        var _getMyBuddyGroup = getMyBuddyGroup;
        var _getUserNotifications = getUserNotifications;
        var _deleteNotification = deleteNotification;
        var _notifications = [];
        var _openSocket = openSocketConnection;
        vm.imgUrl = `http://res.cloudinary.com/hi3cmlta6/image/upload/v1494156754/`;

        $scope.$on('$ionicView.beforeEnter', () => {
            
            _getUserNotifications(angular.fromJson(localStorage.getItem('user')).id);
            _openSocket();
            _getUserFeeling(angular.fromJson(localStorage.getItem('user')).id).then(resp=> {
              _getMyBuddyGroup(angular.fromJson(localStorage.getItem('user')).default_buddy_group_id);
            });
        })


        function getMyBuddyGroup(buddyGroupId) {
            Buddy.info(buddyGroupId).then(resp => {
                vm.buddies = resp.data.buddies;
                _findEmoticon(vm.userFeeling);
                vm.buddy.buddy_group_id = angular.fromJson(localStorage.getItem('user')).default_buddy_group_id;
            }, resp => {
                console.log(resp);
            })
        }

        function openSocketConnection() {
            var socket = new WebSocket('ws://sbuddy-api.herokuapp.com/');

            socket.onopen = (event) => {
                console.log('I am connected', event);
            }

            socket.onerror = (event) => {
                console.log('error', event);
            }

            socket.onmessage = (event) => {
                _notifications.push(angular.fromJson(event.data));
                console.log(_notifications);
            }

            socket.onclose = (event) => {
                console.log('Im closed', event);
            }
        }

        function getUserNotifications(userId) {
            Notification.all(userId).then(resp => {
                _notifications = resp.data;
                console.log(resp.data);
            }, resp => {
                console.log(resp);
            })
        }

        function openNotifications(notificationType) {

            function readSpecificNotification(notificationMsg) {
                $ionicPopup.alert({
                    title: 'Νέο καθήκον',
                    template: notificationMsg
                }).then(res => {

                    deleteNotification(notifications[idx].id).then(resp => {
                        _notifications.splice(_notifications.findIndex(val => val.id == notifications[idx].id), 1);
                        notifications.splice(idx, 1);
                        if (notifications.length) {
                            readSpecificNotification(notifications[idx].message);
                        }

                    }, resp => {
                        console.log('Could not delete notification', resp);
                    })

                })
            }

            let idx = 0;
            let notifications = _notifications.filter(val => val.type == notificationType);
            let length = _notifications.length;
            readSpecificNotification(notifications[idx].message);

        }

        function deleteNotification(notificationId) {
            var deferred = $q.defer();

            Notification.delete(notificationId).then(resp => {
                console.log(resp);
                deferred.resolve(resp);
            }, resp => {
                console.log(resp);
                deferred.reject(resp);
            })

            return deferred.promise;
        }

        function hasUnreadNotifications(notificationType) {
            return _notifications.filter(val => val.type == notificationType).length;
        }

        function _getUserFeeling(userId) {
            var deferred = $q.defer();

            User.feeling(userId).then(resp => {
                vm.userFeeling = resp.data.feeling;

                deferred.resolve();
            }, resp => {
                deferred.reject();
            })

            return deferred.promise;
        }

        function _findEmoticon(feeling) {

            console.log("Feeling", feeling)
            console.log("buddies", vm.buddies)

            const feelings = {
                '-4': [-14, -10.5],
                '-3': [-10, -8.5],
                '-2': [-8, -5.5],
                '-1': [-5, -3.5],
                '0': [-3, 5.5],
                '1': [6, 17.5],
                '2': [18, 41.5],
                '3': [42, 89.5],
                '4': [90, 92]
            };

            let wantedKey = Object.keys(feelings).filter(key => {
                return (feeling >= feelings[key][0] && feeling <= feelings[key][1])
            })[0];

            console.log(wantedKey)


            vm.buddy = vm.buddies.filter(buddy => {
                return buddy.feeling == parseInt(wantedKey);
            })[0];



        }

    }
})();