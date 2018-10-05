(function() {
  var ctrls = angular.module('controllers');
  ctrls.controller('TestDialogIncCtrl', [
    '$scope',
    '$log',
    'DialogService',
    TestDialogIncCtrl
  ]);

  function TestDialogIncCtrl($scope, $log, DialogService) {
    $log.debug('TestDialogIncCtrl init...');
    var cdata = DialogService.getCustomData();
    var parent = cdata.scope;
    $scope.ts = cdata.ts;

    // 处理scope销毁
    $scope.$on('$destroy', function() {
      $log.debug('TestDialogIncCtrl destroy...');
    });

    $scope.data = {};

    $scope.ok = function() {
      DialogService.hideCustom();
      var result = {};
      angular.copy($scope.data, result);
      parent.result(result);
    };

    $scope.cancel = function() {
      DialogService.hideCustom();
      parent.result(null);
    };
  }
})();
