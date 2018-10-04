/**
 * 对话框自定义指令
 */
(function() {
  var app = angular.module('directives');

  var alertDialogTemplate =
    "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 1990;'>    <div class='modal-dialog modal-sm' role='document'>        <div class='modal-content'>            <div class='modal-header'>                <button type='button' class='close' data-dismiss='modal' aria-label='Close'>                    <span aria-hidden='true'>&times;</span>                </button>                <h4 class='modal-title' ng-bind='alertTitle'></h4>            </div>            <div class='modal-body'>                <div ng-bind-html='alertInfo'></div>            </div>            <div class='modal-footer'>                <button type='button' class='btn btn-default' data-dismiss='modal' ng-bind-html='alertBtnOk'></button>            </div>        </div>    </div></div>";

  app.directive('alertDialog', [
    '$log',
    'DialogService',
    function($log, DialogService) {
      $log.debug('directive alert-dialog...');

      return {
        restrict: 'AE',
        template: alertDialogTemplate,
        replace: true,
        link: function($scope, element, attr) {
          $scope.$on('$destroy', function() {
            $log.debug('directive alert-dialog destroy...');
          });

          $log.debug('directive alert-dialog init==>', element);
          DialogService.setAlertDialog({
            scope: $scope,
            element: element
          });
        }
      };
    }
  ]);

  var waitDialogTemplate =
    "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 2000;'>    <div class='modal-dialog modal-sm' role='document'>        <div class='modal-content'>            <div class='modal-header'>                <div class='modal-title' ng-bind='waitTitle'></div>            </div>            <div class='modal-body'>                <div class='text-center'>                    <span ng-bind-html='waitInfo'></span>                </div>            </div>        </div>    </div></div>";

  app.directive('waitDialog', [
    '$log',
    'DialogService',
    function($log, DialogService) {
      $log.debug('directive wait-dialog...');

      return {
        restrict: 'AE',
        template: waitDialogTemplate,
        replace: true,
        link: function($scope, element, attr) {
          $scope.$on('$destroy', function() {
            $log.debug('directive wait-dialog destroy...');
          });

          $log.debug('directive wait-dialog init==>', element);
          DialogService.setWaitDialog({
            scope: $scope,
            element: element
          });
        }
      };
    }
  ]);

  var customDialogTemplate =
    "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 1500;'>    <div class='modal-dialog' role='document'>        <div class='modal-content'>            <div class='modal-header'>                <div class='modal-title' ng-bind='customTitle'></div>            </div>            <div class='modal-body'>                <div ng-include='customPage'></div>            </div>        </div>    </div></div>";

  app.directive('customDialog', [
    '$log',
    'DialogService',
    function($log, DialogService) {
      $log.debug('directive custom-dialog...');

      return {
        restrict: 'AE',
        template: customDialogTemplate,
        replace: true,
        link: function($scope, element, attr) {
          $scope.$on('$destroy', function() {
            $log.debug('directive custom-dialog destroy...');
          });

          $log.debug('directive custom-dialog init==>', element);
          DialogService.setCustomDialog({
            scope: $scope,
            element: element
          });
        }
      };
    }
  ]);

  var confirmDialogTemplate =
    "<div class='modal' data-backdrop='static' data-keyboard='false' tabindex='-1' role='dialog' style='z-index: 1990;'>    <div class='modal-dialog modal-sm' role='document'>        <div class='modal-content'>            <div class='modal-header'>                <h4 class='modal-title' ng-bind='confirmTitle'></h4>            </div>            <div class='modal-body'>                <p ng-bind-html='confirmInfo'></p>            </div>            <div class='modal-footer'>                <button type='button' class='btn btn-default' ng-click='confirmOk()'  ng-bind-html='confirmBtnYes'></button>                <button type='button' class='btn btn-default' ng-click='confirmCancel()' ng-bind-html='confirmBtnNo'></button>            </div>        </div>    </div></div>";

  app.directive('confirmDialog', [
    '$log',
    'DialogService',
    function($log, DialogService) {
      $log.debug('directive confirm-dialog...');

      return {
        restrict: 'AE',
        template: confirmDialogTemplate,
        replace: true,
        link: function($scope, element, attr) {
          $scope.$on('$destroy', function() {
            $log.debug('directive confirm-dialog destroy...');
          });

          $log.debug('directive confirm-dialog init==>', element);

          DialogService.setConfirmDialog({
            scope: $scope,
            element: element
          });

          $scope.confirmOk = DialogService.confirmOk;
          $scope.confirmCancel = DialogService.confirmCancel;
        }
      };
    }
  ]);
})();
