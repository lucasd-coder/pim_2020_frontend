import React, { useState, useEffect} from 'react';
import HeaderNav from '../../components/HeaderNav';
import api from '../../server/api';



import Pagination from './Pagination';

import './style.css';



export default function ProductPage() {

    const [recordsResponse, setRecordsResponse] = useState([]);
    const [activePage, setActivePage] = useState(0);
    const [recordsResponsetotal, setRecordsResponseTotal] = useState([]);

    useEffect(() => {
        api.get(`/produtos/?categorias=1&page=${activePage}&linesPerPage=12`)
            .then(response => {
                setRecordsResponse(response.data.content);
                setRecordsResponseTotal(response.data.totalPages);
                
            })
    }, [activePage]);

   

    const handlePageChange = (index) => {
        setActivePage(index)
    }
    return (
        <div className="page-container">
            <HeaderNav title="Livro de oferta" text="Home" subText="Compra" />
            <div className="teste">
               <table className="records-table" cellPadding="0" cellSpacing="0" >
                    <thead>
                        <tr>
                            <th>NOME</th>
                            <th>PREÇO</th>                                      
                        </tr>
                </thead>
                <tbody>{recordsResponse?.map(data => (
                    <tr key={data.id}>
                        <td className="text-secondary">{data.nome}</td>
                        <td className="text-primary">{`R$ ${data.preco}.00 `}</td> 
                    </tr>

                ))}
                </tbody>
             
                </table>

                <Pagination
                    activePage={activePage}
                    goToPage={handlePageChange}
                    totalPages={recordsResponsetotal}
                /> 


            </div>

        </div>
        );
}