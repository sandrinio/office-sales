var mongoose = require("mongoose");

var EvoSchema = new mongoose.Schema({

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    fullname: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  num: String,
  comment: String,
  pack: String
});

module.exports = mongoose.model("Evo", EvoSchema);