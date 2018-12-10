/**
 * 时间服务
 */
(function() {
  var app = angular.module(MyAppConfig.services);

  app.factory('DateTimeService', ['$log', DateTimeService]);

  function DateTimeService($log) {
    $log.info('DateTimeService init...');
    var weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    var service = {};

    /**
     * 格式化日期函数
     * @param {*} timestamp 时间戳
     * @param {*} format 格式 y年M月d日h小时m分钟s秒w周
     */
    service.formatDate = function(timestamp, format) {
      var date = new Date();
      if (timestamp) {
        date.setTime(timestamp);
      }
      if (!format) {
        // 默认格式
        format = 'y-M-d h:m:s';
      }
      var year = date.getFullYear() + '';
      var month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      var day = date.getDate();
      day = day < 10 ? '0' + day : day;
      var hour = date.getHours();
      hour = hour < 10 ? '0' + hour : hour + '';
      var minute = date.getMinutes();
      minute = minute < 10 ? '0' + minute : minute + '';
      var seconds = date.getSeconds();
      seconds = seconds < 10 ? '0' + seconds : seconds + '';
      var result = format.replace('y', year);
      result = result.replace('M', month);
      result = result.replace('d', day);
      result = result.replace('h', hour);
      result = result.replace('m', minute);
      result = result.replace('s', seconds);
      result = result.replace('w', weekNames[date.getDay()]);
      return result;
    };

    return service;
  }
})();
