(function() {
  var ctrls = angular.module('controllers');
  ctrls.controller('RouteCtrl', [
    '$scope',
    '$log',
    '$routeParams',
    '$location',
    RouteCtrl
  ]);

  var key = 'page/';
  var templatePath = 'templates/';
  var templateExt = '.html';

  function RouteCtrl($scope, $log, $routeParams, $location) {
    $log.debug('RouteCtrl $routeParams:', $routeParams.path);

    // 处理scope销毁
    $scope.$on('$destroy', function() {
      $log.debug('RouteCtrl destroy...');
    });

    $scope.init = function() {
      var page = $routeParams.path.replace(key, '');
      $log.debug('RouteCtrl init...', page);
      $scope.template =
        templatePath +
        page +
        templateExt +
        '?pagetimestamp=' +
        new Date().getTime();
      $log.debug('RouteCtrl template:', $scope.template);
    };

    $scope.init();
  }
})();
