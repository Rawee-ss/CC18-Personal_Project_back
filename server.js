require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")

app.use(morgan("dev"))
app.use(express.json())







const port = process.env.PORT
app.listen(8000,()=>console.log(`server run in port ${port}`))
