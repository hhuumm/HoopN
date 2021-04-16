const Event = require('../models/Event')

module.exports = {
  create,
  index,
  delete: deleteEvent,
  update,
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
    req.body.participant = req.user._id
    req.body.location = req.location._id
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