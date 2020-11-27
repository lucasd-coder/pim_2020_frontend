import React from 'react';


import './style.css';

export default function Input(props) {
    const { label, name, ...rest } = props;

    return (

        <div className="input-block-regis">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} />
        </div>

    );


}