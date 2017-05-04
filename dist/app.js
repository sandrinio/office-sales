"use strict";

var express = require("express");
var app = express();

app.set('port', process.env.PORT || 3000);

var mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    session = require("express-session"),
    methodOverride = require("method-override"),
    User = require("./models/user");

var landingRoutes = require('./routes/landing'),
    authRoutes = require("./routes/auth");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(landingRoutes);
app.use(authRoutes);

mongoose.Promise = global.Promise;
var url = process.env.DATABASEURL || 'mongodb://sandsula:pachuchi123@ds029381.mlab.com:29381/data_counter';
mongoose.connect(url);
// mongoose.connect("mongodb://localhost/gsm_guru");

/* ============================            ============================ */
//ეს ყოველთვის უცვლელია და არის ბოლოში

app.listen(app.get('port'), process.env.IP, function () {
    //if server is on
    console.log("======STARTED======");
});
//# sourceMappingURL=app.js.map