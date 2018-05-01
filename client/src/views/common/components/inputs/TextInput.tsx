import * as React from 'react';
import './TextInput.css';

const TextInput = ({ name, placeholder = '', value = '', type = 'text', onChange = () => {} }) => (
    <input className='textInput' name={ name } placeholder={ placeholder } value={ value } onChange={ onChange } type={ type } />
);

export default TextInput;