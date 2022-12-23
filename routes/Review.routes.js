const router = require("express").Router();
const Review = require('../models/ReviewModel')

const { isAuthenticated } = require("./../middlewares/Auth.middlewares");


router.post('/reviews', isAuthenticated, (req, res, next) => {

    const { rating, img, description } = req.body;

    return Review.create({
        rating,
        img,
        description
    })
    .then((createdReview) => {

        console.log(createdReview)

    })
    .catch((err => console.log(err)))
})

router.get('/reviews', isAuthenticated, (req, res, next) => {
    Review.find()
    .then((foundReviews) => {
        console.log(foundReviews)
        res.json(foundReviews)
    })
    .catch((err => console.log(err)))
})

router.get('/reviews/:id', isAuthenticated, (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    return Review.findById(id)
    .then((foundReview) => {
        console.log(foundReview)
        res.json(foundReview)
    })
    .catch((err => console.log(err)))
})

router.post('/reviews/:id', isAuthenticated, (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    return Review.findByIdAndUpdate(id, {
        rating: req.body.rating,
        img: req.body.img,
        description: req.body.description
      }, { new: true })
        .then(updatedReview => {
          res.send(updatedReview);
        })
        .catch(err => res.send(err));
    });

    router.delete('/reviews/:id', isAuthenticated, (req, res, next) => {
        const { id } = req.params;
        Review.findByIdAndDelete(id)
        .then(deletedReview => {
          res.send(deletedReview);
        })
        .catch(err => res.send(err));
    })

module.exports = router;