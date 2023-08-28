const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://admin:${password}@study.evvb9xr.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Persons', personSchema)

const getAll = () => {
    Person.find({}).then(result => {
        console.log('Phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

const addPerson = (name, number) => {
    const person = new Person({ name, number })

    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`);
        mongoose.connection.close()
    })
}

// Show all
if (process.argv.length == 3) {
    getAll()
} else if (process.argv.length == 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    if (name.length == 0 || number.length == 0) {
        console.log('name and number cannot be empty')
        process.exit(1)
    }    

    addPerson(name, number);
}



