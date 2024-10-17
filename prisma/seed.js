const { prisma } = require("../config/prisma");
const bcrypt = require("bcryptjs");

const hashedPassword = bcrypt.hashSync("123456", 10); // hash no async

const usersData = [
  {
    userName: "Manager",
    email: "manager@games.com",
    password: hashedPassword,
    role: "ADMIN"
  },
  {
    userName: "Anny",
    email: "anny@games.com",
    password: hashedPassword,
    role: "USER"
  },


];

async function run() {
  await prisma.user.createMany({
    data: usersData,
  });
}

console.log("DB seed...");
run();