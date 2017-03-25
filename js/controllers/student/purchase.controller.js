(function () {
  'use strict';

  angular
    .module('app')
    .controller('PurchaseCtrl', PurchaseCtrl);

  PurchaseCtrl.inject = [''];

  function PurchaseCtrl() {
    var vm = this;
    vm.availableBuddies = [
        {
            "id":1,
            "name":"Starter Buddy",
            "value":0,
            "available":true,
            "img_src":"https://media.giphy.com/media/O2imWWcO8Mgco/giphy.gif"
        },
        {
            "id":2,
            "name":"Advanced Buddy",
            "value":1500,
            "available":true,
            "img_src":"https://media.giphy.com/media/uFsP0mX0reQ92/giphy.gif"
        },
        {
            "id":1,
            "name":"Starter Buddy",
            "value":2500,
            "available":true,
            "img_src":"https://media.giphy.com/media/DiHAtdThTtXH2/giphy.gif"
        }
    ]

    activate();


    function activate() {}
  }
})();
