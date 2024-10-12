const express = require('express');
const app = express();
const dbConfig = require('./db'); // Assuming db config initializes the database connection
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute=require('./routes/bookingsRoute')
app.use(express.json()); 
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings',bookingsRoute)
const port = 5000;
app.listen(port, () => console.log(`Node server started on port ${port} using nodemon`));

