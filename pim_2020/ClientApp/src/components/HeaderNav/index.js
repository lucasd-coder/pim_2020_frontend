import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';


import { logout, getLocalUser } from '../../server/configUser';
import history from '../../server/history';


import './style.css';


export default function HeaderNav(props) {
    const { title, children, description, text, subText } = props;

    function handleClick() {
        const tok = getLocalUser();
        logout(tok);
        history.push('/');
    }

    return (
        <header className="page-headerNav">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
               
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">{ text} <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/purchases"> {subText}</Link>
                        </li>                       
                                           
                    </ul>
                </div>
                <FaSignOutAlt size={20} className="logout-nav" onClick={() => handleClick()} />
            </nav>
            
       
            <div className="headerNav-content">

                <strong className="content-strong">{title}</strong>
                {description && <p>{description}</p>}
                {children}

            </div>


        </header>           
       
       )
}