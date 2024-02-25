const mongoose  = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    studentName : String,
    parentName : String,
    query : String,
    email : String,
    phone : Number,
    startTime : Date,
    endTime : Date,
}, { timestamps: true })

const AppointmentModel = new mongoose.model('appointment', appointmentSchema)
module.exports = AppointmentModel