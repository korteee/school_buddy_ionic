// Ionic app App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.services' is found in services.js
// 'app.controllers' is found in controllers.js
angular.module('app', ['ionic'])

.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller:'LoginCtrl',
    controllerAs:'lo'
  })

    .state('student', {
    url: '/student',
    abstract: true,
    templateUrl: 'templates/student/tabs.html'
  })


  .state('student.tasks', {
    url: '/tasks',
    views: {
      'tab-tasks': {
        templateUrl: 'templates/student/tasks.html',
        controller: 'tasksCtrl',
        controllerAs: "ta"
      }
    }
  })

  .state('student.tasks.single-task', {
    url: '/task/:taskId/:taskName',
    views: {
      'tab-tasks@student': {
        templateUrl: "templates/student/single-task.html",
        controller: 'singleTaskCtrl',
        controllerAs: 'st'
      }
    }
  })

  .state('student.buddy', {
    url: '/buddy',
    views: {
      'tab-buddy': {
        templateUrl: 'templates/student/buddy.html',
        controller: 'buddyCtrl',
        controllerAs: 'bu'
      }
    }
  })


  .state('student.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })


   .state('teacher', {
    url: '/teacher',
    abstract: true,
    templateUrl: 'templates/teacher/tabs.html'
  })


  .state('teacher.new-task', {
    url: '/new-task',
    views: {
      'tab-new-task': {
        templateUrl: 'templates/teacher/new_task.html',
        controller: 'NewTaskCtrl',
        controllerAs: "nt"
      }
    }
  })

  .state('teacher.eval', {
    url: '/eval',
    views: {
      'tab-eval': {
        templateUrl: 'templates/teacher/courses.html',
        controller: 'CoursesCtrl',
        controllerAs: "co"
      }
    }
  })

  .state('teacher.eval.course-tasks', {
    url: '/course/:courseId/:courseName',
    views: {
      'tab-eval@teacher': {
        templateUrl: "templates/teacher/course-tasks.html",
        controller: 'CourseTasksCtrl',
        controllerAs: 'ct'
      }
    }
  })

  .state('teacher.eval.course-tasks.submitters', {
    url: '/course/:courseId/:courseName/submitters',
    views: {
      'tab-eval@teacher': {
        templateUrl: "templates/teacher/submitters.html",
        controller: 'SubmittersCtrl',
        controllerAs: 'su'
      }
    }
  })

  .state('teacher.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/login');

});
