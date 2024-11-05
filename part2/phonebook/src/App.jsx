import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll().then(response => {
        setPersons(response.data)
      })
  }, [])

  const addOrUpdatePerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    const personObject = {
      name: newName,
      number: newNumber,
    };

    if (existingPerson) {
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
        personService.update(existingPerson.id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${newName}'s number`);
          })
          .catch(error => {
            showError(`The person '${newName}' was already removed from the server`);
            setPersons(persons.filter(person => person.id !== existingPerson.id));
          });
      }
    } else {
      personService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${newName}`);
        })
    }

  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          alert
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={(notification)} type="success" />
      <Notification message={(errorMessage)} type="error" />

      <div>
        <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      </div>

      <PersonForm newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
        handleSubmit={addOrUpdatePerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App