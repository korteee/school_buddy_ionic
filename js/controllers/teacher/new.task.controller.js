(function() {
    'use strict';

    angular
        .module('app')
        .controller('NewTaskCtrl', NewTaskCtrl);

    NewTaskCtrl.inject = ['Course', 'Task', 'Difficulties', '$ionicPopup'];

    function NewTaskCtrl(Course, Task, Difficulties, $ionicPopup) {
        var vm = this;
        var _getCourses = getCourses;
        var _getDifficulties = getDifficulties;

        vm.task = {};
        vm.createTask = createTask;


        activate();

        function activate() {
            _getCourses();
            _getDifficulties();
        }

        function getCourses() {
            Course.all().then(resp => {
                vm.courses = resp.data;
            }, resp => {
                console.log('Failed to get courses', resp);
            })
        }

        function getDifficulties() {
            Difficulties.all().then(resp => {
                console.log(resp);
                vm.difficulties = resp.data;
            }, resp => {
                console.log('Failed to get difficulties');
            })
        }

        function createTask() {
            Task.create(vm.task.name, vm.task.description, vm.task.dueDate.getTime() / 1000, vm.task.difficulty, vm.task.course).then(resp => {
                console.log(resp);
                $ionicPopup.alert({
                    title: 'Συγχαρητήρια',
                    template: 'Το καθήκον καταχωρήθηκε'
                })
            }, resp => {
                $ionicPopup.alert({
                    title: 'Λυπούμαστε',
                    template: 'Κάτι συνέβει και το καθήκον δεν καταχωρήθηκε'
                });

                console.log(resp);
            })
        }
    }
})();