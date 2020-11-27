import React from 'react';


import './style.css';

export default function InputNLabel(props) {
    const {name, ...rest } = props;
    return (
        <div className="input-unlabeled">
            <input type="text" id={name} {...rest} />
        </div>
        )

}

