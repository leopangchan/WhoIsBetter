//Authentication
var express = require("express");
var watson = require('watson-developer-cloud');
var fs = require('fs');
var HashMap = require('hashmap');
var async = require('async');
var jsonfile = require('jsonfile')
var router = express.Router({caseSensitive: true});// Create a instance of a mini application.

router.baseURL = "/watson"

var map1 = new HashMap();
var map2 = new HashMap();
var asyncTasks = [];

var visual_recognition = watson.visual_recognition({
  api_key: 'ad02145e5c374d4c8b8006527e43289966e67a64',
  version: 'v3',
  version_date: '2016-05-20'
});

var params = {
  //images_file: fs.createReadStream("./ImagesSetOne/ski.jpg")
  url : ""
};
// read the txt file line by line
function readLines(input, map, func) {
  var remaining = '';
  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
	  console.log("LINE: " + line);
      func(line, map);

      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining, map);
    }
  });
}

function func(data, map) {
  console.log('Line: ' + data);
  params.url = data;
  visual_recognition.classify(params, function(err, res) {
    if (err)
      console.log(err);
    else{
      // var test = JSON.stringify(res, null, 2);
      console.log("Check this bug" + JSON.stringify(res));
      var obj = res.images[0].classifiers[0].classes;
      var value = 1;
      for(var i = 0; i < obj.length; i++) {
        var key = JSON.stringify(obj[i].class, null, 2);
        var value = JSON.stringify(obj[i].score, null, 2);
        if(map.get(key) >= 0)
          value = parseInt(value) + parseInt(map.get(key));
        console.log(key + " " + value);
        // map.get(key);
        map.set(key, value);
      }
    }
  });
}

function mainFunc(){
  async.series([
    function(callback){
      var input1 = fs.createReadStream('C:/Users/yiupang/Documents/GitHub/SBHACKS/WhoIsBetter/PythonRouter/ImageSetOne');
      readLines(input1, map1, func);
      callback(null);
    },
    function(callback){
      var file1 = './data1.json'
      jsonfile.writeFile(file1, map1, {spaces: 2}, function(err) {
        console.error(err);
      });
      callback(null);
    },
    function(callback){
      var input2 = fs.createReadStream('C:/Users/yiupang/Documents/GitHub/SBHACKS/WhoIsBetter/PythonRouter/ImageSetTwo');
      readLines(input2, map2, func);
      callback(null);
    },
    function(callback){
      var file2 = './data2.json'

      jsonfile.writeFile(file2, map2, {spaces: 2}, function(err) {
        console.error(err);
      });
      callback(null);
	  console.log("PRINTING HashMap");
      map1.forEach(function(value, key) {
         console.log(key + " : " + value);
      });
      map2.forEach(function(value, key) {
         console.log(key + " : " + value);
      });
      return [map1,map2];
    }
  ]);
}

router.get("/", function(req, res){
  var map = mainFunc();
  res.send(map);
});

module.exports = router;
// map1.forEach(function(value, key) {
//     console.log(key + " : " + value);
// });
// var json2 = JSON.stringify(map2);
// var file2 = './ImagesSetTwo/data2.json'
// jsonfile.writeFile(file2, json2)


//

//
//
