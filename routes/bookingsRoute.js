const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51Q1vj2G2z0L2tb5ojY4dPLZSNyl3tuyX4uJTCTPFp4foQzy6euf2bED8ZBmSZ9KGn8apdS8R15VyUlFXJsSWVmW600T4p5nu9H');
// Route to handle room booking
router.post('/bookroom', async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
        token
    } = req.body;

    try {
        // Convert dates using moment and format them consistently for storage
        const formattedFromDate = moment(fromdate, 'DD-MM-YYYY').format('YYYY-MM-DD'); // Ensure consistent format
        const formattedToDate = moment(todate, 'DD-MM-YYYY').format('YYYY-MM-DD');

        // Create a new customer using Stripe
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        // Create a payment using Stripe
        const payment = await stripe.charges.create({
            amount: totalamount * 100, // Stripe accepts amounts in cents
            customer: customer.id,
            currency: 'INR',
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4() // Avoid duplicate charges by using idempotencyKey
        });

        if (payment) {
            // Create a new booking
            const newBooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate: formattedFromDate, // Use the correctly formatted date
                todate: formattedToDate,
                totalamount,
                totaldays,
                transactionid: payment.id, // Use payment.id for the transaction ID
            });
            const booking = await newBooking.save();

            // Update the current bookings in the Room collection
            const roomTemp = await Room.findOne({ _id: room._id });
            roomTemp.currentbookings.push({
                bookingid: booking._id,
                fromdate: formattedFromDate, // Ensure consistent format
                todate: formattedToDate,
                userid,
                status: booking.status
            });

            await roomTemp.save();
            res.status(201).send('Payment successful, your room is booked.');
        } else {
            res.status(400).send('Payment failed.');
        }
    } catch (error) {
        console.error('Booking failed:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
});

// Route to get bookings by user ID
router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid;
    try {
        const bookings = await Booking.find({ userid: userid });
        res.send(bookings);
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Route to cancel booking
router.post('/cancelbooking', async (req, res) => {
    const { bookingid, roomid } = req.body;
    try {
        const booking = await Booking.findOne({ _id: bookingid });
        if (booking) {
            booking.status = "cancelled";
            await booking.save();

            // Update room bookings
            const room = await Room.findOne({ _id: roomid });
            const bookings = room.currentbookings.filter(
                b => b.bookingid.toString() !== bookingid
            );
            room.currentbookings = bookings;
            await room.save();

            res.status(200).send('Booking cancelled successfully.');
        } else {
            res.status(404).send('Booking not found.');
        }
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
});
router.get('/getallbookings', async (req, res) => {
    try {
      // Fetch all bookings logic here
      const bookings = await Booking.find(); // Replace with your logic
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
