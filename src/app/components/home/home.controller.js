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
  .controller('HomeController', HomeController);