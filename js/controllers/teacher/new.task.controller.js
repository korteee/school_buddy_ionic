(function () {
  'use strict';

  angular
    .module('app')
    .controller('NewTaskCtrl', NewTaskCtrl);

  NewTaskCtrl.inject = [];

  function NewTaskCtrl() {
    var vm = this;


    activate();

    function activate() {
        console.log("New Task")
    }
  }
})();
