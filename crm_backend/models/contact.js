const { default: mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    addressStreet: String,
    pinCode: Number,
    phone : String,
    email : String,
});

const ContactModel = new mongoose.model('contact', contactSchema)
exports.default = ContactModel