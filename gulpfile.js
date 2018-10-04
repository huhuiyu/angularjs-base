const gulp = require('gulp');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const mincss = require('gulp-clean-css');
const del = require('del');
const sync = require('gulp-file-sync');
const watch = require('gulp-watch');

const baseDir = __dirname.replace(/[\\]/g, '/') + '/'; //应用程序根目录
const srcDir = baseDir + 'src/'; //源代码目录
const distDir = baseDir + 'dist/'; //目标目录
const modulesDir = baseDir + 'node_modules/'; //node模块目录

const appJsDir = srcDir + 'js/'; //项目js目录
const appCssDir = srcDir + 'css/'; //项目css目录
const appHtmlDir = srcDir + 'html/'; //项目html目录
const appHtmlTempDir = appHtmlDir + 'templates/'; //项目html的templates目录
const imagesDir = srcDir + 'images/'; //项目图片目录

const distHtmlTempDir = distDir + 'templates/'; //目标html的templates目录
const distJsDir = distDir + 'js/'; //目标js目录
const distCssDir = distDir + 'css/'; //目标css目录
const distFontsDir = distDir + 'fonts/'; //目标字体目录
const distImagessDir = distDir + 'images/'; //目标图片目录

var includeTest = true; //是否包含test目录

/*清理发布*/
gulp.task('clear', function() {
  del.sync([distDir + '**/*'], {
    force: true
  });
});

/*项目lib文件打包======================================================================*/
/*js第三方库打包*/
gulp.task('jslib', function() {
  var libs = [];
  libs.push(modulesDir + 'jquery/dist/jquery.min.js');
  libs.push(modulesDir + 'bootstrap3/dist/js/bootstrap.min.js');
  libs.push(modulesDir + 'angular/angular.min.js');
  libs.push(modulesDir + 'angular-route/angular-route.min.js');
  libs.push(modulesDir + 'angular-sanitize/angular-sanitize.min.js');
  libs.push(modulesDir + 'angular-animate/angular-animate.min.js');
  libs.push(modulesDir + 'angular-cookies/angular-cookies.min.js');
  libs.push(modulesDir + 'angular-messages/angular-messages.min.js');

  return gulp
    .src(libs)
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest(distJsDir));
});

/*css第三方库*/
gulp.task('csslib', function() {
  var libs = [];
  libs.push(modulesDir + 'bootstrap3/dist/css/bootstrap.min.css');
  return gulp
    .src(libs)
    .pipe(concat('lib.min.css'))
    .pipe(gulp.dest(distCssDir));
});

/*字体文件*/
gulp.task('fonts', function() {
  //gulp-file-sync插件是同步文件
  sync(modulesDir + 'bootstrap3/dist/fonts/', distFontsDir);
});

gulp.task('lib', ['jslib', 'csslib', 'fonts'], function() {
  console.log('处理第三库依赖');
});

/*项目相关文件处理======================================================================*/
/*图片文件处理*/
gulp.task('images', function() {
  sync(imagesDir, distImagessDir);
  if (!includeTest) {
    del.sync(distImagessDir + 'test/');
  }
});

/*项目html文件*/
gulp.task('html', function() {
  sync(appHtmlTempDir, distHtmlTempDir);
  gulp.src([appHtmlDir + 'index.html']).pipe(gulp.dest(distDir));
  if (!includeTest) {
    del.sync(distHtmlTempDir + 'test/');
  }
});

/*项目js文件*/
gulp.task('js', function() {
  var jsfiles = [];
  jsfiles.push(appJsDir + 'config.js');
  jsfiles.push(appJsDir + 'services/**/*.js');
  jsfiles.push(appJsDir + 'directives/**/*.js');
  jsfiles.push(appJsDir + 'controllers/**/*.js');
  if (includeTest) {
    jsfiles.push(appJsDir + 'test/**/*.js');
  }
  jsfiles.push(appJsDir + 'startup.js');

  return gulp
    .src(jsfiles)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest(distJsDir));
});

/*项目css打包*/
gulp.task('css', function() {
  var cssfiles = [];
  cssfiles.push(appCssDir + 'common.css');
  cssfiles.push(appCssDir + '**/*.css');
  if (!includeTest) {
    cssfiles.push('!' + appCssDir + 'test/*.css');
  }

  return gulp
    .src(cssfiles)
    .pipe(plumber())
    .pipe(concat('app.min.css'))
    .pipe(mincss())
    .pipe(plumber.stop())
    .pipe(gulp.dest(distCssDir));
});

gulp.task('dev', ['images', 'html', 'js', 'css'], function() {
  console.log('处理开发任务');
});

gulp.task('exclude-test', function() {
  includeTest = false;
});

/*默认打包任务*/
gulp.task('default', ['exclude-test', 'clear', 'lib', 'dev'], function() {
  console.log('打包任务完成');
});

/*开发watch任务*/
gulp.task('watch', ['dev'], function() {
  watch([appJsDir + '**/*.js'], function() {
    gulp.start('js');
  });

  watch([appCssDir + '**/*.css'], function() {
    gulp.start('css');
  });

  watch([appHtmlDir + '**/*.html'], function() {
    gulp.start('html');
  });

  watch([imagesDir + '**/*'], function() {
    gulp.start('images');
  });
});

gulp.task('test', function() {});
