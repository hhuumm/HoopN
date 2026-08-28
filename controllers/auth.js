const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  signup,
  login,
  reset,
};

function reset(_req, res) {
  res.status(501).json({ error: "Password reset is not configured for this deployment" });
}


async function signup(req, res) {
  const { name, email, password } = req.body;
  if (!name?.trim() || !email?.trim() || typeof password !== "string" || password.length < 8)
    return res.status(400).json({ error: "Name, email, and a password of at least 8 characters are required" });
  const user = new User({ name: name.trim(), email: email.trim(), password });
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    res.status(err?.code === 11000 ? 409 : 400).json({ error: err?.code === 11000 ? "An account already uses that email" : "Could not create account" });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: String(req.body.email || "").trim().toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(req.body.pw || req.body.password || "")))
      return res.status(401).json({ error: "Invalid email or password" });
    res.json({ token: createJWT(user) });
  } catch (err) {
    return res.status(400).json({ error: "Could not sign in" });
  }
}


/*  Helper functions  */

function createJWT(user) {
  if (!process.env.SECRET) throw new Error("SECRET is not configured");
  return jwt.sign(
    { user: { _id: user._id, name: user.name, email: user.email } },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
