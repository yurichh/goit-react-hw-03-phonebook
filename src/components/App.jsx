import { Component } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleAddContact = obj => {
    this.setState(prev => {
      return {
        contacts: [...prev.contacts, obj],
      };
    });
  };

  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(c =>
      c.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <>
        <h1 className="title">Phonebook</h1>
        <ContactForm
          contacts={this.state.contacts}
          handleAddContact={this.handleAddContact}
          handleChange={this.handleChange}
        />

        <section className="contacts-wrapper">
          <h1 className="title">Contacts</h1>
          <Filter handleChange={this.handleChange} />
          <ContactList
            contactsArray={this.getVisibleContacts()}
            handleDelete={this.handleDelete}
          />
        </section>
      </>
    );
  }
}
