(function () {
  'use strict';

  angular
    .module('app')
    .controller('StudentCoursesCtrl', StudentCoursesCtrl);

  StudentCoursesCtrl.$inject = [];

  function StudentCoursesCtrl() {
    var vm = this;

    vm.courses = [{
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
