(function() {
    'use strict';

    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.inject = ['Connection', '$ionicPopup', '$state'];

    function RegisterCtrl(Connection, $ionicPopup, $state) {
        var vm = this;
        vm.user = {
            type: 1
        };

        vm.availableUserTypes = [{
            code: 0,
            value: "Δάσκαλος"
        }, {
            code: 1,
            value: "Μαθητής"
        }];

        vm.register = function() {
            Connection.register(vm.user.username, vm.user.password, vm.user.firstName, vm.user.lastName, vm.user.type).then(resp => {

                let alert = $ionicPopup.alert({
                    title: 'Συγχαρητήρια',
                    template: 'Ο λογαριασμός σας δημιουργήθηκε.'
                })

                alert.then(() => {
                    $state.go('login');
                })



            }, resp => {
                $ionicPopup.alert({
                    title: 'Λυπούμαστε',
                    template: 'Υπήρξε κάποιο πρόβλημα και ο λογαριασμός σας δε δημιουργήθηκε.'
                })
            })
        }

        activate();

        function activate() {}
    }
})();