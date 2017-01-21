var express = require("express");
var path = require('path');
var exec = require('exec');
var app = express();
// Server static files, such as html and css.
app.use(express.static(path.join(__dirname , "/public")));

var port = Number(process.env.PORT || 3000);

var execPythonScript = function()
{
  exec(["python ./IBM\ Watson/ImageCrawler/main.py leopangchan ."], function(err, out, code) {
    if (err instanceof Error)
      throw err;
    console.log("fff");
    process.stderr.write(err);
    process.stdout.write(out);
    process.exit(code);
  });
}

var server = app.listen(port, function(){
  var port = server.address().port;
  execPythonScript();
  console.log("The App is listening from port: " + port);
});
//"python ./IBM Watson/ImageCrawler/main.py leopangchan ."
