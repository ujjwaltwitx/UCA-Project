const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    username : String,
    password : String
})


const AdminModel = new mongoose.model('admin', adminSchema)

exports.default = AdminModel;