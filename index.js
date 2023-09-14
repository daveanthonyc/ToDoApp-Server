const express = require("express")
const router = require('./todo')

const app = express()
require("dotenv").config()
const cors = require('cors')

app.use("/api", router)
app.use(express.json())

const corsOptions = {
    origin: 'https://mern-todo-application.netlify.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions))

app.get('/test', (req,res) => {

})

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})
module.exports = app