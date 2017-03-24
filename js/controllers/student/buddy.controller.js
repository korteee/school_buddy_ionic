(function () {
  'use strict';

  angular
    .module('app')
    .controller('buddyCtrl', buddyCtrl);

  buddyCtrl.$inject = ['$http', 'MESSAGES', '$ionicPopup'];

  function buddyCtrl($http, MESSAGES, $ionicPopup) {
    var vm = this;

    vm.notifications = {
      danger: [],
      warning: [],
      success: []
    }

    var createNotification = {
      danger: createDanger,
      warning: createWarning,
      success: createSuccess
    }

    vm.hasUnreadNotifications = hasUnreadNotifications;
    vm.readNotifications = readNotifications;
    activate();

    function activate() {
      getNotifications();
    }

    function getNotifications() {
      $http.get('resources/notifications.json').success(function (res) {
        console.log(res)
        vm.notifications.danger = createNotification.danger(res.danger);
        vm.notifications.warning = createNotification.warning(res.warning);
        vm.notifications.success = createNotification.success(res.success);
        console.log(vm.notifications);
      })
    }

    function createDanger(dangerObj) {
      var tmpStr = MESSAGES.danger.part_1;
      var arr = [];

      angular.forEach(dangerObj.tasks.classes, function (val, key) {
        (key + 1 != dangerObj.tasks.classes.length) ? tmpStr += val.name + ', ': tmpStr += val.name;
      })

      arr.push({
        msg: tmpStr + MESSAGES.danger.part_2,
        isRead: false
      });
      tmpStr = '';

      angular.forEach(dangerObj.exam, function (val, key) {
        tmpStr += 'Αύριο είναι το διαγώνισμα στα ' + val.name
      });

      arr.push({
        msg: tmpStr,
        isRead: false
      });

      return arr;
    }

    function createWarning() {}

    function createSuccess() {}

    function readNotifications(notifications) {
      var i = 0;
      var len = notifications.length;

      openPopup(0);

      function openPopup(i) {
        var alertPopup = $ionicPopup.alert({
          title: 'Ειδοποίηση',
          template: notifications[i].msg
        });

        alertPopup.then(function (res) {
          notifications[i].isRead = true;
          i++;
          if (notifications[i]) {
            openPopup(i);
          }
        });
      }


    }

    function hasUnreadNotifications(notifications) {
      var i = 0;
      var len = notifications.length;
      for (i; i < len; i++) {
        if (!notifications[i].isRead)
          return true
      }
      return false;
    }

  }
})();
