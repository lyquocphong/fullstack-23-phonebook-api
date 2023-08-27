const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

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

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;

    if (!name || !name.length == 0 || !number || !number.length == 0) {
        return response.json({ error: 'name and number cannot be empty' }).status(400)
    }

    const exist = persons.find(person => person.name == name);

    if (exist) {
        return response.json({ error: 'name must be unique' }).status(400);
    }

    id = Math.floor(Math.random() * 10000);

    persons.push({ id, name, number });

    return response.json(persons)
})

app.get('/api/persons/:id', (req, res, next) => {
    const match = persons.find(person => person.id == req.params.id);

    if (match) {
        return res.json(match);
    }

    return res.status(404).send('not found');
})

app.delete('/api/persons/:id', (req, res, next) => {
    const index = persons.findIndex(person => person.id == req.params.id);

    if (index == -1) {
        return res.status(404).send('not found');
    }

    persons = persons.splice(index, 1);
    return res.status(200).json({ error: false })
})

app.get('/info', (request, response) => {

    let html = `
    <p>Phonebook has info for ${persons.length} people(s)</p>
    <br/>
    `;

    html = html.concat((new Date()).toLocaleString());

    response.send(html)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})