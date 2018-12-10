/**
 * Cookie服务
 */
(function() {
  var app = angular.module(MyAppConfig.services);
  // 创建cookie服务
  app.factory('MyCookieService', ['$log', '$cookies', '$window', MyCookieService]);

  function MyCookieService($log, $cookies, $window) {
    $log.info('MyCookieService init...');
    var superExpires = 365 * 24 * 60 * 60 * 1000; // 超长过期时间
    var service = {}; // 服务对象

    // 保存超长过期时间的cookie
    service.putSuperExpiresData = function(key, value, path) {
      var expires = getExpiresDate(superExpires);
      $log.debug('MyCookieService putSuperExpiresData;', key, '-', value, ':', expires);
      var options = {};
      options.expires = expires;
      if (path) {
        // 如果路径存在就设置
        options.path = path;
      }
      $cookies.put(key, value, options);
    };

    // 获取超长过期时间的cookie
    service.getSuperExpiresData = function(key) {
      var value = $cookies.get(key);
      $log.debug('MyCookieService getSuperExpiresData;', key, '-', value);
      if (value) {
        // 值存在就更新过期时间
        service.putSuperExpiresData(key, value);
        return value;
      }
      return '';
    };

    // 保存cookie
    service.putData = function(key, value, path) {
      $log.debug('MyCookieService putData;', key, '-', value);
      var options = {};
      if (path) {
        // 如果路径存在就设置
        options.path = path;
      }
      $cookies.put(key, value, options);
    };

    // 获取cookie
    service.getData = function(key) {
      var value = $cookies.get(key);
      $log.debug('MyCookieService getData;', key, '-', value);
      value = value ? value : '';
      return value;
    };
    // 删除cookie
    service.remove = function(key, path) {
      var options = {};
      if (path) {
        // 如果路径存在就设置
        options.path = path;
      }
      $cookies.remove(key, options);
    };
    // 保存对象到cookie
    service.putObject = function(key, value, path) {
      try {
        value = JSON.stringify(value);
        service.putData(key, value, path);
      } catch (ex) {
        $log.debug('MyCookieService putObject ex;', ex.message);
      }
    };

    // 获取cookie中的对象
    service.getObject = function(key) {
      var value = service.getData(key);
      if (value === '') {
        // 没有数据就直接返回
        return value;
      }
      try {
        value = JSON.parse(value);
        return value;
      } catch (ex) {
        $log.debug('MyCookieService getObject ex;', ex.message);
        return '';
      }
    };

    // 保存本地存储数据
    service.putLocalData = function(key, value) {
      $window.localStorage[key] = value;
    };

    // 保存本地存储数据
    service.removeLocalData = function(key) {
      delete $window.localStorage[key];
    };

    // 获取本地存储数据
    service.getLocalData = function(key) {
      return $window.localStorage[key] || '';
    };

    // 保存本地存储数据
    service.putLocalObject = function(key, value) {
      try {
        $window.localStorage[key] = JSON.stringify(value);
      } catch (ex) {
        $log.debug('MyCookieService putLocalObject ex;', ex.message);
      }
    };

    // 获取本地存储数据
    service.getLocalObject = function(key) {
      var value = $window.localStorage[key] || '';
      if (value === '') {
        // 没有数据就直接返回
        return value;
      }
      try {
        value = JSON.parse(value);
        return value;
      } catch (ex) {
        $log.debug('MyCookieService getLocalObject ex;', ex.message);
        return '';
      }
    };

    // 获取过期时间，参数是过期时间的毫秒数
    function getExpiresDate(expires) {
      var now = new Date().getTime();
      var expiresDate = new Date();
      expiresDate.setTime(now + expires);
      return expiresDate;
    }

    return service;
  }
})();
