//Authentication
var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  api_key: '4bcaf7ff9e5b1edc09f79cd57f54516b7c36caee',
  version: 'v3',
  version_date: '2016-05-20'
});

var params = {
  //images_file: fs.createReadStream("./ImagesSetOne/ski.jpg")
  url : ""
};
// read the txt file line by line
function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  console.log('Line: ' + data);
  params.url = data;
  visual_recognition.classify(params, function(err, res) {
    if (err)
      console.log(err);
    else
      console.log(JSON.stringify(res, null, 2));
  });

}

var input = fs.createReadStream('./ImagesSetOne/ImagesetOne.txt');
readLines(input, func);
//

//
//
