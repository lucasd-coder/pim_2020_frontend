import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';


import Input from '../../components/InputNLabel';
import backIcon from '../../assets/images/back.svg';
import api from '../../server/api';
import { getLocalUser, logout } from '../../server/configUser';
import history from '../../server/history';


import './style.css';

export default function ForgotPage() {


    const [email, setEmail] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = false;

        if (!isEmail(email)) {
            formErrors = true;
            toast.error(' E-mail inválido');
        }


        if (formErrors) return;

        const tok = getLocalUser();


        api.post('/auth/forgot', {
            email
        }).then(() => {

            toast.success("Redefinição feita com sucesso!");
            logout(tok)
            history.push('/');

        }).catch(() => {
            toast.error('E-mail inválidos.');
        })


    }

    return (
        <div id="forgot-main">
            <main>
                <form onSubmit={handleSubmit}>
                    <Link to="/" className="page-image">
                        <img src={backIcon} alt="Voltar" />
                    </Link>

                    <fieldset>
                        <h1>Eita, esqueceu sua senha?</h1>
                        <legend>Exchange Viking</legend>
                        <p className="page-text">Não esquenta, vamos dar um jeito nisso.</p>


                        <Input
                            name="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />


                        <button type="submit">
                            Entrar
                        </button>


                    </fieldset>
                </form>
            </main>
        </div>
       );

}