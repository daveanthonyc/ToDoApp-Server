const express = require("express")
const router = require('./todo')
require("dotenv").config()
const cors = require('cors')

const app = express()
app.use(express.json())

const corsOptions = {
    origin: ['https://www.mern-todo-application.netlify.app', 'https://mern-todo-application.netlify.app', "http://localhost:5173"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions))
app.use("/api", router)

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})

module.exports = app