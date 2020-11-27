
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { isEmpty } from 'validator';
import jwtDecode from 'jwt-decode';


import { getLocalUser, logout } from '../../server/configUser';
import { formatDate } from '../../util/formatDate';
import Header from '../../components/Header';
import Input from '../../components/Input';
import api from '../../server/api';
import history from '../../server/history';



import './style.css';

export default function PurchasePage() {

    const [quantidade, setQuantidade] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");

    const [recordsResponse, setRecordsResponse] = useState([]);
    const [recordsResponseItem, setRecordsResponseItem] = useState([
        {
            id: 0,
        },
    ])


    function setRecordItemsValue(position, field, value) {
        const updatedRecordItemsValue = recordsResponseItem.map((record, index) => {
            if (index === position) {
                return { ...record, [field]: value }
            }

            return record;
        });

        setRecordsResponseItem(updatedRecordItemsValue);
    }

    useEffect(() => {
        api.get(`/produtos/?categorias=1`)
            .then(response => {
                setRecordsResponse(response.data.content);
            })
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;

        if (recordsResponse.length < 0) {
            formErrors = true;
            toast.error('O valor Criptomoedas não pode ser fazia');
        }

        if (isEmpty(quantidade)) {
            formErrors = true;
            toast.error('A quantidade não pode ser fazia');
        }

        if (isEmpty(dataPagamento)) {
            formErrors = true;
            toast.error('A data de pagamento não pode ser fazia');

        }

        if (isEmpty(dataVencimento)) {
            formErrors = true;
            toast.error('A data de vencimeto não pode ser fazia');
        }

        const tok = getLocalUser();
        const emails = jwtDecode(tok);
        const email = emails.sub;

        const idEmail = await api.get(`/clientes/email?value=${email}`)
            .then((reponse) => {
                return reponse.data.id;
                    
                
            }).catch((e) => {
                if (e.response.status === 403) {
                    formErrors = true;
                    toast.error('Faça o login novamente seção expirada');
                    logout(tok);
                    history.push("/");
                }
            })
        

        const dataPagamentos = formatDate(dataPagamento, 'pt-br');
        const dataVencimentos = formatDate(dataVencimento, 'pt-br');
        const id = recordsResponseItem['0'].id;


        const dados = {
            "cliente": { "id": idEmail },
            "pagamento": {
                "dataPagamento": dataPagamentos,
                "dataVencimento": dataVencimentos,
                "@type": "pagamentoComBoleto"
            },
            "itens": [
                {
                    "quantidade": Number(quantidade),
                    "produto": { "id": Number(id) }
                },
            ],
            
        }

         api.post('/pedidos', {
            ...dados
        }).then(() => {
            formErrors = true;
            toast.success('Pedido realizado com sucesso');
        }).catch(() => {
            formErrors = true;
            toast.error('Erro com o Pedido a data de pagamento tem que ser a partir da data atual');
        }) 
       

        if (formErrors) return;

       
    }

    return (
        <div id="purchase-main">
            <Header title="Compra da Moeda" text="Exchange Viking" />

            <main>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Registre seu Pedido</legend>
                        <p className="page-text">Preencha os dados abaixo
                        para começar.</p>

                        {recordsResponseItem.map((record, index) => {
                            return (
                                <div key={record.id} className="select-block">
                                    <label htmlFor="produto">Criptomoedas</label>
                                    {}
                                    <select name="id" value={record.id} onChange={(e) => setRecordItemsValue(index, 'id', e.target.value)}>
                                        <option value="DEFAULT" disabled>Selecione uma opção</option>
                                        {recordsResponse.map((option) => {
                                            return <option key={option.id} value={option.id}>{option.nome}</option>
                                        })}
                                    </select>
                                </div>
                            )
                        })}


                        <Input name="quantidade"
                            label="Quantidade"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}

                        />

                        <Input
                            name="dataPagamento"
                            label="Data de Pagamento"
                            type="date"
                            value={dataPagamento}
                            onChange={(e) => setDataPagamento(e.target.value)}

                        />

                        <Input
                            name="dataVencimento"
                            label="Data de Vencimento"
                            type="date"
                            value={dataVencimento}
                            onChange={(e) => setDataVencimento(e.target.value)}
                        />

                        <button type="submit" className="button">
                            Concluir Compra
                        </button>



                    </fieldset>

                </form>
            </main>

        </div>
    );
}