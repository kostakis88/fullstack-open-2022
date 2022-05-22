import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personsService from "./services/personsService"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")
  const [message, setMessage] = useState(null)
  const [isSuccessful, setIsSuccessful] = useState(true)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }
    const existingPerson = persons.find((p) => p.name === newName)
    const changedPerson = { ...existingPerson, number: newNumber }

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(existingPerson.id, changedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : response
              )
            )
            setMessage(`Updated ${newName}`)
            setIsSuccessful(true)
            setTimeout(() => {
              setMessage(null)
            }, [5000])
          })
          .catch((error) => {
            setMessage(
              `Information of ${newName} has already been removed from the server`
            )
            setIsSuccessful(false)
            setTimeout(() => {
              setMessage(null)
            }, [5000])
          })
        setNewName("")
        setNewNumber("")
      }
      return
    }

    personsService
      .create(personObject)
      .then((response) => {
        setPersons([...persons, response])
        setMessage(`Added ${newName}`)
        setIsSuccessful(true)
        setTimeout(() => {
          setMessage(null)
        }, [5000])
        setNewName("")
        setNewNumber("")
      })
  }

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
    }
  }

  useEffect(() => {
    personsService.getAll().then((response) => setPersons(response))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isSuccessful={isSuccessful} />
      <Filter searchValue={newSearch} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        searchValue={newSearch}
        deletePersonCallback={handleDeletePerson}
      />
    </div>
  )
}

export default App
