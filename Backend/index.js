const express = require("express");
const app = express();
const cors = require("cors");
const adminRoute = require("./routes/adminRoute");
const courseRoute = require("./routes/courseRoute");
const instructorRoute = require("./routes/instructorRoute");
const studentRoute = require("./routes/studentRoute");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT;

require("./database/config");
// middlewares
app.use(express.json());
app.use(cors());

// APIs
app.use("/v1/api/admin", adminRoute);
app.use("/v1/api/course", courseRoute);
app.use("/v1/api/instructor", instructorRoute);
app.use("/v1/api/student", studentRoute);

// server status
app.get("/v1/api/", (req, res) => {
  res.status(200).send({ success: true, message: "MU ERP Server is active!" });
});
app.all("*", (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  res.status(404).json({
    code: 404,
    status: "Not found",
    message: `Can not find ${fullUrl} on this server`,
  });
});
// listening
app.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT}.`);
});
