const express = require("express")
const router = require('./todo')

const app = express()
require("dotenv").config()
const cors = require('cors')

const corsOptions = {
    origin: ['https://www.mern-todo-application.netlify.app', 'https://mern-todo-application.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions))

app.use("/api", router)
app.use(express.json())


app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})
module.exports = app