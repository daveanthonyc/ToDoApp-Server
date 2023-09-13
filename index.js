const express = require("express")
const router = require('./api/todo')

const app = express()
require("dotenv").config()
const cors = require('cors')

app.use("/api ", router)
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})