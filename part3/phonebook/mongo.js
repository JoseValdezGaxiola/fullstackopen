const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://peke666:${password}@cluster0.ao8yzi1.mongodb.net/phoneBook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  
})

const name = process.argv[3];
const number = process.argv[4];
const Person = mongoose.model('Person', personSchema)
if(name && number){
  mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({
      name: name,
      number: number,
      
    })

    return person.save()
  })
  .then(() => {

    console.log(`added  ${name} number ${number} to phonebook`);
  
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
}

else {
const Person = mongoose.model('Person', personSchema)
mongoose
  .connect(url)
  .then((result) => {
Person.find({}).then(result => {
  result.forEach(contact => {
    console.log(contact)
  })
  mongoose.connection.close()
})
})

.catch((err) => console.log(err))

}
