import css from './Form.module.css';
import { Input } from 'components/Input/Input';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Form = ({ createContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createContact({ name, number });
    setName('');
    setNumber('');
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Phonebook</h2>
      <Input
        type={'text'}
        name={'name'}
        value={name}
        handleChange={handleChange}
      />
      <Input
        type={'tel'}
        name={'number'}
        value={number}
        handleChange={handleChange}
      />
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};

export default Form;

Form.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  createContact: PropTypes.func.isRequired,
};
