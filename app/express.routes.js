var url     = require('url');
var express = require('express');
var sharp   = require('sharp');
var fs      = require('fs');
var User    = require('../models/user');



var root = __dirname.replace('app', '');

var setup = function(app, passport) {

  app.get('/assets/css/*.jpg', function(req, res) {

    var urlParsed = url.parse(req.url, true);
    if(urlParsed.query && urlParsed.query.scale && urlParsed.query.scaleY) {


      console.log("scaleY");
      var factor = 100 / (parseInt(urlParsed.query.scale));
      var factorY = 100 / (parseInt(urlParsed.query.scaleY));
      var image = sharp('.' + urlParsed.pathname);
      image
        .metadata()
        .then(function(metadata) {
          return image
            .resize(Math.round(metadata.width / factor), Math.round(metadata.height / factorY))
            .webp()
            .toBuffer();
        })
        .then(function(data) {
          // data contains a WebP image half the width and height of the original JPEG
          res.write(data);
          res.end();
        });
    } else if(urlParsed.query && urlParsed.query.scale) {

      var factor = 100 / parseInt(urlParsed.query.scale);
      var image = sharp('.' + urlParsed.pathname);
      image
        .metadata()
        .then(function(metadata) {
          return image
            .resize(Math.round(metadata.width / factor))
            .webp()
            .toBuffer();
        })
        .then(function(data) {
          // data contains a WebP image half the width and height of the original JPEG
          res.write(data);
          res.end();
        });
    } else {
      fs.readFile('./' + req.url, function(err, data) {
        if(err) throw err;
        res.write(data);
        res.end();
      });
    }
    
  });

  console.log("r ==> " + root);
  app.get('/casse-tete/*', isLoggedIn, function(req, res) {
    console.log(root + '/index.html');
    res.sendFile(root + '/index.html');
  });
  
  app.use(express.static(root)); 


  /* LOGIN */
  app.get('/login', function(req, res, next) {

    var urlParsed = url.parse(req.url, true);
    if(urlParsed.query.modeinvite) {
      var newUser            = new User();                                          
      newUser.local.email    = 'noemail';
      newUser.local.password = newUser.generateHash('noemail');                      

      passport.authenticate('local-login', function(err, user, info) {
        req.logIn(newUser, function(err) {
            newUser.save(function(err) {
              if(err) {
                throw err;
              }
              if(urlParsed.query.callback) {
                return res.redirect(urlParsed.query.callback);
              } else {
                return res.redirect('/');
              }
            });
        });
      })(req, res, next);
    } else {
      res.render('login.ejs', { message: req.flash('loginMessage') });
    }
  });

  app.post('/login', function(req, res, next) {
   
    passport.authenticate('local-login', function(err, user, info) {


      if(err) { return next(err); }

      if(!user) { res.redirect('/login'); }

      req.logIn(user, function(err) {

        if(err) { return next(err); }
        var urlParsed = url.parse(req.url, true);

        if(urlParsed.query.callback) {
          return res.redirect(urlParsed.query.callback);
        } else {
          return res.redirect('/');
        }
      });
    })(req, res, next);  
  });

  app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/', 
      failureRedirect : '/signup', 
      failureFlash : true 
  }));

  app.get('/connect/local', function(req, res) {
      res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/connect/local', passport.authenticate('local-signup', {
      successRedirect : '/profile', 
      failureRedirect : '/connect/local', 
      failureFlash : true 
  }));

  app.get('/unlink/local', isLoggedIn, function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  app.get('/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
          user : req.user
      });
  });

  
  app.use(isLoggedIn); 

};

function isLoggedIn(req, res, next) {

    console.log(req.url);
    if (req.isAuthenticated() || req.url === '/login' || req.url === '/signup' || req.url === '/' || req.url === '/?modeinvite=true')
        return next();

    var callback = null;
    if(req.url !== '/login' && req.url !== '/signup') {
      callback = req.url;
    }
    if(callback) {
      res.redirect('/login?callback=' + callback);
    } else {
      res.redirect('/login');
    }
}

module.exports = setup;
