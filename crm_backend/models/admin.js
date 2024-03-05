const { default: mongoose } = require("mongoose");

const adminSchema = new mongoose.Schema({
    username : String,
    hash : String
})


const AdminModel = mongoose.model('admin', adminSchema)

module.exports = AdminModel;