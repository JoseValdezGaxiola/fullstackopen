const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
require("dotenv").config();
const Person = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
app.use(morgan("tiny"));

app.use(cors());

// let persons =
//     [
//         {
//           "id": 1,
//           "name": "Arto Hellas",
//           "number": "040-123456"
//         },
//         {
//           "id": 2,
//           "name": "Ada Lovelace",
//           "number": "39-44-5323523"
//         },
//         {
//           "id": 3,
//           "name": "Dan Abramov",
//           "number": "12-43-234345"
//         },
//         {
//           "id": 4,
//           "name": "Mary Poppendieck",
//           "number": "39-23-6423122"
//         }
//     ]

app.get("/api/persons", (request, response) => {
  Person.find({})
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.get("/info", async (request, response) => {
  const persons = await Person.find({});
  const timestamp = new Date();

  return response.send(
    `<p>Phonebook has info for  ${persons.length} people</p> <p>${timestamp}</p>`
  );
});

app.get("/api/persons/:id", (request, response, next) => {
  // const id = Number(request.params.id)
  // const singleContact = persons.find(contact => contact.id === id)

  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//   if (singleContact) {
//     response.json(singleContact)
//   } else {
//     response.status(404).end()
//   }
// })

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })

    .catch((error) => next(error));
});


app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "The name or number is missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  })
  .catch(error => next(error))



});
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
