const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require('cors')

app.use(express.json())
app.use(cors())

async function main() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("connection to MongoDB successful")
    } catch (error) {
        console.log("unable to connect to Database")
    }
}
main()

const toDoSchema = new mongoose.Schema({
    body: String,
    completed: Boolean
}, { versionKey: false})

const Todo = mongoose.model('Todo', toDoSchema)


// CREATE
app.post('/v1/todos', async (req, res) => {
    try {
        const body = req.body.body

        const createdToDo = await Todo.create({
            body: body,
            completed: false
        })

        res.status(201).json({message: "todo created"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

// READ
app.get('/v1/todos', async (req, res) => {
    try {
        const response = await Todo.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
})

app.get('/v1/todos/:id', async (req, res) => {
    try {
        const idOfTodo = req.params.id
        const response = await Todo.findById(idOfTodo)
        res.status(200).json(response)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
})



// UPDATE
app.put('/v1/todos/:id', async (req, res) => {
    try {
        const idToUpdate = req.params.id
        const { body, completed } = req.body

        const updatedEntry = await Todo.findByIdAndUpdate(idToUpdate, {
            body: body,
            completed: completed
        })
        if (!updatedEntry) {
            console.log("id not found")
        }

        res.status(200).json({message: "successfully updated"})
    } catch (error) {
        res.status(500).json({message: error})
        console.log(error)
    }
})

// DELETE
app.delete('/v1/todos/:id', async (req, res) => {
    try {
        const idToDelete = req.params.id
        const deleteTodo = await Todo.findByIdAndDelete(idToDelete)
        if (!deleteTodo) {
            res.status(404).json({message: "id not found"})
        }
        res.status(200).json({message: "deleted"})
    } catch (error) {
        res.status(500).json({message: error})
    }
} )

app.listen(process.env.PORT, () => {
})