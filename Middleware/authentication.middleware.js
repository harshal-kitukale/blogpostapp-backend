const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token)
    return res
      .status(401)
      .json({ message: "Authentication token is required" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
