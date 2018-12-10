(function() {
  var app = angular.module(MyAppConfig.directives);

  /**
   * 按照指定给是显示时间戳的指令
   */
  app.directive('showTime', [
    '$log',
    'MyUtilService',
    'DateTimeService',
    function($log, MyUtilService, DateTimeService) {
      $log.debug('directive show-time...');
      return {
        scope: {
          showTime: '@'
        },
        link: function($scope, element, attr) {
          $log.debug('directive show-time element:', element);
          var format = element.attr('format');
          if (MyUtilService.empty(format)) {
            format = 'y-M-d';
          }
          var finish = false;
          var watch = $scope.$watch('showTime', function(nv, ov) {
            if (nv && nv !== '') {
              try {
                var time = parseInt(nv);
                element.html(DateTimeService.formatDate(time, format));
                watch();
                finish = true;
              } catch (e) {
                $log.debug('directive show-time error:', e);
                watch();
                finish = true;
              }
            }
          });

          $scope.$on('$destroy', function() {
            $log.debug('directive show-time destroy...');
            if (!finish) {
              watch();
            }
          });
        }
      };
    }
  ]);
})();
