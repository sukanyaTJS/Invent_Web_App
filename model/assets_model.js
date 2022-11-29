const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive:{
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: "Unassigned",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  history: {
    type: Array,
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model("assets", schema);
