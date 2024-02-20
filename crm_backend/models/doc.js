const { default: mongoose, mongo } = require("mongoose")

const docSchema = mongoose.Schema({
    title : String,
    link : String,
    size : Number,
})

const DocModel = mongoose.model('doc', docSchema)
exports.default = DocModel