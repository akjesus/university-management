const express = require("express");
const {
  registerStaff,
  getAllStaff,
  getSingleStaff,
  getAcademics,
  postAcademics,
  postAttendance,
  getAttendances,
  editStaff,
  deleteStaff,
  loginStaff,
  editAttendance,
  editAcademics,
} = require("../controllers/StaffController");

const router = express.Router();

router.post("/register", registerStaff);
router.get("/getAll", getAllStaff);
router.get("/get/:id", getSingleStaff);
router.post("/login", loginStaff);
router.put("/edit/:id", editStaff);
router.delete("/delete/:id", deleteStaff);

router.post("/postAcademics", postAcademics);
router.put("/editAcademics/:id", editAcademics);
router.get("/getAcademics", getAcademics);

router.post("/postAttendance", postAttendance);
router.put("/editAttendance/:id", editAttendance);
router.get("/getAttendances", getAttendances);

module.exports = router;