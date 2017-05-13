(function() {
    'use strict';

    angular
        .module('app')
        .controller('SubmittersCtrl', SubmittersCtrl);

    SubmittersCtrl.inject = ['$stateParams', 'Task', '$ionicPopup', '$scope'];

    function SubmittersCtrl($stateParams, Task, $ionicPopup, $scope) {
        var vm = this;
        var _getTaskUsers = getTaskUsers;
        vm.openEvalAlert = openEvalAlert;
        $scope.grade = {}

        activate();


        function activate() {
            _getTaskUsers($stateParams.taskId);
        }

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
                    onTap: function(e) {
                        if ((!$scope.grade.val && $scope.grade.val != 0) || $scope.grade.val < 0 || $scope.grade.val > 10 || isNaN($scope.grade.val)) {
                            e.preventDefault();
                        } else {
                            Task.evaluate(vm.students[index].id, $stateParams.taskId, $scope.grade.val).then(resp => {
                                vm.students.splice(index, 1);
                            }, resp => {
                                console.log(resp);
                            })
                            // vm.students[index].grade = $scope.grade.val;
                            $scope.grade.val = null;
                        }
                    }
                }, ]
            });
        };


        function getTaskUsers(taskId) {
            Task.users(taskId).then(resp => {
                vm.students = resp.data;
            }, resp => {
                console.log(resp)
            })
        }
    }
})();