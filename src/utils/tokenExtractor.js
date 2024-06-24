const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.accessToken = authorization.substring(7)
    req.decodedToken = jwt.verify(req.accessToken, SECRET);
    if (!req.decodedToken) {
      return res.status(401).json({ error: "invalid token" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next()
};

module.exports = tokenExtractor;
