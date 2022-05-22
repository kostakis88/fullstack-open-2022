import Person from "./Person"

const Persons = ({ persons, searchValue, deletePersonCallback }) => {
  const handleDelete = (id, name) => {
    deletePersonCallback(id, name)
  }

  return (
    <>
      {persons
        .filter(
          person =>
            person.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            searchValue === ""
        )
        .map(person => (
          <div key={person.id}>
            <Person person={person}/>
            <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
          </div>
        ))}
    </>
  )
}

export default Persons