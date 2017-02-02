(function(angular){
'use strict';
angular
  .module('root', [
   'ui.router',
   'ngDialog'
  ])
   .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
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
  }]);
  
})(window.angular);
(function(angular){
'use strict';
var home = {
  templateUrl: 'components/home/home.html',
  controller: 'HomeController'
};

angular
  .module('root')
  .component('home', home);
})(window.angular);
(function(angular){
'use strict';
HomeController.$inject = ["$location", "$http", "$window", "$scope", "ngDialog"];
function HomeController($location, $http, $window, $scope, ngDialog) {

  var vm = this;
  vm.$onInit = init;
  vm.search = search;
  vm.reload = reload;
  vm.popup = popup;
  vm.close = close;

  function reload() {
    $window.location.reload();
  }

  function init(){
    vm.category = "";
  }


  function search(searchKey, cat) {
    if (searchKey == "") {
      vm.places = [];
      return;
    }

    var url = "http://localhost:62739/api/movies?$filter=substringof(tolower(%27" + searchKey + "%27), tolower(SearchTerm)) ";

    if(cat)
    {
      url += "and Category eq '" + cat + "'";
    }


    $http.get(
      url
    ).then(function (result) {
      vm.places = result.data;

        var myObject = JSON.parse($window.localStorage.wishlist)
        for (var i in myObject){
          for(var k in vm.places){
            if (myObject[i].movie == vm.places[k].Id){
            vm.places[k].wish = true;
          }
          }
        };

        var myBlack = JSON.parse($window.localStorage.blacklist)
        for (var i in myBlack){
          for(var k in vm.places){
            if (myBlack[i].blackmovie == vm.places[k].Id){
            vm.places[k].blacklist = true;
          }
          }
        }

    });
  }

  function close() {
    ngDialog.close();
  }

  function popup() {
    ngDialog.open({ 
      template: '<h4>Choose a Category from list below</h4> <input type="radio" ng-click="$ctrl.close()" ng-model="$ctrl.category" ng-change="$ctrl.search($ctrl.keyword,$ctrl.category)"  class="input-md" value=""/>All <input type="radio" ng-model="$ctrl.category" ng-change="$ctrl.search($ctrl.keyword,$ctrl.category)" ng-click="$ctrl.close()"  class="input-md" value="Episode"/>Episode <input type="radio" ng-model="$ctrl.category" ng-click="$ctrl.close()" ng-change="$ctrl.search($ctrl.keyword,$ctrl.category)"  class="input-md" value="Movie"/>Movie <input type="radio" ng-model="$ctrl.category" ng-click="$ctrl.close()" ng-change="$ctrl.search($ctrl.keyword,$ctrl.category)"  class="input-md" value="Series"/>Series', 
      className: 'ngdialog-theme-default',
      plain:true,
      scope: $scope });
  }

}

angular
  .module('root')
  .controller('HomeController', HomeController);})(window.angular);
(function(angular){
'use strict';
var result = {
  templateUrl: 'components/result/result.html',
  controller: 'ResultController',
  bindings: {
    $transition$: '<'
  }
};

angular
  .module('root')
  .component('result', result);
})(window.angular);
(function(angular){
'use strict';
ResultController.$inject = ["$location", "$http", "$window", "$scope", "ngDialog"];
function ResultController($location, $http,$window,$scope, ngDialog) {
 
  var vm = this;
  vm.$onInit = init;
  vm.addtowish = addtowish;
  vm.addtoblack = addtoblack;
  vm.reload = reload;
  vm.removewish = removewish;
  vm.dialogtoblack = dialogtoblack;
  vm.close = close;
  function reload() {
     $window.location.reload();
  }

    function addtowish(id) {

    var WishList = {
      movie : id 
    }

    vm.wishlist = JSON.parse($window.localStorage.getItem("wishlist"));
    if(!vm.wishlist)
    vm.wishlist = [];

    vm.wishlist.push(WishList);
    $window.localStorage.setItem("wishlist",JSON.stringify(vm.wishlist));
    vm.place.wish=!vm.place.wish;
  };

  function dialogtoblack(id) {
    ngDialog.open({ 
      template: '<h4>Are you sure to report this movie??</h4> <br> <button class="btn btn-info" ng-click="$ctrl.addtoblack($ctrl.place.Id); $ctrl.close()">YES</button> <button class="btn btn-danger" ng-click="$ctrl.close()">Cancel</button>', 
      className: 'ngdialog-theme-default',
      plain:true,
      scope: $scope });
  }

    function close() {
    ngDialog.close();
  }

    function addtoblack(id) {

    var Blacklist = {
      blackmovie : id 
    }

    vm.blacklist = JSON.parse($window.localStorage.getItem("blacklist"));
    if(!vm.blacklist)
    vm.blacklist = [];

    vm.blacklist.push(Blacklist);
    $window.localStorage.setItem("blacklist",JSON.stringify(vm.blacklist));

  };

  function removewish(id) {
      var myObject = JSON.parse($window.localStorage.wishlist);
      var wanted = myObject.findIndex( function(item){return (item.movie==id);} );
       myObject.splice(wanted,1);

       $window.localStorage.setItem("wishlist",JSON.stringify(myObject));
vm.place.wish=!vm.place.wish;
  }

  function init() {
    var movieid = $location.search().id;
    $http.get(
     "http://localhost:62739/api/movies?$filter= Id eq %20" + movieid  
    ).then(function(result) {
     vm.place = result.data[0];

        var myObject = JSON.parse($window.localStorage.wishlist)
        for (var i in myObject){
            if (myObject[i].movie == vm.place.Id){
            vm.place.wish = true;
            break;
          }
        }

    });
  }
}

angular
  .module('root')
  .controller('ResultController', ResultController);})(window.angular);
(function(angular){
'use strict';
angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./home.html','<span>serdar</span>');}]);})(window.angular);