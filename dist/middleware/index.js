"use strict";

var middlewareObject = {};

middlewareObject.permissionChecker = function (req, res, next) {
  if (req.isAuthenticated() && req.user.permission === "Admin") {
    next();
  } else {
    res.redirect("back");
  }
};

middlewareObject.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
};

module.exports = middlewareObject;
//# sourceMappingURL=index.js.map