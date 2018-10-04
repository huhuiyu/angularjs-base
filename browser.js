const browser = '"C:\\Program Files (x86)\\UCBrowser\\Application\\UCBrowser.exe" http://127.0.0.1:15000';
var exec = require('child_process').exec;
exec(browser, function(error, std, err) {
  console.log(error, std, err);
});
