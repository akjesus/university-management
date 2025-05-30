const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: String,
      trim: true,
      required: true,
    },
    faculty: {
      type: String,
      ref: "faculties",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("departments", departmentSchema);
