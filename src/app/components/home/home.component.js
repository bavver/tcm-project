var home = {
  templateUrl: 'components/home/home.html',
  controller: 'HomeController'
};

angular
  .module('root')
  .component('home', home);
