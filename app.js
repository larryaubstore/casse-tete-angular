var express = require('express');
var app     = express();
var config  = require('config');
var fs      = require('fs');
var url     = require('url');
var sharp   = require('sharp');


console.log(__dirname);

app.get('/assets/css/*.jpg', function(req, res) {

  var urlParsed = url.parse(req.url, true);

  if(urlParsed.query && urlParsed.query.scale) {

    var image = sharp('.' + urlParsed.pathname);
    image
      .metadata()
      .then(function(metadata) {
        return image
          .resize(Math.round(metadata.width / 2))
          .webp()
          .toBuffer();
      })
      .then(function(data) {
        // data contains a WebP image half the width and height of the original JPEG
        res.write(data);
        res.end();
      });
  } else {
    fs.readFile('./assets/css/vallon.jpg', function(err, data) {
      if(err) throw err;
      res.write(data);
      res.end();
    });
  }
  
});
app.use(express.static(__dirname + '/'));

if(process.env.FLICKR_KEY && process.env.FLICKR_PASS) {
  console.log("flickr_key  ==> " + process.env.FLICKR_KEY);
  console.log("flickr_pass ==> " + process.env.FLICKR_PASS);
} else {
  console.log("flickr_key  ==> " + config.get("flickr.FLICKR_KEY"));
  console.log("flickr_pass ==> " + config.get("flickr.FLICKR_PASS"));
}



app.get('/casse-tete/*', function(req, res) {
  console.log(__dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
});
//app.use(require('express-spa-router')(app));
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening port " + port + " ...");
