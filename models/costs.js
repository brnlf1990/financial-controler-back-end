const mongoose = require("mongoose");

const costSchema = new mongoose.Schema({
  date: {
    type: Date,
    minlenght: 2,
    maxlenght: 30,
  },
  description: {
    type: String,
    minlenght: 2,
    maxlenght: 30,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "_id",
    required: true,
  },
});

module.exports = mongoose.model("costs", costSchema);
