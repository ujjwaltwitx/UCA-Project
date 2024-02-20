const { default: mongoose } = require("mongoose");

const tutorSchema = mongoose.Schema({
    name : String,
    salary : Number,
    joiningDate : Date,
    docs : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "docSchema"
    },
    groups : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "groupSchema"
    },
    contactId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "contactSchema"
    }
})


const TutorModel = mongoose.model('tutor', tutorSchema)
exports.default = TutorModel