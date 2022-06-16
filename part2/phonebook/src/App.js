import './index.css'
import { useState, useEffect } from "react";
import personServices from "./services/persons";
import Show from "./components/showcontacts";
import Filter from "./components/searchfilter";
import Notification from './components/notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    console.log("effect");
    personServices.getAll().then((initialData) => {
      console.log(initialData)
      setPersons(initialData);
    });
  }, []);
const handleDeleteOf = (person) => {
  if(window.confirm(`delete ${person.name} `)){

    personServices.deleteEntry(person.id)
  }
    else{

    }

  };
  

  const addContact = (event) => {
    event.preventDefault();
    const result = persons.find(({ name }) => name === newName);
    if (result) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personServices.create(nameObject).then((returnedPerson) => {

        setSuccessMessage(
          `Added '${nameObject.name}'`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };
  const filteredNames = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchName.toLowerCase());
  });

  const handleFilterChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  return (
    <div>
      <div>debug: {searchName}</div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      filter:
      <Filter handleFilterChange={handleFilterChange} />
    
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNoteChange} />
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
     
      <h2>Numbers</h2>
      <Show filteredNames={filteredNames} handleDeleteOf={handleDeleteOf}/>
     
    </div>
  );
};

export default App;
