(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.inject = ['$ionicPopup', '$state', 'Connection'];

    function LoginCtrl($ionicPopup, $state, Connection) {
        var vm = this;
        vm.login = login;


        activate();


        function activate() {}

        function login() {
            if (!(vm.username && vm.password)) {
                $ionicPopup.alert({
                    title: 'Σφάλμα',
                    template: 'Το όνομα χρήστη ή ο κωδικός πρόσβασης είναι λανθασμένος'
                });
                return;
            } else {
                Connection.login(vm.username, vm.password).then(resp => {
                    localStorage.setItem('user', angular.toJson(resp.data));
                    //Teacher
                    if (resp.data.type === 0) {
                        $state.go('teacher.new-task');
                    } else {
                        $state.go('student.buddy');
                    }
                }, resp => {
                    $ionicPopup.alert({
                        title: 'Σφάλμα',
                        template: 'Το όνομα χρήστη ή ο κωδικός πρόσβασης είναι λανθασμένος'
                    });
                })
            }


        }
    }
})();