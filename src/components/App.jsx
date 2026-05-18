import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Input } from './Input/Input';
import { ContactsList } from './ContactsList/ContactList';
import { ContactItem } from './ContactItem/ContactItem';
import Form from './Form/Form';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilterInput = ({ target }) => {
    setFilter(target.value);
  };

  const createContact = ({ name, number }) => {
    const contactItem = {
      id: nanoid(),
      name,
      number,
    };
    contacts.some(
      item => item.name.toLowerCase() === contactItem.name.toLowerCase()
    )
      ? alert(`${name} is already in contacts`)
      : setContacts([...contacts, contactItem]);
  };

  const filterItems = () => {
    return contacts.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteItem = id => {
    setContacts(contacts.filter(item => item.id !== id));
  };

  return (
    <>
      <Form createContact={createContact} />
      <ContactsList>
        <Input
          type={'text'}
          name={'filter'}
          value={filter}
          handleChange={changeFilterInput}
        />
        {filterItems().map(({ id, name, number }) => (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            deleteItem={deleteItem}
          />
        ))}
      </ContactsList>
    </>
  );
};

export default App;

App.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
};
