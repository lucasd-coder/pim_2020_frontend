import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt} from 'react-icons/fa';


import backIcon from '../../assets/images/back.svg';
import { logout, getLocalUser } from '../../server/configUser';
import history from '../../server/history';

import './style.css';


export default function Header(props) {
    const { title, children, description, text } = props;

    function handleClick() {        
        const tok = getLocalUser();
        logout(tok);
        history.push('/');
    }

    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/products">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <p>{text}</p>
                <FaSignOutAlt size={20} className="logout" onClick={() => handleClick()} />
            </div>

            <div className="header-content">
               
                <strong>{title}</strong>
                {description && <p>{description}</p>}
                {children}

            </div>


        </header>

               
   

       
       )
}