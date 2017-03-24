(function () {
  'use strict';

  angular
    .module('app')
    .controller('CourseTasksCtrl', CourseTasksCtrl);

  CourseTasksCtrl.inject = ['$stateParams'];

  function CourseTasksCtrl($stateParams) {
    var vm = this;
    vm.courseName = $stateParams.courseName;
    vm.course = {
      tasks: [{
        "id": 1,
        "name": "Κάνε την πρόσθεση και δώσε το αποτέλεσμα",
        "description": "5 + 2 = ?",
        "expires_at": "2017-04-20",
        "reward": {
          "code": 2,
          "name": "ασημένιο"
        },
        "submitted": 12
      }, {
        "id": 2,
        "name": "Κάνε την αφαίρεση και δώσε το αποτέλεσμα",
        "description": "5 - 2 = ?",
        "expires_at": "2017-04-20",
        "reward": {
          "code": 2,
          "name": "ασημένιο"
        },
        "submitted": 8
      }, {
        "id": 3,
        "name": "Κάνε την διαίρεση και δώσε το αποτέλεσμα",
        "description": "5 / 0 = ?",
        "expires_at": "2017-04-20",
        "reward": {
          "code": 1,
          "name": "χρυσό"
        },
        "submitted": 5
      }]
    }


    activate();


    function activate() {
      console.log($stateParams.courseId);
    }
  }
})();
