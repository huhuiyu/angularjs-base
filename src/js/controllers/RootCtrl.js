(function() {
  var ctrls = angular.module(MyAppConfig.controllers);
  ctrls.controller('RootCtrl', ['$rootScope', '$scope', '$log', '$location', 'DialogService', 'DataService', RootCtrl]);

  function RootCtrl($rootScope, $scope, $log, $location, DialogService, DataService) {
    $log.debug('RootCtrl init...', $location.path());

    // 处理scope销毁
    $scope.$on('$destroy', function() {
      $log.debug('RootCtrl destroy...');
    });
    DialogService.setDialogTitle($rootScope.appTitle);
    DataService.setDataServer('http://127.0.0.1:10000');

    // 监听视图切换
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      $log.debug('route加载页面中：', next, '-', current, '[event]', event);
    });
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      $log.debug('route加载完毕。。。', current, '-', previous, '[event]', event);
    });
    $rootScope.$on('$routeChangeError', function(event, current) {
      $log.debug('route加载错误。。。', current, '[event]', event);
    });
  }
})();
