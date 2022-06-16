
const ShowContact = ({ person, handleDelete }) => {
  return (
    <div>
      <li>
        {person.name} {person.number}
        <button onClick={handleDelete}>delete</button>
      </li>
    </div>
  );
};

export default ShowContact;
