(function () {
  'use strict';

  angular
    .module('app')
    .controller('settingsCtrl', settingsCtrl);

  settingsCtrl.$inject = ['$state'];

  function settingsCtrl($state) {
    var vm = this;
    vm.signOut = function() {
      localStorage.clear();
      $state.go('login');
    }

  }
})();
