(function() {
    'use strict';

    angular
        .module('app')
        .controller('CourseTasksCtrl', CourseTasksCtrl);

    CourseTasksCtrl.inject = ['$stateParams', 'Task'];

    function CourseTasksCtrl($stateParams, Task) {
        var vm = this;
        var _getCourseTasks = getCourseTasks;
        vm.courseName = $stateParams.courseName;



        activate();


        function activate() {
            _getCourseTasks($stateParams.courseId);
        }

        function getCourseTasks(courseId) {
            Task.ofCourse(courseId).then(resp => {
                vm.tasks = resp.data;
                console.log(vm.tasks);
            }, resp => {
                console.log('Failed to get courses', resp);
            })
        }
    }
})();