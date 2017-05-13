(function() {
    'use strict';

    angular
        .module('app')
        .controller('PurchaseCtrl', PurchaseCtrl);

    PurchaseCtrl.inject = ['$ionicPopup', 'API', '$scope', 'Buddy', '$rootScope'];

    function PurchaseCtrl($ionicPopup, API, $scope, Buddy, $rootScope) {
        var vm = this;
        vm.onBuddyClick = onBuddyClick;

        vm.userDefaultBuddyGroupId = angular.fromJson(localStorage.getItem('user')).default_buddy_group_id;
        $scope.imgUrl = API.img_url;
        var _getBuddyGroups = getBuddyGroups;
        vm.purchasedGroups = [];


        $scope.$on('$ionicView.loaded', () => {
            _getBuddyGroups();
            _getPurchasedGroups(angular.fromJson(localStorage.getItem('user')).id);
        })



        function onBuddyClick(idx) {

            Buddy.info(vm.availableBuddyGroups[idx].id).then(resp => {

                resp.data.buddy_group_id = vm.availableBuddyGroups[idx].id
                $scope.buddyOptions = resp.data;


                console.log($scope.buddyOptions.buddies);
                showPopup();
            }, resp => {
                console.log("Failed to get buddy info");
            })


            function showPopup() {
                var options = {
                    title: $scope.buddyOptions.name,
                    scope: $scope,
                    templateUrl: 'templates/buddyOptions.html',
                    buttons: [{
                        text: 'Close',
                        type: 'button-default'
                    }],
                    cssClass: 'buddyOptionsPopup'
                }
                $ionicPopup.show(options)
            }

        }

        function getBuddyGroups() {
            Buddy.groups().then(resp => {
                vm.availableBuddyGroups = resp.data;
                console.log(vm.availableBuddyGroups);
            }, resp => {
                console.log('failed to get buddygroups');
            })
        }

        vm.setDefault = function(buddyGroupId) {
            if (buddyGroupId === vm.userDefaultBuddyGroupId) {
                $ionicPopup.alert({
                    title: 'Ειδοποίηση',
                    template: 'Το πακέτο που επιλέξατε είναι ήδη το προεπιλεγμένο σας πακέτο.'
                })
            } else {


                Buddy.setDefault(buddyGroupId, angular.fromJson(localStorage.getItem('user')).id).then(resp => {
                    $ionicPopup.alert({
                        title: 'Συγχαρητήρια',
                        template: 'Ορίσατε νέο προεπιλεγμένο πακέτο Buddy'
                    }).then(() => {
                        vm.userDefaultBuddyGroupId = buddyGroupId;
                        let user = angular.fromJson(localStorage.getItem('user'));
                        user.default_buddy_group_id = buddyGroupId;
                        localStorage.setItem('user', angular.toJson(user));
                    })
                }, resp => {
                    $ionicPopup.alert({
                        title: 'Λυπούμαστε',
                        template: 'Κάτι συνέβει και η ενέργεια δεν ολοκληρώθηκε.'
                    })
                })


            }
        }


        function _getPurchasedGroups(userId) {
            console.log(userId);
            Buddy.purchasedGroups(userId).then(resp => {
                vm.purchasedGroups = resp.data;
            }, resp => {
                console.log("Failed to get purchased groups", resp);
            })
        }

        vm.isPurchased = function(bgId) {
            if (vm.purchasedGroups.length)
                return vm.purchasedGroups.filter(bg => bg.buddy_group_id == bgId).length;
        }

        vm.purchaseBuddyGroup = function(buddyGroup) {
            console.log(buddyGroup)
            console.log(vm.purchasedGroups);
            if (vm.purchasedGroups.filter(bg => {
                    return bg.buddy_group_id == buddyGroup.id
                }).length) {
                $ionicPopup.alert({
                    title: 'Ειδοποίηση',
                    template: 'Έχετε ήδη αγοράσει αυτό το πακέτο'
                })
            } else if (angular.fromJson(localStorage.getItem('user')).stars < buddyGroup.cost) {
                $ionicPopup.alert({
                    title:'Ειδοποίηση',
                    template:`Δεν έχετε αρκετά αστέρια για να αγοράσετε αυτό το πακέτο.`
                })
            } else {

                Buddy.purchase(buddyGroup.id, angular.fromJson(localStorage.getItem('user')).id).then(resp => {
                    $ionicPopup.alert({
                        title: 'Συγχαρητήρια',
                        template: 'Η αγορά σας πραγματοποιήθηκε επιτυχώς'
                    }).then(() => {
                        vm.purchasedGroups.push({
                            buddy_groupd_id:buddyGroup.id
                        });

                        let user = angular.fromJson(localStorage.getItem('user'));
                        user.stars -= vm.availableBuddyGroups.filter(bg => bg.id == buddyGroup.id)[0].cost;
                        localStorage.setItem('user', angular.toJson(user));

                        $rootScope.$broadcast('starsChanged', {
                            stars: user.stars
                        });

                    })
                }, resp => {
                    $ionicPopup.alert({
                        title: 'Λυπούμαστε',
                        template: 'Κάτι συνέβει και η ενέργεια δεν ολοκληρώθηκε.'
                    })
                })

            }
        }


    }
})();