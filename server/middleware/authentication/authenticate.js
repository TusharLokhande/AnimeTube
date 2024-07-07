const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");
require("dotenv").config();

const SECRET_KEY = process.env.JWT_SECRET ?? "timbaktoo";

function generateToken(user) {
  try {
    const token = jwt.sign(
      {
        ...user,
      },
      SECRET_KEY,
      { expiresIn: "5min" }
    );
    return token;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

function authenticate(req, res, next) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { generateToken, authenticate };
