const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: ["https://crm-education.vercel.app", "http://localhost:3000", "https://www.highhopestutoring.com.au"],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb+srv://ujjwaltwitx:ujjwal288719@cluster0.efu4ewb.mongodb.net/student_manager?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use("/admin", require("./routes/admin.js"));
app.use("/student", require("./routes/student.js"));
app.use("/site", require("./routes/site.js"));
app.use("/appointment", require("./routes/appointment.js"))
app.use("/group", require("./routes/group.js"))
app.use("/tutor", require("./routes/tutor.js"))

app.get("/", (req, res) => {
  res.send("How are you all");
});
app.listen(4000);
