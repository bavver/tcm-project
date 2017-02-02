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
