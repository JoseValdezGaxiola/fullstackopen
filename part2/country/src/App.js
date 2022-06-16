import { useState, useEffect } from "react";
import axios from "axios";

const Countries = ({ countries, searchName }) => {

  
  const filteredNames = countries.filter(country =>
    country.name.toLowerCase().includes(searchName.toLowerCase())
  );
  <div>debug: {filteredNames}</div>


  if (filteredNames.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } 
  else if (filteredNames.length <= 10 && filteredNames.length > 1) {
    return (
      <ul>
        {filteredNames.map((country, i) =>
          <li key={i}> {country.name}</li>
        )}
      </ul>
    )
  }
  else if  (filteredNames.length ===1) {
    return (
      <div>
    <h1>{filteredNames[0].name}</h1>
    <p>capital: {filteredNames[0].capital}</p>
    <p>population: {filteredNames[0].population}</p>
    <h2>Spoken languages</h2>
    <ul>
      {filteredNames[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={filteredNames[0].flag} alt="Country flag"></img>
      </div>


    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("https://restcountries.com/v2/all").then((response) => {
      console.log("promise fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setSearchName(event.target.value);
  };
  
    
  return (
    <div>
      <Countries countries ={countries} searchName ={searchName}/>
      
      <h2>Countries</h2>
      filter:{" "}<input placeholder="Search by Name" onChange={handleFilterChange} />
    
    </div>
  );
};



export default App;
