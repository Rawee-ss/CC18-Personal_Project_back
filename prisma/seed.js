const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

const hashedPassword = bcrypt.hashSync("123456", 10); // hash no async

const usersData = [
  {
    userName: "Manager",
    email: "manager@games.com",
    password: hashedPassword,
    role: "ADMIN",
  },
  {
    userName: "Anny",
    email: "anny@games.com",
    password: hashedPassword,
    role: "USER",
  },

  {
    userName: "Bobby",
    email: "bobby@games.com",
    password: hashedPassword,
    role: "USER",
  },
  {
    userName: "Candy",
    email: "candy@games.com",
    password: hashedPassword,
    role: "USER",
  },
  {
    userName: "Danny",
    email: "danny@games.com",
    password: hashedPassword,
    role: "USER",
  },
];

const gamesData =[
  {
    name:"Dota 2",
    image:"https://i.pinimg.com/564x/80/ba/ed/80baed0c6e4c5c67fce67ca2d29ba66f.jpg",
    detail:"123",
    price:"100"
  }
]

async function run() {
  await prisma.user.createMany({
    data: usersData,
  });
  await prisma.products.createMany({
    data: gamesData,
  });
}

console.log("DB seed...");
run();
