(function () {
  'use strict';

  angular
    .module('app')
    .service('Course', Course);

  Course.inject = ['http'];

  function Course(http) {

    var service = {
      all: getAllCourses
    };

    return service;

    function getAllCourses() {
      let params = {};
      return http.get(params, '/courses');
    }

  }
})();
