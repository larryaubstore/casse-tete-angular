var express = require('express');
var app     = express();

app.use(express.static(__dirname + '/build'));


app.get('/casse-tete/*', function(req, res) {
  res.sendFile(__dirname+'/build/index.html');
});
//app.use(require('express-spa-router')(app));
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening port " + port + " ...");
