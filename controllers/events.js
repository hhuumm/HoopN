const Event = require('../models/Event')

module.exports = {
  create,
  index,
  delete: deleteEvent,
  update,
  myGames,
  locationGames,
  createReview,
  indexReviews,
  addParticipant
}

function indexReviews(req, res) {
  Event.reviews.find({})
  .populate('reviewer')
  .then(review => {console.log(review)
    res.json(review)})
  .catch(err => {res.json(err)})
}
function addParticipant(req,res)
{
console.log(req.params.id+"\n^^^Event that user wants to participate in")

}
function createReview(req, res) {
  console.log(req.body, 
    '\n^^ req.body')
  req.body.reviewer = req.user._id
  req.body.content 
  Event.createReview(req.body)
  .then(review => {res.json(review)})
  .catch(err => {res.json(err)})
}

function locationGames(req,res)
{
  const locationID=req.params.id;
  Event.find({placeId: locationID})
  .then((events) => {
    res.json(events)
  })
}
function myGames(req, res) {
  Event.find({participant: req.user.id})
  .then((events) => {
    res.json(events)
  })
  participant.push(req.user._id)
  .then(events => {res.json(events)})
  .catch(err => {res.json(err)})
  }

function update(req, res) {
    Event.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(event => {res.json(event)})
    .catch(err => {res.json(err)})
  }

function deleteEvent(req, res) {
    Event.findByIdAndDelete(req.params.id)
    .then(event => {res.json(event)})
    .catch(err => {res.json(err)})
  }
  

function create(req, res) {
    req.body.createdBy = req.user._id

    req.body.participant = [req.user._id]
    // req.body.location = req.location._id

    Event.create(req.body)
    .then(event => {res.json(event)})
    .catch(err => {res.json(err)})
  }

function index(req, res) {
    Event.find({})
    .populate('createdBy')
    .populate('location')
    .populate('participant')
    .then(events => {res.json(events)})
    .catch(err => {res.json(err)})
  }