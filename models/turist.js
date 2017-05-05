var mongoose = require("mongoose");

var TuristSimSchema = new mongoose.Schema({

  quantity: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("TuristSim", TuristSimSchema);