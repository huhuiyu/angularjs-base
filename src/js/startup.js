(function() {
  //当文档加载完毕的时候将myapp模块和document绑定
  angular.element(document).ready(function() {
    var app = angular.module(MyAppConfig.name);
    //模块加载前的处理动作，$rootScope是全局范围，在所有地方有效
    app.run([
      '$rootScope',
      '$log',
      function($rootScope, $log) {
        $log.info('模块初始化。。。', MyAppConfig);
        $rootScope.appTitle = MyAppConfig.title;
      }
    ]);

    angular.bootstrap(document, [MyAppConfig.name]);
  });
})();
