const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String, // ISO string like '2025-06-20' 
    required: true,
  },
}, {
  timestamps: true // automatically adds createdAt & updatedAt ;-)
});

module.exports = mongoose.model("Event", eventSchema);
