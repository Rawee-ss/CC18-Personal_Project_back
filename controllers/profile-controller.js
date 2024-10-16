const prisma = require("../config/prisma");

exports.getUserProfile = async (req, res, next) => {
  try {
    //code
    const users = await prisma.user.findMany({
      select: {
        id: true,
        role: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        userName: true,
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, email, image, userName, role } = req.body;
    //code
    const { id } = req.body;
    console.log(id);
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
        email,
        image,
        userName,
        password,
        role,
      },
    });

    res.json("Update Status Success", user);
  } catch (err) {
    next(err);
  }
};

// exports.changeRole = async (req, res, next) => {
//   try {
//     //code
//     const { id, role } = req.body;

//     const user = await prisma.user.update({
//       where: { id: Number(id) },
//       data: { role: role },
//     });

//     res.send("Update Role Success");
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateUserProfile = async (req, res, next) => {
//   const userId = req.user.id;
//   const { firstName, lastName, email, image, userName, password } = req.body;

//   try {
//     const updatedUser = await prisma.user.update({
//       where: { id: userId },
//       data: {
//         firstName,
//         lastName,
//         email,
//         image,
//         userName,
//         password,
//       },
//     });

//     res.json(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getUserProfile = async (req, res, next) => {
//   const userId = req.user.id;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         firstName: true,
//         lastName: true,
//         email: true,
//         image: true,
//         userName: true,
//         password: true,
//       },
//     });

//     if (!user) {
//       return res.json({ error: "User not found" });
//     }

//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// };
