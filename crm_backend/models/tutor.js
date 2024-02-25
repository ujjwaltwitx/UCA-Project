const { default: mongoose } = require("mongoose");

const tutorSchema = new mongoose.Schema({
    name : String,
    salary : Number,
    joiningDate : Date,
    docs : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "doc"
    },
    groups : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "group"
    },
    contactId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "contact"
    }
})


const TutorModel = mongoose.model('tutor', tutorSchema)
module.exports = TutorModel