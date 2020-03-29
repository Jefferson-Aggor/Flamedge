const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Booking = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    work: { type: String, required: true },
    expectations: { type: String },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model("booking", Booking);