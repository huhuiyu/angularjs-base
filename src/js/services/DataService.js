/**
 * 数据服务
 */
(function() {
  var app = angular.module(MyAppConfig.services);

  app.factory('DataService', ['$log', '$http', 'MyCookieService', 'MyUtilService', DataService]);

  function DataService($log, $http, MyCookieService, MyUtilService) {
    $log.info('DataService init...');
    var errorInfo = { success: false, message: '请检查网络状态', code: 404 };

    var service = {
      dataServer: ''
    };

    service.setDataServer = function(dataServer) {
      service.dataServer = dataServer;
    };
    var servertokenKey = 'servertoken.key';

    service.send = function(url, postdata, cb) {
      if (!postdata) {
        postdata = {};
      }
      // 发送时间戳
      postdata.ajaxtimestamp = new Date().getTime();
      postdata.servertoken = MyCookieService.getLocalData(servertokenKey);
      $http({
        method: 'POST',
        url: service.dataServer + url,
        data: postdata
      }).then(
        function(data, status) {
          $log.debug(data, status);
          //处理服务器token
          if (data.data && data.data.servertoken && !MyUtilService.empty(MyUtilService.trim(data.data.servertoken))) {
            MyCookieService.putLocalData(servertokenKey, data.data.servertoken);
          }
          (cb || angular.noop)(data.data);
        },
        function(data, status) {
          $log.error('DataService.send error:', data);
          (cb || angular.noop)(errorInfo);
        }
      );
    };

    service.get = function(url, cb) {
      $http({
        method: 'GET',
        url: url
      }).then(
        function(data, status) {
          $log.info(data, '====>', status);
          (cb || angular.noop)(null, data.data);
        },
        function(data, status) {
          $log.error(data);
          (cb || angular.noop)(data, null);
        }
      );
    };

    service.post = function(url, postdata, cb) {
      $http({
        method: 'POST',
        url: url,
        data: postdata
      }).then(
        function(data, status) {
          $log.debug(data, status);
          (cb || angular.noop)(null, data.data);
        },
        function(data, status) {
          $log.error('DataService.send error:', data);
          (cb || angular.noop)(data, null);
        }
      );
    };

    return service;
  }
})();
