const express = require("express");
const {   getFaculties,
  createFaculty,
  getDepartments,
  createDepartment} = require("../controllers/schoolController");

  const router = express.Router();
  
  router.get("/faculties", getFaculties);
  router.get("/departments", getDepartments);
  router.post("/faculties", createFaculty);
  router.post("/departments", createDepartment);
  
  module.exports = router;