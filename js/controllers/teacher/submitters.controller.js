(function () {
  'use strict';

  angular
    .module('app')
    .controller('SubmittersCtrl', SubmittersCtrl);

  SubmittersCtrl.inject = ['$ionicPopup', '$scope'];

  function SubmittersCtrl($ionicPopup, $scope) {
    var vm = this;
    vm.submittedStudents = [{
      "id": 1,
      "full_name": "Μανολάκης Παπαδόπουλος"
    }, {
      "id": 1,
      "full_name": "Σμαραγδούλα Ιοάννου"
    }, {
      "id": 1,
      "full_name": "Βάλια Παπαδημητρίου"
    }, ]
    vm.openEvalAlert = openEvalAlert;
    $scope.grade = {}

    activate();


    function activate() {}

    function openEvalAlert(index) {
      $ionicPopup.show({
        template: `<input type="number" ng-model="grade.val">`,
        title: 'Εισάγετε βαθμολογία',
        subTitle: 'Από το 0 εώς το 10',
        scope: $scope,
        buttons: [{
          text: 'Άκυρο'
        }, {
          text: '<b>Οκ</b>',
          type: 'button-calm',
          onTap: function (e) {
            if (!$scope.grade.val || $scope.grade.val < 0 || $scope.grade.val > 10 || isNaN($scope.grade.val)) {
              console.log($scope.grade)

              e.preventDefault();
            } else {
              vm.submittedStudents[index].grade = $scope.grade.val;
              $scope.grade.val = null;
            }
          }
        }, ]
      });
    }
  }
})();
