const router = require("express").Router();
const Booking = require('../models/BookingModel')

// const { isAuthenticated } = require("./../middlewares/Auth.middlewares");

router.post('/bookings', (req, res, next) => {

    const { 
        firstname, 
        lastname, 
        email, 
        location, 
        phone, 
        event,
        theme,
        inorout,
        held,
        vicinity,
        chairs,
        centerpiece,
        backdrop,
        ballons,
        budget,
        services,
        recommended
    } = req.body;

    return Booking.create({
        firstname, 
        lastname, 
        email, 
        location, 
        phone, 
        event,
        theme,
        inorout,
        held,
        vicinity,
        chairs,
        centerpiece,
        backdrop,
        ballons,
        budget,
        services,
        recommended
    })
    .then((createdBooking) => {

        console.log(createdBooking)

    })
    .catch((err => console.log(err)))
})

module.exports = router;