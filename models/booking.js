const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    room: {
        type: String,
        required: true
    },
    roomid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    fromdate: {
        type: Date, // Change to Date type
        required: true
    },
    todate: {
        type: Date, // Change to Date type
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    totaldays: {
        type: Number,
        required: true
    },
    transactionid: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'booked'
    },
}, {
    timestamps: true,
});

const BookingModel = mongoose.model('bookings', bookingSchema);
module.exports = BookingModel;
