const { default: mongoose, mongo } = require("mongoose")

const docSchema = new mongoose.Schema({
    title : String,
    entityId : {
        type : mongoose.Schema.Types.ObjectId,
    },
    link : String,
    size : Number,
})

const DocModel = mongoose.model('doc', docSchema)
module.exports = DocModel