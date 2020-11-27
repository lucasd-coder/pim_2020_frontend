import React, { useState} from 'react';
import { isEmail, isEmpty } from 'validator';

import { toast } from 'react-toastify';



import imgPassword from '../../assets/images/ver_senha.svg';
import history from '../../server/history';
import api from '../../server/api';

import { formatDate } from '../../util/formatDate';

import { verifica_cpf_cnpj } from '../../util/veficaCpfOuCnpj';
import Header from '../../components/Header';
import Input from '../../components/Input';


import './style.css';

export default function RegistrationPage() {
    const mostrarSenha = () => {
        const tipo = document.getElementById("senha");
        if (tipo?.getAttribute("type") === 'password') {

            return tipo.setAttribute('type', 'text');
        }
        else {

            return tipo?.setAttribute('type', 'password');
        }

    }

  

    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');
    const [cpfOuCnpj, setCpfOuCnpj] = useState('');
    const [telefone1, setTelefone1] = useState('');
    const [telefone2, setTelefone2] = useState('');
    const [logradoura, setLogradoura] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidadeId] = useState(3);

    async function handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true;
            toast.error('Nome deve ter entre 3 e 255 caracteres ');
        }
        if (!isEmail(email)) {
            formErrors = true;
            toast.error(' E-mail inválido');
        }
        if ((senha.length < 6 || senha.length > 255)) {
            formErrors = true;
            toast.error('Senha deve ter entre 6 e 50 caracteres ');
        }
        if (isEmpty(dataNascimento)) {
            formErrors = true;
            toast.error('data obrigatória');
        }

        if (isEmpty(logradoura)) {
            formErrors = true;
            toast.error('logradouro obrigatória');
        }

        if (isEmpty(numero)) {
            formErrors = true;
            toast.error('numero obrigatória');
        }
        if (isEmpty(cep)) {
            formErrors = true;
            toast.error('cep obrigatória');
        }

        if (isEmpty(telefone1)) {
            formErrors = true;
            toast.error('telefone1 obrigatória');
        }

        let tipos;
        if (verifica_cpf_cnpj(cpfOuCnpj) === 'CPF') {
            tipos = 1;
        }
        else if (verifica_cpf_cnpj(cpfOuCnpj) === 'CNPJ') {
            tipos = 2;
        }
        else {
            formErrors = true;
            toast.error('CpfOuCnpj inválido');
        }


        if (formErrors) return;

        const cpoucn = cpfOuCnpj.match(/\d/g).join("");
        const dataNac = formatDate(dataNascimento, 'pt-br');

        await api.post('/clientes', {
            nome,
            dataNascimento: dataNac,
            email,
            senha,
            cpfOuCnpj: cpoucn,
            tipo: tipos,
            telefone1,
            telefone2,
            logradoura,
            numero,
            complemento,
            bairro,
            cep,
            cidadeId: cidadeId
        }).then(() => {
            toast.success('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(() => {
            toast.error('Erro no cadastro!');
        })
           


        
    }

    return (
        <div id="registration-main">          
            <Header title="Cadastro" text="Exchange Viking" />
            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Cadastro de Clientes</legend>
                        <p className="page-text">Preencha os dados abaixo
                        para começar.</p>

                        <Input
                            name="nome"
                            label="Nome Completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}

                        />

                        <Input
                            name="dataNascimento"
                            type="date"
                            label="Data de Nascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />



                        <Input
                            name="email"
                            label="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            name="senha"
                            type="password"
                            label="Senha"
                            id="senha"
                            value={senha}
                            onChange={(e) => setPassword(e.target.value)}


                        />
                        <img src={imgPassword}
                            alt="revelar senha" className="password-reveal"
                            onClick={() => mostrarSenha()}
                        />

                        <Input
                            name="cpfOuCnpj"
                            label="Cpf ou Cnpj"
                            value={cpfOuCnpj}
                            onChange={(e) => setCpfOuCnpj(e.target.value)}
                            placeholder="Campo somente número"

                        />

                        <Input
                            name="telefone1"
                            label="Telefone1"
                            value={telefone1}
                            onChange={(e) => setTelefone1(e.target.value)}
                        />


                        <Input
                            name="telefone"
                            label="Telefone2"
                            value={telefone2}
                            onChange={(e) => setTelefone2(e.target.value)}
                        />


                        <Input
                            name="logradouro"
                            label="logradouro"
                            value={logradoura}
                            onChange={(e) => setLogradoura(e.target.value)}
                        />


                        <Input
                            name="numero"
                            label="Numero"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />


                        <Input
                            name="complemento"
                            label="Complemento"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <Input
                            name="bairro"
                            label="Bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                        />

                        <Input
                            name="cep"
                            label="Cep"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        />
                        <button type="submit" className="button">
                            Concluir cadastro
                        </button>

                    </fieldset>

                </form>
            </main>

        </div>
    )

}