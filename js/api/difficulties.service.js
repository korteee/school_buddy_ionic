(function () {
  'use strict';

  angular
    .module('app')
    .service('Difficulties', Difficulties);

  Difficulties.inject = ['http'];

  function Difficulties(http) {

    var service = {
      all: getAllDifficulties
    };

    return service;

    function getAllDifficulties() {
      let params = {};

      return http.get(params, '/difficulties');
    }

  }
})();
