const express = require("express")
const router = require('./todo')

const app = express()
require("dotenv").config()
const cors = require('cors')

app.use("/api", router)
app.use(express.json())
app.use(cors())

app.get('/test', (req,res) => {

})

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})
module.exports = app