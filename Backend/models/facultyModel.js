const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("faculties", facultySchema);
