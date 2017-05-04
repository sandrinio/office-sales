var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require("passport");


router.get('/', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register', function (req, res) {
    var userInfo = req.body.user;
    User.register(userInfo, req.body.password, function (err, user) {
      if(err){
        res.send(err)
      }else{
        res.redirect('/home')
      }
    })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/"
}), function (req, res) {
  res.redirect("/");
});

router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged Out");
  res.redirect("/");
});
  
  module.exports = router;