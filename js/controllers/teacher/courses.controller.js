(function() {
'use strict';

    angular
        .module('app')
        .controller('CoursesCtrl', CoursesCtrl);

    CoursesCtrl.inject = [];
    function CoursesCtrl() {
        var vm = this;
        vm.courses = [
            {
                "id":1,
                "name":"Μαθηματικά"
            },
            {
                "id":2,
                "name":"Ιστορία"
            },
            {
                "id":3,
                "name":"Γεωγραφία"
            },
            {
                "id":4,
                "name":"Γλώσσα"
            }
        ]
        

        activate();


        function activate() { 
            console.log("Its courses")
        }
    }
})();