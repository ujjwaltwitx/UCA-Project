const express = require("express")
const router = express.Router();

const AppointmentModel = require("../models/appointment.js");

router.post("/save", async (req, res) => {
    const data = req.body;
    const { startTime, endTime } = data;
  
    if (!startTime || !endTime) {
      return res
        .status(400)
        .json({ error: "Start time and end time are required" });
    }
  
    if (startTime >= endTime) {
      return res.status(400).json({ error: "Invalid time range" });
    }
  
    // Converting the time to UTC
    const startTimeUTC = moment(startTime).utc().toISOString();
    const endTimeUTC = moment(endTime).utc().toISOString();
  
    try {
      const existingAppointment = await AppointmentModel.findOne({
        $or: [
          { startTime: { $lte: startTime }, endTime: { $gt: startTime } },
          { startTime: { $lt: endTime }, endTime: { $gte: endTime } },
        ],
      });
  
      if (existingAppointment) {
        return res
          .status(409)
          .json({ error: "Appointment time slot is already booked" });
      }
  
      const newAppointment = new AppointmentModel({
        ...data,
        startTime: startTimeUTC,
        endTime: endTimeUTC,
      });
      await newAppointment.save();
  
      res.status(201).json(newAppointment);
    } catch (error) {
      console.error("Error creating appointment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/view", async (req, res) => {
    const filter = req.query.filter;
  
    try {
      let appointments;
      if (filter === "all") {
        appointments = await AppointmentModel.find({}).sort({ createdAt: 1 });
      } else if (filter === "upcoming") {
        appointments = await AppointmentModel.find({
          startTime: { $gte: new Date() },
        }).sort({ createdAt: 1 });
      } else if (filter === "week") {
        const endDate = new Date(+new Date() + 7 * 24 * 60 * 60 * 1000);
        appointments = await AppointmentModel.find({
          startTime: { $gte: new Date(), $lte: endDate },
        }).sort({ createdAt: 1 });
      } else if (filter === "today") {
        const endDate = new Date(+new Date() + 1 * 24 * 60 * 60 * 1000);
        appointments = await AppointmentModel.find({
          startTime: { $gte: new Date(), $lte: endDate },
        }).sort({ createdAt: 1 });
      } else {
        appointments = await AppointmentModel.find({}).sort({ createdAt: 1 });
      }
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      await AppointmentModel.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server Error!" });
    }
  });

module.exports = router