const prisma = require("../config/prisma");
const createError = require("../utils/createError");
const jwt = require("jsonwebtoken");



exports.authCheck = async (req, res, next) => {
  try {
      //code
      const headerToken = req.headers.authorization
      if (!headerToken) {
          return res.status(401).json({ message: "No Token, Authorization" })
      }
      const token = headerToken.split(" ")[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decode

      const user = await prisma.user.findFirst({
          where: {
              userName: req.user.userName
          }
      })
      if (!user.enabled) {
          return res.status(400).json({ message: 'This account cannot access' })
      }

      next()
  } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Token Invalid' })
  }
}


exports.adminCheck = async (req, res, next) => {
  try {
      const { userName } = req.user
      const adminUser = await prisma.user.findFirst({
          where: { userName: userName }
      })
      if (!adminUser || adminUser.role !== 'ADMIN') {
          return res.status(403).json({ message: 'Acess Denied: Admin Only' })
      }
      // console.log('admin check', adminUser)
      next()
  } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Error Admin access denied' })
  }
}






// module.exports = (roles = []) => {
//   return async (req, res, next) => {
//     const authorization = req.headers.authorization;
//     if (!authorization || !authorization.startsWith("Bearer ")) {
//       createError(401, "Unauthorized 1");
//     }
//     const token = authorization.split(" ")[1];
//     try {
//       if (!token) {
//         createError(401, "Unauthorized");
//       }

//       const payload = jwt.verify(token, process.env.JWT_SECRET);
//       const foundUser = await prisma.user.({
//         where: { id: payload.id },
//       });
//       if (!foundUser || !roles.includes(foundUser.role)) {
//         return next(createError(403, "Forbidden: Access denied"));
//       }

//       req.user = foundUser;
//       next();
//     } catch (err) {
//       next(err);
//     }
//   };
// };



// exports.authorization = (req, res, next) => {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; 
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };