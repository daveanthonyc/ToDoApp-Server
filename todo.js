const express = require("express")
const router = express.Router()

const mongoose = require("mongoose")
require("dotenv").config()

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
// json sent must be contain { body: "blah"}
router.post('/v1/todos', async (req, res) => {
    try {
        const newBody = req.body.body

        const createdToDo = await Todo.create({
            body: newBody,
            completed: false
        })
        res.status(201).json({message: "todo created"})
    } catch (error) {
        res.status(500).json({message: error})
    }
})

// READ
router.get('/v1/todos', async (req, res) => {
    try {
        const response = await Todo.find()
        res.status(200).json(response)
    } catch (error) {
        res.status(500)
        console.log(error)
    }
})

router.get('/v1/todos/:id', async (req, res) => {
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
router.put('/v1/todos/:id', async (req, res) => {
    try {
        const idToUpdate = req.params.id
        const body = req.body.body
        const completed = req.body.completed

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
router.delete('/v1/todos/:id', async (req, res) => {
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

module.exports = router