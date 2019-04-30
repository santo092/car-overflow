const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const repliesSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Reply = mongoose.model("Reply", repliesSchema)
module.exports = Reply