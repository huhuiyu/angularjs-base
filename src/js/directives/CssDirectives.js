(function() {
  var app = angular.module(MyAppConfig.directives);

  /*
    处理fixed效果的指令
  */
  app.directive('fixedTop', [
    '$log',
    function($log) {
      $log.debug('directive fixed-top...');
      return {
        link: function($scope, element, attr) {
          $log.debug('directive fixed-top element:', element);
          var height = angular.element(element.find(element.attr('fixed-top'))[0]).height();
          $log.debug('directive fixed-top height:', height);
          angular.element(element[0].nextElementSibling).css('margin-top', height + 'px');

          $scope.$on('$destroy', function() {
            $log.debug('directive fixed-top destroy...');
          });
        }
      };
    }
  ]);

  app.directive('fixedBottom', [
    '$log',
    function($log) {
      $log.debug('directive fixed-bottom...');
      return {
        link: function($scope, element, attr) {
          $log.debug('directive fixed-bottom element:', element);
          var height = angular.element(element.find(element.attr('fixed-bottom'))[0]).height();
          $log.debug('directive fixed-bottom height:', height);
          angular.element(element[0].previousElementSibling).css('padding-bottom', height + 'px');

          $scope.$on('$destroy', function() {
            $log.debug('directive fixed-bottom destroy...');
          });
        }
      };
    }
  ]);
})();
