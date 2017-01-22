var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router({caseSensitive: true});
// Server static files, such as html and css.
app.use(express.static(path.join(__dirname , "/public")));
var pyInterface = require("./PythonRouter/pyRouter.js");

var port = Number(process.env.PORT || 3000);
app.use("/py", pyInterface);

var server = app.listen(port, function(){
  var port = server.address().port;
  //execPythonScript();
  console.log("The App is listening from port: " + port);
});
//"python ./IBM Watson/ImageCrawler/main.py leopangchan ."
