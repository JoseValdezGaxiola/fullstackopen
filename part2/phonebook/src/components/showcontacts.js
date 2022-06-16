import ShowContact from "./showcontact"

const Show = ({ filteredNames, handleDeleteOf }) => {
  return (
    <div>
      <ul>
        {filteredNames.map((person) => (
          <ShowContact
            key={person.name}
            person={person}
            handleDelete={() => handleDeleteOf(person)}
          />
        ))}
      </ul>
    </div>
  );
};
  
  export default Show
 