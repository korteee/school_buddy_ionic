(function() {
    'use strict';

    angular
        .module('app')
        .controller('CoursesCtrl', CoursesCtrl);

    CoursesCtrl.inject = ['Course'];

    function CoursesCtrl(Course) {
        var vm = this;

        var _getCourses = getCourses;

        activate();


        function activate() {
            _getCourses();
        }

        function getCourses() {
            Course.all().then(resp => {
                vm.courses = resp.data;
            }, resp => {
                console.log('Failed to get courses');
            })
        }
    }
})();