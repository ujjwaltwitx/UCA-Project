const { default: mongoose } = require("mongoose");

const groupSchema = new mongoose.Schema({
    name : String,
    noStudents : Number,
    tutors : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : "tutor", 
    }
})

const GroupModel = mongoose.model('group', groupSchema)

module.exports = GroupModel