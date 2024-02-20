const { default: mongoose } = require("mongoose");

const contactSchema = mongoose.Schema({
    addressStreet: String,
    pinCode: Number,
    phone : String,
    email : String,
});

const ContactModel = mongoose.model('contact', contactSchema)
exports.default = ContactModel