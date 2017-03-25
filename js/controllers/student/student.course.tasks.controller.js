(function () {
  'use strict';

  angular
    .module('app')
    .controller('StudentCourseTasks', StudentCourseTasks);

  StudentCourseTasks.$inject = ['$stateParams'];

  function StudentCourseTasks($stateParams) {
    var vm = this;
    vm.course = {
      name: $stateParams.courseName,
      id: $stateParams.id
    };

    vm.course.tasks = [{
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
})();
