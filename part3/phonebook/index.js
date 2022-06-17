const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
const app = express()

app.use(morgan("tiny"))
app.use(express.json())

let persons = 
    [
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

app.get('/info', (request, response) => {
  const personsLen = persons.length
  const timestamp = new Date();
  console.log(personsLen)
    if(personsLen>0) {
      return response.send(`<p>Phonebook has info for  ${personsLen} people</p> <p>${timestamp}</p>`)
    }
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const singleContact = persons.find(contact => contact.id === id)

  if (singleContact) {
    response.json(singleContact)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {


  const randomId = persons.length > 0
    ? Math.floor(Math.random() * (10000 - 100) + 100)
    : 0
  return randomId
    
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const result = persons.find(({name}) => name === body.name);
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'The name or number is missing' 
    })
  }

  
  else if (result) {
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  
  } 
  else {

  const person = {
    content: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
}
})


const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})