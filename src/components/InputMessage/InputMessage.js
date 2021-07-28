import { useState } from 'react';
import './InputMessage.css';

export const InputMessage = ({ onSendMessage }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(value);
        setValue('');
    };

    return (
        <form className = "message__form" onSubmit = {handleSubmit}>
            <input type="text" value={value} placeholder = "Enter your message" className = "message__input" onChange={handleChange}/>
            <button type="submit" className = "message__button"> Send </button>
        </form>
    );
};