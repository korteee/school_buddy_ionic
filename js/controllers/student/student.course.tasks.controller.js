(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentCourseTasks', StudentCourseTasks);

    StudentCourseTasks.$inject = ['Task', '$stateParams'];

    function StudentCourseTasks(Task, $stateParams) {
        var vm = this;
        vm.course = {
            name: $stateParams.courseName,
            id: $stateParams.courseId
        };

        var _getCourseTasks = getCourseTasks;

        activate();

        function activate() {
            _getCourseTasks($stateParams.courseId);
        };

        function getCourseTasks(courseId) {
            Task.ofCourse(courseId).then(resp => {
                console.log(resp);
                vm.tasks = resp.data;
            }, resp => {
                console.log('Failed to get courses');
            })
        }



    }
})();