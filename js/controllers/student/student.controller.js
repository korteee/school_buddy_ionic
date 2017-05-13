(function() {
    'use strict';

    angular
        .module('app')
        .controller('StudentCtrl', StudentCtrl);

    StudentCtrl.inject = ['$scope'];

    function StudentCtrl($scope) {
        var vm = this;

        $scope.$on('$ionicView.enter', () => {
            vm.stars = angular.fromJson(localStorage.getItem('user')).stars;
            vm.userId = angular.fromJson(localStorage.getItem('user')).id;

            $scope.$on('starsChanged',(event,data)=> {
                console.log(data);
                vm.stars = data.stars;
            })
        })


    }
})();