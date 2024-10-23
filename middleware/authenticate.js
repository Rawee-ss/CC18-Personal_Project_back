const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");

exports.authCheck = async (req, res, next) => {
  try {
    //code
    const headerToken = req.headers.authorization;
    console.log(req.headers.authorization,'hello')
    if (!headerToken) {
      return res.status(401).json({ message: "No Token, Authorization" });
    }
    const token = headerToken.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log(decode,"decode")

    const user = await prisma.user.findFirst({
      where: {
      id: req.user.id,
      },
    });
    
    if (!user) {
      return res.status(400).json({ message: "This account cannot access" });
    }
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Token Invalid" });
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    // console.log(req.user)
    const { userName } = req.user;
    const adminUser = await prisma.user.findFirst({
      where: { userName: userName },
    });
    if (!adminUser || adminUser.role !== "ADMIN") {
      return res.status(403).json({ message: "Acess Denied: Admin Only" });
    }
    console.log('admin check', adminUser)
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error Admin access denied" });
  }
};


