import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { isEmail } from 'validator';



import {  setLocalUser } from '../../server/configUser';
import history from '../../server/history';
import api from '../../server/api';

import Input from '../../components/InputNLabel';
import imgPassword from '../../assets/images/ver_senha.svg';


import './style.css';


export default function LoginPage() {


    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrors = false;

        if (!isEmail(email)) {
            formErrors = true;
            toast.error(' E-mail inválido');
        }
        if (senha.length < 6 || senha.length > 255) {
            formErrors = true;
            toast.error('Senha inválida');
        }

        if (formErrors) return;

        

        await api.post('/login', {
            email,
            senha
        }).then((response) => {

            toast.success("login feito");
            const tok = response.headers.authorization;
            const token = tok.substring(7);
            setLocalUser(token);
            history.push('/products');
        }).catch((e) => {            
            toast.error('Usuário ou senha inválidos.');
        })

       



    };




    const mostrarSenha = () => {
        const tipo = document.getElementById("senha");
        if (tipo?.getAttribute("type") === 'password') {

            return tipo.setAttribute('type', 'text');
        }
        else {

            return tipo?.setAttribute('type', 'password');
        }

    }


    return (
        <div id="login-page">

            <main>

                <form onSubmit={handleSubmit}>

                    <fieldset>

                        <h1> Fazer login </h1>
                        <legend>Exchange Viking</legend>
                        <Input
                            name="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            name="senha"
                            placeholder="Senha"
                            type="password"
                            id="senha"
                            onChange={(e) => setSenha(e.target.value)}
                            value={senha}
                        />

                        <img src={imgPassword}
                            alt="revelar senha" className="password-reveal"
                            onClick={() => mostrarSenha()}
                        />

                        <div className="login-Remember" id="input">
                            <input type="checkbox" name="lebrar-me" />
                            <label htmlFor="lebrar-me"> Lembrar-me</label>
                        </div>

                        <p className="login-forgot"><Link to="/forgots">Esqueci minha senha</Link></p>

                        <div className="login-rod">
                            <p>Não tem conta?</p>
                            <Link to="/registrations">Cadastra-se</Link>
                        </div>


                        <button type="submit">
                            Entrar
                        </button>


                    </fieldset>
                </form>
            </ main>



        </div>
    )

}