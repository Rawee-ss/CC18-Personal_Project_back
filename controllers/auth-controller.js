const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { userName, password, confirmPassword, email, birthday } = req.body;

    if (!userName || !password) {
      return createError(400, "userName and password to be provided");
    }

    if (password !== confirmPassword) {
      return createError(400, "Passwords don't match");
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        userName,
      },
    });
    if (existingUser) {
      return createError(400, "userName already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        // birthday,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    res.json({ message: "Register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return createError(400, "userName and password must be provided");
    }
    const user = await prisma.user.findUnique({
      where: { userName },
    });
    if (!user) {
      return createError(401, "Invalid userName or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return createError(401, "Invalid userName or password");
    }

    const payload = {
      id: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ user:payload, token });
  } catch (err) {
    next(err);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    console.log("CURRENT USER")
    console.log(req.user)
    const userName = req.user.userName;
    const member = await prisma.user.findFirst({
      where: {
        userName,
      },
      select: {
        id: true,
        userName: true,
        role: true,
        email:true
      },
    });
    res.json({ member });
  } catch (err) {
    next(err);
  }
};
