const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Developer = require("../models/Developer");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied . No Token Found");
    const decoded = jwt.verify(token, "adminLoginKey");
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).send("Invalid Token or Admin Not Found");
    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

const developerAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Access Denied . No Token Found");
    const decoded = jwt.verify(token, "developerLoginKey");
    const developer = await Developer.findById(decoded.id);
    if (!developer)
      return res.status(401).send("Invalid Token or Admin Not Found");
    req.developer = developer;
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

module.exports = { adminAuth, developerAuth };
