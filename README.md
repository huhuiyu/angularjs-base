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
  - 如果 nginx 服务关闭了在控制台中执行`.\nginx-start.bat`即可重新开启

## 项目开发说明

- 开发目录说明
  - [src](src)是源代码目录
    - [html](src/html)是项目 html 文件目录
      - [templates](src/html/templates)是项目 html 模板目录
    - [css](src/css)是项目 css 文件目录
    - [js](src/js)是项目 js 文件目录
    - [images](src/images)是项目媒体文件目录
    - css,js,images,templates 中的 test 目录都不会出现在项目发布目录里面，仅限于开发测试中临时使用
  - [nginx](nginx)是 nginx 配置目录
  - [node_modules](node_modules)是 nodejs 的模块目录(被 git 忽略)
  - [dist](dist)是项目打包后的目录，也是 nginx 的 web 根目录(被 git 忽略)
- 开发步骤说明
  - 第一步：在[templates](src/html/templates)中创建 html 文件
  - 第二步：html 中的顶级元素为 div，指定控制器名称来绑定 js 文件，命名规则为目录名称+控制器名称+Ctrl.js(使用驼峰表达式)，控制器 js 目录为[src/js/controllers](src/js/controllers)
  - 第三步：html 中的顶级元素指定 class 名称限定 css 作用域，命名规则为目录名称-页面名称,全部小写
  - 示例：templates 中创建 user 目录，里面创建 index.html，那么需要控制器 js 目录里面创建 user 目录，里面创建 IndexCtrl.js，控制器名称为 UserIndexCtrl。css 文件夹中创建 user 目录，里面创建 index.css，限定 css 类名为 user-index
  - test 相关文件都要放置在对应的 test 目录中
  - 项目打包会将所有 html 按照目录结构放到 dist 根目录，所有 js 文件会合并成 app.min.js 放置到 dist/js 目录，所有 css 文件会合并成 app.min.css 放置到 dist/js 目录，images 目录会同步到 dist 目录中
