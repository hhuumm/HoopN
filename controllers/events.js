const Event = require("../models/Event");

const populated = (query) => query.populate("createdBy", "name").populate("participant", "name").populate("reviews.reviewer", "name");
const eventInput = (body) => ({
  title: body.title,
  placeId: body.placeId,
  locName: body.locName,
  address: body.address,
  court: body.court,
  date: body.date,
  time: body.time,
});

module.exports = { create, index, delete: deleteEvent, update, myGames, locationGames, createReview, addParticipant, removeParticipant };

async function index(_req, res, next) {
  try { res.json(await populated(Event.find({}).sort({ date: 1, time: 1 }))); }
  catch (error) { next(error); }
}

async function locationGames(req, res, next) {
  try { res.json(await populated(Event.find({ placeId: req.params.id }).sort({ date: 1, time: 1 }))); }
  catch (error) { next(error); }
}

async function myGames(req, res, next) {
  try { res.json(await populated(Event.find({ participant: req.user._id }).sort({ date: 1, time: 1 }))); }
  catch (error) { next(error); }
}

async function create(req, res, next) {
  try {
    const event = await Event.create({ ...eventInput(req.body), createdBy: req.user._id, participant: [req.user._id] });
    res.status(201).json(await populated(Event.findById(event._id)));
  } catch (error) { error.status = 400; error.expose = true; next(error); }
}

async function update(req, res, next) {
  try {
    const event = await populated(Event.findOneAndUpdate({ _id: req.params.id, createdBy: req.user._id }, eventInput(req.body), { new: true, runValidators: true }));
    if (!event) return res.status(404).json({ error: "Event not found or not owned by this user" });
    res.json(event);
  } catch (error) { error.status = 400; error.expose = true; next(error); }
}

async function deleteEvent(req, res, next) {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
    if (!event) return res.status(404).json({ error: "Event not found or not owned by this user" });
    res.json(event);
  } catch (error) { next(error); }
}

async function addParticipant(req, res, next) {
  try {
    const event = await populated(Event.findByIdAndUpdate(req.params.id, { $addToSet: { participant: req.user._id } }, { new: true }));
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) { next(error); }
}

async function removeParticipant(req, res, next) {
  try {
    const event = await populated(Event.findByIdAndUpdate(req.params.id, { $pull: { participant: req.user._id } }, { new: true }));
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) { next(error); }
}

async function createReview(req, res, next) {
  const rating = Number(req.body.rating);
  const content = String(req.body.content || "").trim();
  if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !content)
    return res.status(400).json({ error: "A rating from 1 to 5 and review text are required" });
  try {
    const event = await populated(Event.findByIdAndUpdate(req.params.id, { $push: { reviews: { reviewer: req.user._id, name: req.user.name, rating, content } } }, { new: true, runValidators: true }));
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (error) { next(error); }
}
