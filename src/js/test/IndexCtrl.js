(function() {
  var ctrls = angular.module('controllers');
  ctrls.controller('TestIndexCtrl', ['$scope', '$log', TestIndexCtrl]);

  function TestIndexCtrl($scope, $log) {
    $log.debug('TestIndexCtrl init...');

    // 处理scope销毁
    $scope.$on('$destroy', function() {
      $log.debug('TestIndexCtrl destroy...');
    });

    $scope.changePage = function(page) {
      $scope.demopage = 'templates/test/' + page + '.html';
    };

    $scope.changePage('dialog');
  }
})();
