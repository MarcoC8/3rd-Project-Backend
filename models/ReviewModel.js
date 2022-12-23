const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    rating: String,
    img: String,
    description: String
});

const Review = model('Review', reviewSchema);

module.exports = Review;