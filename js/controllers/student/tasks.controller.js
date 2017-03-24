(function () {
  'use strict';

  angular
    .module('app')
    .controller('tasksCtrl', tasksCtrl);

  tasksCtrl.$inject = [];
  var counter = 0.05;

  function tasksCtrl() {
    var vm = this;

    vm.tasks = [{
      name: "Μαθηματικά",
      id: 1
    }, {
      name: "Θρησκευτικά",
      id: 2
    }, {
      name: "Γλώσσα",
      id: 3
    }, {
      name: "Ιστορία",
      id: 4
    }, {
      name: "Φυσική",
      id: 5
    }]


  }
})();
