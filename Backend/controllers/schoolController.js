const departmentSchema = require("../models/departmentModel");
const facultySchema = require("../models/facultyModel");


const getFaculties = async (req, res) => {
  try {
    const faculties = await facultySchema.find();
    if (faculties.length) {
      res.status(200).send({
        success: true,
        message: "Faculties fetched successfully!",
        count: faculties.length,
        data: faculties,
      });
    } else {
      res.status(404).send({
        success: true,
        message: 'No faculties so far.',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while fetching the faculties.',
      error,
    });
  }
};

const createFaculty = async (req, res) => {
  try {
    const {  name, code } = req.body;

    // registration
    const newFaculty = new facultySchema({
      name,
      code
    });
    const result = await newFaculty.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Faculty created successfully!",
        data: newFaculty,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while creating the Faculty.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while creating the Faculty.",
      error,
    });
  }
};


const createDepartment = async (req, res) => {
  try {
    const {  name, code, faculty } = req.body;

    // registration
    const newDepartment = new departmentSchema({
      name,
      code,
      faculty
    });
    const result = await newDepartment.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Department created successfully!",
        data: newDepartment,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while creating the Department.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while creating the Department.",
      error,
    });
  }
};
const getDepartments = async (req, res) => {
  try {
    const departments = await departmentSchema.find();
    if (departments.length) {
      res.status(200).send({
        success: true,
        message: 'Department fetched successfully!',
        count: departments.length,
        data: departments,
      });
    } else {
      res.status(404).send({
        success: true,
        message: 'No departments so far.',
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong while fetching the departments.',
      error,
    });
  }
};


module.exports = {
  getFaculties,
  createFaculty,
  getDepartments,
  createDepartment
};
