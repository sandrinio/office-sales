"use strict";

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

  username: { type: String, required: true },
  fullname: { type: String, required: true },
  password: String,
  permission: { type: String, required: true },
  regDate: { type: Date, default: Date.now },
  myData: []
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
//# sourceMappingURL=user.js.map