const staffSchema = require("../models/staffModel");
const studentSchema = require("../models/studentModel");
const courseSchema = require("../models/courseModel");
const academicSchema = require("../models/academicModel");
const attendanceSchema = require("../models/attendanceModel");
const registeredCourseSchema = require("../models/registeredCourseModel");

const registerStaff = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // validation
    switch (true) {
      case !fname:
        return res.status(400).send({
          success: false,
          message: "First name is mandatory!",
        });
      case !lname:
        return res.status(400).send({
          success: false,
          message: "Last name is mandatory!",
        });
      case !email:
        return res.status(400).send({
          success: false,
          message: "Email is mandatory!",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password is mandatory!",
        });
      default:
        break;
    }

    // ensuring uniqueness
    const staffExists = await staffSchema.find({ email });
    if (staffExists.length) {
      return res.status(400).send({
        success: false,
        message: `We already have an staff named ${
          staffExists[0].fname + " " + staffExists[0].lname
        } against this email.`,
      });
    }

    // registration
    const newStaff = new staffSchema({
      fname,
      lname,
      email,
      password,
    });
    const result = await newStaff.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Staff registered successfully!",
        data: newStaff,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while registering the staff.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while registering the staff.",
      error,
    });
  }
};

const getAllStaff = async (req, res) => {
  try {
    const staffs = await staffSchema.find();
    if (staffs.length) {
      res.status(200).send({
        success: true,
        message: "staffs fetched successfully!",
        count: staffs.length,
        data: staffs,
      });
    } else {
      res.status(204).send({
        success: true,
        message: "No staffs so far.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching the staffs.",
      error,
    });
  }
};

const getSingleStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await staffSchema.findById(id);
    if (staff) {
      res.status(200).send({
        success: true,
        message: "staff fetched successfully!",
        data: staff,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "staff not found.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching the staff.",
      error,
    });
  }
};

const loginStaff = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    switch (true) {
      case !email:
        return res.status(400).send({
          success: false,
          message: "Email is mandatory!",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password is mandatory!",
        });
      default:
        break;
    }

    const staff = await staffSchema.findOne({ email, password });
    if (staff) {
      res.status(200).send({
        success: true,
        message: "Login successfully!",
        data: staff,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Wrong credentials.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while loging in the staff.",
      error,
    });
  }
};

const editStaff = async (req, res) => {
  try {
    const id = req.params.id;
    const { fname, lname, email, password } = req.body;

    const staff = await staffSchema.findById(id);
    if (!staff) {
      res.status(404).send({
        success: false,
        message: "staff not found.",
      });
    }

    // validation
    switch (true) {
      case !fname:
        return res.status(400).send({
          success: false,
          message: "First name cannot be empty!",
        });
      case !lname:
        return res.status(400).send({
          success: false,
          message: "Last name cannot be empty!",
        });
      case !email:
        return res.status(400).send({
          success: false,
          message: "Email cannot be empty!",
        });
      case !password:
        return res.status(400).send({
          success: false,
          message: "Password cannot be empty!",
        });
      default:
        break;
    }

    // editing
    const editedStaff = await staffSchema.findByIdAndUpdate(
      id,
      {
        fname,
        lname,
        email,
        password,
      },
      { new: true }
    );
    if (editedStaff) {
      res.status(200).send({
        success: true,
        message: "staff's information edited successfully!",
        data: editedStaff,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while editing the staff.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while editing the staff.",
      error,
    });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const id = req.params.id;

    const staff = await staffSchema.findById(id);
    if (!staff) {
      res.status(404).send({
        success: false,
        message: "staff not found.",
      });
    }

    // deleting data in referenced documents (if needed...)
    // deleting
    const deletedStaff = await staffSchema.findByIdAndDelete(id);
    if (deletedStaff) {
      res.status(200).send({
        success: true,
        message: "staff deleted successfully!",
        data: deletedStaff,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while deleting the staff.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while deleting the staff.",
      error,
    });
  }
};

const postAcademics = async (req, res) => {
  try {
    const {
      examType,
      activityNumber,
      weightage,
      totalMarks,
      marks,
      staffId,
      courseId,
    } = req.body;

    // validation
    switch (true) {
      case !courseId:
        return res.status(400).send({
          success: false,
          message: "Course ID is mandatory!",
        });
      case !examType:
        return res.status(400).send({
          success: false,
          message: "Exam type is mandatory!",
        });
      case !activityNumber:
        return res.status(400).send({
          success: false,
          message: "Activity number is mandatory!",
        });
      case !weightage:
        return res.status(400).send({
          success: false,
          message: "Weightage is mandatory!",
        });
      case !totalMarks:
        return res.status(400).send({
          success: false,
          message: "Total marks is mandatory!",
        });
      case !marks.length:
        return res.status(400).send({
          success: false,
          message: "Marks array is mandatory!",
        });
      case !staffId:
        return res.status(400).send({
          success: false,
          message: "Staff ID is mandatory!",
        });
      default:
        break;
    }

    // validate obtained marks
    if (marks?.some((m) => m?.obtainedMarks > totalMarks)) {
      return res.status(400).send({
        success: false,
        message: "Obtained marks cannot be greater than total marks!",
      });
    }

    // validate record existence
    const recordExists = await academicSchema.findOne({
      examType,
      activityNumber,
      courseId,
      staffId,
    });
    if (recordExists) {
      return res.status(409).send({
        success: false,
        message: `You had already posted the record of '${examType} ${activityNumber}' of this course. Can't post again.`,
      });
    }

    // posting academic
    const newAcademic = new academicSchema({
      examType,
      activityNumber,
      weightage,
      totalMarks,
      marks,
      staffId,
      courseId,
    });
    const result = await newAcademic.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Academics posted successfully!",
        data: result,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while posting academics.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while posting academics.",
      error,
    });
  }
};

const editAcademics = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      examType,
      activityNumber,
      weightage,
      totalMarks,
      marks,
      staffId,
      courseId,
    } = req.body;

    // validation
    switch (true) {
      case !examType:
        return res.status(400).send({
          success: false,
          message: "Exam type is mandatory!",
        });
      case !weightage:
        return res.status(400).send({
          success: false,
          message: "Weightage is mandatory!",
        });
      case !totalMarks:
        return res.status(400).send({
          success: false,
          message: "Total marks is mandatory!",
        });
      case !marks.length:
        return res.status(400).send({
          success: false,
          message: "Marks array is mandatory!",
        });
      case !staffId:
        return res.status(400).send({
          success: false,
          message: "staff ID is mandatory!",
        });
      case !courseId:
        return res.status(400).send({
          success: false,
          message: "Course ID is mandatory!",
        });
      default:
        break;
    }

    // validate obtained marks
    if (marks?.some((m) => m?.obtainedMarks > totalMarks)) {
      return res.status(400).send({
        success: false,
        message: "Obtained marks cannot be greater than total marks!",
      });
    }

    // editing attendance
    const editMarks = await academicSchema.findByIdAndUpdate(
      id,
      {
        examType,
        activityNumber,
        weightage,
        totalMarks,
        marks,
        staffId,
        courseId,
      },
      { new: true }
    );

    if (editMarks) {
      res.status(200).send({
        success: true,
        message: "Marks edited successfully!",
        data: editMarks,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while editing the marks.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while editing the marks.",
      error,
    });
  }
};

const getAcademics = async (req, res) => {
  try {
    const { staffId, courseId, examType, activityNumber } = req.query;

    // validation
    switch (true) {
      case !staffId:
        return res.status(400).send({
          success: false,
          message: "staff ID is mandatory!",
        });
      case !courseId:
        return res.status(400).send({
          success: false,
          message: "Course ID is mandatory!",
        });
      case !examType:
        return res.status(400).send({
          success: false,
          message: "Exam type is mandatory!",
        });
      case !activityNumber:
        return res.status(400).send({
          success: false,
          message: "Activity number is mandatory!",
        });
      default:
        break;
    }

    const academics = await academicSchema.findOne({
      staffId,
      courseId,
      examType,
      activityNumber,
    });

    if (academics) {
      let marksWithStudentDetails = [];
      const registeredStudents = await registeredCourseSchema.find({
        staffId,
        courseId,
      });

      // adding marks for new comers students if any
      for (let i = 0; i < registeredStudents.length; i++) {
        const element = registeredStudents[i];
        if (!academics?.marks?.some((x) => x.studentId === element.studentId))
          academics?.marks?.push({
            obtainedMarks: 0,
            studentId: element.studentId,
            _id: element.studentId,
          });
      }

      for (let j = 0; j < academics?.marks.length; j++) {
        const marks = academics?.marks[j];

        // fetching student details
        const student = await studentSchema.findById(marks.studentId);
        if (student) {
          // preparing new object
          let marksObject = {
            ...marks._doc,
            ...student._doc,
          };

          // maintaining array
          marksWithStudentDetails.push(marksObject);
        }
      }
      const course = await courseSchema.findById(academics?.courseId);
      let academicDetail = {
        ...academics?._doc,
        marks: marksWithStudentDetails,
        course,
      };
      res.status(200).send({
        success: true,
        message: "Academics fetched successfully!",
        data: academicDetail,
      });
    } else {
      res.status(404).send({
        success: true,
        message: "Academics against these attributes not found.",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching academics.",
      error,
    });
  }
};

const postAttendance = async (req, res) => {
  try {
    const { date, attendance, staffId, courseId } = req.body;

    // validation
    switch (true) {
      case !date:
        return res.status(400).send({
          success: false,
          message: "Date is mandatory!",
        });
      case !attendance.length:
        return res.status(400).send({
          success: false,
          message: "Attendance array is mandatory!",
        });
      case !staffId:
        return res.status(400).send({
          success: false,
          message: "staff ID is mandatory!",
        });
      case !courseId:
        return res.status(400).send({
          success: false,
          message: "Course ID is mandatory!",
        });
      default:
        break;
    }

    // posting attendance
    const newAttendance = new attendanceSchema({
      date,
      attendance,
      staffId,
      courseId,
    });
    const result = await newAttendance.save();

    if (result) {
      res.status(200).send({
        success: true,
        message: "Attendance posted successfully!",
        data: result,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while posting attendance.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while posting attendance.",
      error,
    });
  }
};

const editAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const { date, attendance, staffId, courseId } = req.body;

    // validation
    switch (true) {
      case !date:
        return res.status(400).send({
          success: false,
          message: "Date is mandatory!",
        });
      case !attendance.length:
        return res.status(400).send({
          success: false,
          message: "Attendance array is mandatory!",
        });
      case !staffId:
        return res.status(400).send({
          success: false,
          message: "staff ID is mandatory!",
        });
      case !courseId:
        return res.status(400).send({
          success: false,
          message: "Course ID is mandatory!",
        });
      default:
        break;
    }

    // editing attendance
    const editAttendance = await attendanceSchema.findByIdAndUpdate(
      id,
      {
        date,
        attendance,
        staffId,
        courseId,
      },
      { new: true }
    );

    if (editAttendance) {
      res.status(200).send({
        success: true,
        message: "Attendance edited successfully!",
        data: editAttendance,
      });
    } else {
      res.status(500).send({
        success: false,
        message: "Something went wrong while editing the attendance.",
        error,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while editing the attendance.",
      error,
    });
  }
};

const getAttendances = async (req, res) => {
  try {
    const { staffId, courseId, date } = req.query;
    const attendances = await attendanceSchema.find({
      staffId,
      courseId,
      date,
    });

    if (attendances.length) {
      let attendanceDetails = [];

      const registeredStudents = await registeredCourseSchema.find({
        staffId,
        courseId,
      });

      for (let i = 0; i < attendances.length; i++) {
        const element = attendances[i];
        let attendanceWithStudentDetails = [];

        // adding attendance for new comers students if any
        for (let j = 0; j < registeredStudents.length; j++) {
          const e = registeredStudents[j];
          if (!element?.attendance?.some((x) => x.studentId === e.studentId))
            element?.attendance?.push({
              studentId: e.studentId,
              status: "N/A",
              _id: e.studentId,
            });
        }

        for (let j = 0; j < element.attendance.length; j++) {
          const attendance = element.attendance[j];

          // fetching student details
          const student = await studentSchema.findById(attendance.studentId);

          if (student) {
            // preparing new object
            let attendanceObject = {
              ...attendance._doc,
              ...student._doc,
            };

            // maintaining array
            attendanceWithStudentDetails.push(attendanceObject);
          }
        }
        const course = await courseSchema.findById(element.courseId);
        let attendanceDetail = {
          ...element._doc,
          attendance: attendanceWithStudentDetails,
          course,
        };
        attendanceDetails.push(attendanceDetail);
      }
      res.status(200).send({
        success: true,
        message: "Attendances fetched successfully!",
        count: attendances.length,
        data: attendanceDetails,
      });
    } else {
      res.status(404).send({
        success: true,
        message: "Attendances against this staff not found.",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong while fetching attendances.",
      error,
    });
  }
};

module.exports = {
  registerStaff,
  getAllStaff,
  getSingleStaff,
  loginStaff,
  editStaff,
  deleteStaff,
  postAcademics,
  editAcademics,
  getAcademics,
  postAttendance,
  editAttendance,
  getAttendances,
};
