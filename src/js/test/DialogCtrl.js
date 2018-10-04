(function() {
  var ctrls = angular.module('controllers');
  ctrls.controller('TestDialogCtrl', [
    '$scope',
    '$log',
    'DialogService',
    TestDialogCtrl
  ]);

  function TestDialogCtrl($scope, $log, DialogService) {
    $log.debug('TestDialogCtrl init...');
    DialogService.setTempDialogTitle('临时标题');
    DialogService.setAlertBtnOk('修改按钮');

    DialogService.showAlert('对话框演示', function() {
      DialogService.showAlert('对话框事件');
    });
    // 处理scope销毁
    $scope.$on('$destroy', function() {
      $log.debug('TestDialogCtrl destroy...');
    });
  }
})();
