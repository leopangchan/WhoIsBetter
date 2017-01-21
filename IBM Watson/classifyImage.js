//Authentication
var watson = require('watson-developer-cloud');
var fs = require('fs');

var visual_recognition = watson.visual_recognition({
  api_key: '4bcaf7ff9e5b1edc09f79cd57f54516b7c36caee',
  version: 'v3',
  version_date: '2016-05-20'
});

var params = {
  images_file: fs.createReadStream("./ImagesSetOne/ski.jpg")
};

visual_recognition.classify(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});
