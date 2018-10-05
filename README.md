# angularjs 初始化项目

## 全局配置初始化部分，只需要执行一次

- 项目依赖 nodejs 和 nginx
  - [下载 nodejs](https://nodejs.org/dist/v8.12.0/node-v8.12.0-x64.msi)
  - [下载 nginx](http://nginx.org/download/nginx-1.14.0.zip)
- 控制台中执行`npm install -g cnpm --registry=https://registry.npm.taobao.org`全局安装 cnpm 并注册淘宝的 npm 源
- 控制台中执行`cnpm install -g gulp`全局安装 gulp
- 控制台中执行`cnpm install`安装项目依赖
- [package.json](package.json)是项目依赖配置文件

## 项目开发部分

- 脚本文件说明
  - [nginx-start.bat](nginx-start.bat)是 nginx 服务启动脚本
  - [nginx-stop.bat](nginx-stop.bat)是 nginx 服务关闭脚本
  - [browser.js](browser.js)是浏览器启动的 nodejs 指令
  - [browser.bat](browser.bat)是浏览器启动脚本
  - [gulpfile.js](gulpfile.js)是开发相关的 gulp 配置指令
  - [dev.bat](dev.bat)是启动项目开发文件检测和打包脚本
  - [rundev.bat](rundev.bat)是按照次序启动 nginx-start.bat,browser.bat,dev.bat
- 路径修改
  - 修改[browser.js](browser.js)中浏览器执行文件的路径
  - 修改[nginx-start.bat](nginx-start.bat)中的 nginx 所在路径
  - 修改[nginx-stop.bat](nginx-stop.bat)中的 nginx 所在路径
  - 在 nginx 目录中创建 temp 和 logs 目录
- 第一次需要在控制台执行`gulp`初始化项目打包
- 开发模式
  - 控制台中执行`.\rundev.bat`启动 nginx 服务并进入开发模式
  - 控制台按`ctrl+C`后输入`y`中断开发模式，然后执行`.\nginx-stop.bat`停止 nginx 服务
  - 如果开发模式因为其它原因中断只需要在控制台中执行`.\dev.bat`即可重新开启
  - 如果浏览器关闭了在控制台中执行`.\browser.bat`即可重新开启
  - 如果nginx服务关闭了在控制台中执行`.\nginx-start.bat`即可重新开启

