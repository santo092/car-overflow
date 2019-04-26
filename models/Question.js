const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model("Question", questionSchema)
module.exports = Question