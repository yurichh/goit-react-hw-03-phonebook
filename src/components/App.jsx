import { Component } from 'react';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const localData = localStorage.getItem('contacts');
    if (localData) this.setState({ contacts: JSON.parse(localData) });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts) {
      prevState.contacts.length !== this.state.contacts.length &&
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
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
