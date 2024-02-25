const { default: mongoose, mongo } = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: String,
  relation: String,
  parentsEmail: String,
});

const studentSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    dob: Date,
    gender: String,
    contactDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref : "contact",
    },
    groupId :{
      type : mongoose.Schema.Types.ObjectId,
      ref : "group",
    },
    parentDetail: parentSchema,
    subject : String,
    status: {
      type : String,
      enum : ['ACTIVE', 'INACTIVE'],
      default : 'INACTIVE',
    },
  },
  { timestamps: true }
);

const StudentModel = new mongoose.model("student", studentSchema);

module.exports = StudentModel;
