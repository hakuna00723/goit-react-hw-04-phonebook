import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { Box } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      return parsedContacts;
    }
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (values, { resetForm }) => {
    let newContact = values;

    const checkContact = contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (checkContact.length) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } else {
      newContact.id = nanoid();
      setContacts(prevState => [...prevState, newContact]);

      resetForm({
        name: '',
        number: '',
      });
    }
  };

  const filterContacts = () => {
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const onFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const onDelete = contactId => {
    setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
  };

  return (
    <Box>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter onFilter={onFilter} />
      <ContactList filtered={filterContacts()} onDelete={onDelete} />
    </Box>
  );
};
