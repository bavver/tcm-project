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
  .controller('ResultController', ResultController);