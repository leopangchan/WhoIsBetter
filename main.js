var express = require("express");
var path = require('path');
var app = express();
// Server static files, such as html and css.
app.use(express.static(path.join(__dirname , "/public")));

var port = Number(process.env.PORT || 3000);

var server = app.listen(port, function(){
  var port = server.address().port;
  console.log("The App is listening from port: " + port);
});
