const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    creditHours: {
      type: Number,
    },
    type: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
      ref: "faculties",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", courseSchema);
