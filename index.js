const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 4000

mongoose.connect('mongodb://localhost:27017/fomrsData')

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String
})

const formModel = mongoose.model('forms', formSchema)

app.get('/', (req, res, err) => {
    res.send("Hey land")
})

app.post('/submit', async (req, res) => {
    try {
        const formData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message
        }

        const createdForm = formModel.create(formData)
        if (createdForm != null) {
            res.send("Data insertd in form successfully")
        }
        else {
            res.send("Data is not sumited")
        }
    }
    catch (error) {
        res.send(error.message)
    }
})

app.get('/fetch-data', async (req, res) => {
    try {
        const data = await formModel.find()
        res.json(data)
    }
    catch (err) {
        res.send(err)
    }
})

app.listen(port, () => {
    console.log("App is running")
})