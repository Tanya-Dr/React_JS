import { useState } from 'react';
import './InputMessage.css';

export const InputMessage = (props) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue((prevValue) => event.target.value);
    };

    const clearInput = () => {
        setValue((prevValue) => '');
    };

    return (
        <form action="#" className = "message__form">
            <input type="text" value={value} placeholder = "Enter your message" className = "message__input" onChange={handleChange}/>
            <button type="submit" className = "message__button" onClick={() => {
                props.onClick(value);
                clearInput();
            }}> Send </button>
        </form>
    );
};