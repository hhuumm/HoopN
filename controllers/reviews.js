const Review = require('../models/Review')

module.exports = {
    create,
    index,
    delete: deleteReview,
  
}

function deleteReview(req, res) {
    Review.findByIdAndDelete(req.params.id)
    .then(review => {res.json(review)})
    .catch(err => {res.json(err)})
  }
  

function create(req, res) {
    req.body.reviewer = req.user._id
    Review.create(req.body)
    .then(review => {res.json(review)})
    .catch(err => {res.json(err)})
  }

function index(req, res) {
    Review.find({})
    .populate('reviewer')
    .then(reviews => {res.json(reviews)})
    .catch(err => {res.json(err)})
}
