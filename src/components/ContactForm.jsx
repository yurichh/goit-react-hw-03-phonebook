import React from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

const ContactForm = ({ contacts, handleChange, handleAddContact }) => {
  const createContactObj = e => {
    e.preventDefault();
    let nameInput = e.target.form[0];
    let numberInput = e.target.form[1];

    /* Перевірка на заповнення полів */
    if (!nameInput.value || !numberInput.value) {
      Notiflix.Notify.warning('Ooops... Something missed', {
        position: 'center-top',
        distance: '50px',
        fontSize: '40px',
        width: '600px',
      });
      return;
    }

    const newContactObj = {
      name: nameInput.value,
      number: numberInput.value,
      id: nanoid(),
    };

    /* Перевірка на повторення контакту */
    if (checkNameForRepeat(nameInput.value)) {
      Notiflix.Notify.warning(`${nameInput.value} is already in contacts`, {
        position: 'center-top',
        distance: '50px',
        fontSize: '40px',
        width: '600px',
      });
      return;
    }

    handleAddContact(newContactObj);

    e.target.form.reset();
  };

  const getContactsNames = () => {
    const namesArray = contacts.map(contact => contact.name);
    return namesArray;
  };

  const checkNameForRepeat = contactName => {
    return getContactsNames().some(
      name => name.toLowerCase() === contactName.toLowerCase()
    );
  };

  return (
    <form action="submit" className="add-form">
      <label htmlFor="name" className="add-label">
        Name
      </label>
      <input
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={handleChange}
        type="text"
        name="name"
        required
        className="add-input"
      />
      <label htmlFor="number" className="add-label">
        Number
      </label>
      <input
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        onChange={handleChange}
        type="tel"
        name="number"
        required
        className="add-input"
      />
      <button className="add-btn" type="submit" onClick={createContactObj}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
