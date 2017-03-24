(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.inject = ['$ionicPopup', '$state'];

  function LoginCtrl($ionicPopup, $state) {
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
      }

      if (vm.username == "teacher") {
        let user = {
          name: "Κίμωνας Ιντζόγλου",
          type: 0
        }
        localStorage.setItem("user", angular.toJson(user));
        $state.go('teacher.new-task');
      } else {
        let user = {
          name: "Σταύρος Κορτέσας",
          type: 1
        }
        localStorage.setItem("user", angular.toJson(user));
        $state.go('student.buddy');
      }

      
    }
  }
})();
