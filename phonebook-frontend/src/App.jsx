import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import PersonDisplay from "./components/Persons";
import axios from "axios";
import phoneServices from "./services/phonebook";
import Notification from "./components/Notification";
import Error from "./components/Error";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    phoneServices.getData().then((returnedData) => {
      setPersons(returnedData);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const newObject = { name: newName, number: newNumber };

    const existedObject = persons.find((obj) => {
      return newName === obj.name;
    });

    if (existedObject) {
      const idForChange = existedObject.id;

      if (
        window.confirm(
          `${existedObject.name} is already added to phonebook, replace the old number`
        )
      ) {
        phoneServices.edit(idForChange, {
          ...existedObject,
          number: newNumber,
        });

        setNewName("");
        setNewNumber("");
      }
    } else {
      phoneServices.create(newObject).catch((error) => {
        alert(`Not succesful`, error);
      });
      setNotification(`Added ${newName}`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
      setPersons(persons.concat(newObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const filtered = persons.filter((person) => {
    return person.name.toLowerCase().includes(input.toLowerCase());
  });

  // console.log(filtered);

  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    const returnedValue = event.target.value;

    setNewNumber(returnedValue);
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleDelete = (event) => {
    const id = event.target.id;

    if (window.confirm(`Are you sure you wan to delete that number`))
      phoneServices.removePerson(id).catch((error) => {
        setError(`That person has already been removed from server`);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} />
      <Error message={error} />

      <Filter input={input} handleInput={handleInput} />

      <h3>Add a new</h3>

      <Form
        onSubmit={onSubmit}
        newName={newName}
        handleName={handleName}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />

      <h3>Numbers</h3>

      <PersonDisplay
        key={persons.name}
        filtered={filtered}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
