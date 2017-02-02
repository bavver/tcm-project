angular
  .module('root', [
   'ui.router',
   'ngDialog'
  ])
   .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {        
        url: '/home',
        component: 'home'
      })
      .state('result', {        
        url: '/result',
        component: 'result'
      });
  });
  
