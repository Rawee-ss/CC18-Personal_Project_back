require("dotenv").config()
const express = require("express")
const app = express()


const port = process.env.PORT
app.listen(8000,()=>console.log(`server run in port ${port}`))
