(function() {
  var ctrls = angular.module('controllers');
  ctrls.controller('TestDialogCtrl', [
    '$scope',
    '$log',
    '$timeout',
    'DialogService',
    'MyUtilService',
    TestDialogCtrl
  ]);

  function TestDialogCtrl(
    $scope,
    $log,
    $timeout,
    DialogService,
    MyUtilService
  ) {
    $log.debug('TestDialogCtrl init...');

    // 处理scope销毁
    $scope.$on('$destroy', function() {
      $log.debug('TestDialogCtrl destroy...');
    });

    $scope.showDialog = function() {
      DialogService.showConfirm(
        '是否修改对话框信息',
        function() {
          DialogService.setTempDialogTitle('临时标题');
          DialogService.setAlertBtnOk('修改按钮');
          DialogService.showAlert('修改了信息');
        },
        function() {
          DialogService.showAlert('带回调处理', function() {
            DialogService.showWait('请等待...', function() {
              $log.debug('等待对话框关闭');
            });
            $timeout(function() {
              DialogService.hideWait();
            }, 2000);
          });
        }
      );
    };

    $scope.result = function(info) {
      $log.debug('自定义对话框返回结果：', info);
      if (info) {
        DialogService.showAlert(
          MyUtilService.trustAsHtml(
            MyUtilService.jsonSyntaxHighlight(
              MyUtilService.formatJson(JSON.stringify(info))
            )
          )
        );
      }
    };

    $scope.showCustom = function() {
      DialogService.showCustom(
        'templates/test/dialog-inc.html',
        {
          ts: new Date().getTime(),
          scope: $scope
        },
        function() {
          $log.debug('自定义对话框关闭');
        }
      );
    };
  }
})();
