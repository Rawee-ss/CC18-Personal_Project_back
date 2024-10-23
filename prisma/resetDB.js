require("dotenv").config();
const prisma = require("../config/prisma");

async function run() {
  await prisma.$executeRawUnsafe("DROP DATABASE cc18_personal_pj");
  await prisma.$executeRawUnsafe("CREATE DATABASE cc18_personal_pj");
}

console.log("Reset DB...");
run();
