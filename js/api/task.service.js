(function() {
    'use strict';

    angular
        .module('app')
        .service('Task', Task);

    Task.inject = ['http'];

    function Task(http) {

        var service = {
            create: createTask,
            ofCourse: getCourseTasks,
            users: getTaskUsers,
            evaluate: evaluateStudent
        };

        return service;

        function createTask(name, description, dueDate, difficultyId, course_id) {
            let payload = {
                name,
                description,
                dueDate,
                difficultyId,
                course_id,
            };

            return http.post(payload, '/tasks');
        }

        function getCourseTasks(courseId) {
            let params = {};

            return http.get(params, `/courses/${courseId}/tasks`);
        }

        function getTaskUsers(taskId) {
            let params = {};
            return http.get(params, `/courses/tasks/${taskId}/users`);
        }

        function evaluateStudent(studentId, taskId, grade) {
            let payload = {
                taskId,
                grade
            };

            return http.post(payload, `/student/${studentId}/evaluate`);
        }

    }
})();