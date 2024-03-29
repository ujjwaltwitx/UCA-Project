const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");

const StudentModel = require("../models/student.js");
const AppointmentModel = require("../models/appointment.js");
const authenticateRequest = require("../utils.js");

const countPerPage = 15;

//  APIs from here are meant for CRUD on students
router.get("/list", authenticateRequest, async (req, res) => {
  try {
    const page = req.query.p || 0;
    const studentList = await StudentModel.find()
      .skip(page * countPerPage)
      .limit(countPerPage).populate("contactDetail");
    res.json(studentList);
  } catch (error) {
    res.status = 500;
    res.send(error);
  }
});

router.get("/single", authenticateRequest, async (req, res) => {
  try {
    const id = req.query.id;
    const student = await StudentModel.findById(id);
    res.json(student);
  } catch (error) { }
});


router.get("/search", authenticateRequest, async (req, res) => {
  try {
    var filter = {}
    const firstName = req.query.firstName
    const lastName = req.query.lastName;
    if (firstName != null) {
      filter.firstName = { $regex: firstName, $options : 'i' }
    }
    if (lastName != null) {
      filter.lastName = { $regex: lastName , $options : 'i' }
    }
    const student = await StudentModel.find(filter, { firstName: 1, lastName: 1, "addressDetail.parentsEmail": 1 })
    res.json(student);
  }
  catch (error) {
    res.send("no data found").statusCode = 500;
  }
});

router.get("/misc", authenticateRequest, async (req, res) => {
  const active = await StudentModel.find({
    status: "Active",
    approved: true,
  }).count();
  const inactive = await StudentModel.find({
    status: "Inactive",
    approved: true,
  }).count();
  const pending = await StudentModel.find({
    status: "Pending",
    approved: false,
  }).count();
  const onlinePayment = await StudentModel.find({
    approved: true,
    "tutoringDetail.paymentMethod": "online",
  }).count();
  const offlinePayment = await StudentModel.find({
    approved: true,
    "tutoringDetail.paymentMethod": "offline",
  }).count();
  const dayWiseCount = await StudentModel.aggregate([
    {
      $match: {
        approved: true,
      },
    },
    {
      $unwind: "$tutoringDetail.days",
    },
    {
      $group: {
        _id: "$tutoringDetail.days",
        count: { $sum: 1 },
      },
    },
  ]);
  const data = {
    active,
    inactive,
    pending,
    onlinePayment,
    offlinePayment,
    dayWiseCount,
  };
  res.json(data);
});

router.put("/:id", authenticateRequest, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const student = await StudentModel.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    var keyList = Object.keys(updates);
    for (var key in keyList) {
      var data = keyList[key];
      student[data] = updates[data];
    }
    await student.save();
    res.status(200).json({ message: "Update successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/save", authenticateRequest, async (req, res) => {
  try {
    const data = req.body;
    const student = new StudentModel(data);
    student.save();
    res.status(200).json({
      message: "Record Saved",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// APIS from here are meant for providing basic email functionality

router.post("/sendemails", authenticateRequest, async (req, res) => {
  const data = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ujjwalcpj123@gmail.com",
      pass: "vrsrhwlslyezonwd",
    },
  });

  var mailOptions = {
    from: "ujjwalcpj123@gmail.com",
    to: data.emails,
    subject: data.subject,
    text: data.body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(error);
    } else {
      res.send(info);
    }
  });
});

module.exports = router;
