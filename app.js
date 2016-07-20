var express = require('express');
var app     = express();
var config  = require('config');


console.log(__dirname);
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
