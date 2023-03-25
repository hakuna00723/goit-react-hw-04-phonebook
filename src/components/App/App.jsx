import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { Box } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts')
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
      return
    }
    
    this.setState({
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
    });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }

  addContact = (values, { resetForm }) => {
    let newContact = values;
    const { contacts } = this.state;

    const checkContact = contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (checkContact.length) {
      alert(`${newContact.name} is already in contacts`);
      return;

    } else {
      newContact.id = nanoid();
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));

      resetForm({
        name: '',
        number: '',
      });
    }
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }
    return contacts.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  onFilter = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  onDelete = contactId => {
    const { contacts } = this.state;

    this.setState({
      contacts: contacts.filter(({ id }) => id !== contactId),
    });
  };

  render() {
    return (
      <Box>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter onFilter={this.onFilter} />
        <ContactList
          filtered={this.filterContacts()}
          onDelete={this.onDelete}
        />
      </Box>
    );
  }
}
