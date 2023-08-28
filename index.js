require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI
console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('frontend'))

morgan.token('req-body', (req) => JSON.stringify(req.body));
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['req-body'](req, res)
    ].join(' ')
}));

app.get('/api/persons', (request, response, next) => {
    try {
        Person.find({}).then(result => {
            response.json(result)
        })
    } catch (error) {
        next(error)
    }
})

app.post('/api/persons', async (request, response, next) => {

    try {
        const { name, number } = request.body;

        if (!name || name.length == 0 || !number || number.length == 0) {
            return response.json({ error: 'name and number cannot be empty' }).status(400)
        }

        const exist = await Person.findById(request.params.id);

        if (exist) {
            return response.status(400).json({ error: 'name must by unique' });
        }

        const person = new Person({name, number})
        await person.save();
        return response.status(201).end()
    } catch (error) {
        next(error)
    }
})

app.put('/api/persons/:id', async (request, response, next) => {
    try {
        const { name, number } = request.body;

        if (!name || name.length == 0 || !number || number.length == 0) {
            return response.json({ error: 'name and number cannot be empty' }).status(400)
        }

        const person = await Person.findByIdAndUpdate(request.params.id, { name, number }, {new: true});

        if (!person) {
            return response.json({ error: 'not found' }).status(404);
        }

        return response.json(person)
    } catch (err) {
        next(err)
    }
})

app.get('/api/persons/:id', async (req, res, next) => {

    try {
        const person = await Person.findById(request.params.id);

        if (person) {
            return res.json(match);
        }

        return res.status(404).end();
    } catch (err) {
        next(err)
    }
})

app.delete('/api/persons/:id', async (req, res, next) => {

    try {
        const person = await Person.findByIdAndRemove(req.params.id);

        if (!person) {
            return res.status(404).send('not found');
        }

        return res.status(200).json({ error: false })
    } catch (err) {
        next(err)
    }
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})