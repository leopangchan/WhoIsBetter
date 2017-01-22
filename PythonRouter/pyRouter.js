var express = require("express");
var exec = require('exec');
var router = express.Router({caseSensitive: true});// Create a instance of a mini application.

router.baseURL = "/py"

var execPythonScript = function(account, fileDir)
{
   exec(["python", "./PythonRouter/ImageCrawler/main.py", account, fileDir], function(err, out, code) {
    if (err instanceof Error)
      throw err;
    process.stderr.write(err);
    process.stdout.write(out);
    process.exit(code);
  });
}

router.get("/", function(req, res){
  //var body = body;
  //console.log("I'm in get in pyRouter.js" + JSON.stringify(req));
  execPythonScript(req.query.account, req.query.fileDir);
});

module.exports = router;
