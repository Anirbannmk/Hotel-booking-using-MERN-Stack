// routes/contactRoute.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// Route to handle contact form submission
router.post('/', async (req, res) => { // Ensure the route matches '/api/contact'
  const { firstName, lastName, email, phone, message } = req.body;

  const newContact = new Contact({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  try {
    await newContact.save();
    res.status(201).send('Contact request submitted successfully');
  } catch (error) {
    console.error('Error saving contact request:', error); // Log the error
    return res.status(400).json({ error: 'Error saving contact request' });
  }
});

module.exports = router;
