(function () {
  'use strict';

  angular
    .module('app')
    .controller('singleTaskCtrl', singleTaskCtrl);

  singleTaskCtrl.$inject = ['$stateParams'];

  function singleTaskCtrl($stateParams) {
    var vm = this;

    vm.tasks = [{
      name: "Πολλαπλασιασμός",
      due_date: new Date(2017, 8, 12),
      subtasks: [{
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio cum, a animi ipsa aperiam laudantium magni, commodi alias rem quibusdam pariatur consectetur amet saepe repellat nostrum veritatis, ea facere."
      }, {
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis distinctio cum, a animi ipsa aperiam laudantium magni, commodi alias rem quibusdam pariatur consectetur amet saepe repellat nostrum veritatis, ea facere."
      }]
    }]

  }
})();
