const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    location: String,
    phone: String,
    event: String,
    theme: String,
    inorout: String,
    held: String,
    vicinity: String,
    chairs: String,
    centerpiece: String,
    backdrop: String,
    ballons: String,
    budget: String,
    services: String,
    recommended: String
});
const Booking = model('Booking', bookingSchema);

module.exports = Booking;