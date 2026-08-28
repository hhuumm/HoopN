const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, res, next) {
  const authorization = req.get("Authorization");
  if (!authorization) return next();
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) return res.status(401).json({ error: "Use a Bearer authorization token" });
  if (!process.env.SECRET) return next(new Error("SECRET is not configured"));
  try {
    const decoded = jwt.verify(match[1], process.env.SECRET);
    req.user = decoded.user;
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
