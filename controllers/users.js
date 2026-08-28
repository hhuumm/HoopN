const User = require("../models/user")

module.exports = {
  index,
}

async function index(_req, res, next) {
  try {
    res.json(await User.find({}).select('name'));
  } catch (error) {
    next(error);
  }
}
