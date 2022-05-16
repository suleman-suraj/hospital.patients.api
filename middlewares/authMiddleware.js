const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.protect = async function (req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.header.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.header.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      next();
    } catch (err) {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  }
  if (!token) {
    res.status(401).json({
      message: "You are not authorized",
    });
  }
};

//isAdmin middleware
exports.admin = async function (req, res, next) {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "You are not authorised admin",
    });
  }
};
