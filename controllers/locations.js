const Location = require('../models/Location')

module.exports = {
    // create: createReview,
    // reviewsIndex,
    delete: deleteReview,
    index
  
}

function deleteReview(req, res) {
  Location.findById(req.params.id)
  .then(location => {
    location.reviews.find({_id: req.params.rid})
    
  })
}

// function createReview(req, res) {
//     req.body.reviewer = req.user._id
//     Review.create(req.body)
//     .then(review => {res.json(review)})
//     .catch(err => {res.json(err)})
//   }

// function reviewsIndex(req, res) {
//     Review.find({})
//     .populate('reviewer')
//     .then(reviews => {res.json(reviews)})
//     .catch(err => {res.json(err)})
// }
function index(req, res) {
  Location.find({})
  console.log(locations)
  .then(locations => {res.json(locations)}) 
  .catch(err => {res.json(err)})

  
}