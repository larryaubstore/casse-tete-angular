var express = require('express');
var app     = express();

console.log(__dirname);
app.use(express.static(__dirname + '/'));


app.get('/casse-tete/*', function(req, res) {
  console.log(__dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
});
//app.use(require('express-spa-router')(app));
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening port " + port + " ...");
