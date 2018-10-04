# angularjs初始化项目

## 全局配置初始化部分，只需要执行一次

- 项目依赖nodejs和nginx
  - [下载nodejs](https://nodejs.org/dist/v8.12.0/node-v8.12.0-x64.msi)
  - [下载nginx](http://nginx.org/download/nginx-1.14.0.zip)
- 控制台中执行`npm install -g cnpm --registry=https://registry.npm.taobao.org`全局安装cnpm并注册淘宝的npm源
- 控制台中执行`cnpm install -g gulp`全局安装gulp
- 控制台中执行`cnpm install`安装项目依赖

## 项目开发部分

- 路径修改
  - 修改`browser.js`中浏览器执行文件的路径
  - 修改`nginx-start.bat`中的nginx所在路径
  - 修改`nginx-stop.bat`中的nginx所在路径
  - 在nginx目录中创建temp和logs目录
- 第一次需要在控制台执行`gulp`初始化项目打包
- 开发模式
  - 控制台中执行`.\rundev.bat`启动nginx服务并进入开发模式
  - 控制台按`ctrl+C`后输入`y`中断开发模式，然后执行`.\nginx-stop.bat`停止nginx服务
