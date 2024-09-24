const User = require('../models/user');
const jwt = require('jsonwebtoken')
const { sendPasswordResetEmail } = require('../services/emailService');

module.exports = {
  signup,
  login,
  reset,
  resetToken
};

// Server-side code
async function resetToken(req, res, next) {
  console.log(req, res, next, "I NEED TO SEE THIS 111");
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Find the user by the password reset token
    const user = await User.findOne({ passwordResetToken: token });

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired token' });
    }

    // Update the user's password
    user.password = password;
    user.passwordResetToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    next(error);
  }
}


async function reset(req, res, next) {
  console.log(req, res, next, "I NEED TO SEE THIS 222");
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique password reset token and save it to the user's record
    const resetToken = await user.generatePasswordResetToken();

    // Send an email to the user with the password reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendPasswordResetEmail(user.email, resetLink);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    next(error);
  }
}


async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user)
    res.json({ token });
  } catch (err) {
    res.status(400).send({'err': err.errmsg});
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}


/*  Helper functions  */

function createJWT(user) {
  return jwt.sign(
    { user }, //data payload
    process.env.SECRET,
    { expiresIn: "24h" }
  )
}