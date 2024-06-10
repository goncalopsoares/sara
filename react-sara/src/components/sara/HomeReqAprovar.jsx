import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomeReqAprovar({ porAprovar }) {

    const [filter, setFilter] = useState('mostRecent');
    const [filteredData, setFilteredData] = useState([...porAprovar]);
    const [users, setUsers] = useState([]);

    const BASE_URL = 'http://deca-sara.ua.pt';

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    function calculateDaysPassed(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const timeDifference = today - date;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }

    useEffect(() => {
        let sortedData = [...porAprovar];
        if (filter === 'mostRecent') {
            sortedData.sort((a, b) => new Date(b.data_estado) - new Date(a.data_estado));
        } else {
            sortedData.sort((a, b) => new Date(a.data_estado) - new Date(b.data_estado));
        }
        setFilteredData(sortedData);
    }, [filter, porAprovar]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <>
            <div className='row'>
                <div className="filter-dropdown mt-3 w-100">
                    <select className='text-green-900 background-green-50 rounded-md border-green-900 w-100' id="filter" value={filter} onChange={handleFilterChange}>
                        <option value="mostRecent">Ordenar por tempo: Mais recentes primeiro</option>
                        <option value="moreAntique">Ordenar por tempo: Mais antigas primeiro</option>
                    </select>
                </div>
            </div>
            <div className='row mt-4'>
                {filteredData.map(req => {
                    const sortedUsers = [...req.utilizador].sort((a, b) => a.role_utilizador - b.role_utilizador);
                    return (
                        <Link to={`/requisicao/${req.id_requisicao}`} key={req.id_requisicao} style={{ textDecoration: 'none', color: '#000' }}>
                            <div key={req.id_requisicao} className={`background-grey-300 p-4 mb-2`} style={{ borderRadius: "1rem" }}>
                                {
                                    sortedUsers.map((user, index) =>
                                        (user.role_utilizador === 3 && user.tipo_utilizador === 3) ? <div
                                            key={index}
                                            style={{ fontSize: "0.8rem", fontWeight: "700" }}
                                            className='text-green-900'
                                        >
                                            {calculateDaysPassed(req.data_estado) > 1 ? (
                                                <span> Há {calculateDaysPassed(req.data_estado)} dias</span>
                                            ) : calculateDaysPassed(req.data_estado) === 1 ? (
                                                <span> Há {calculateDaysPassed(req.data_estado)} dia</span>
                                            ) : (
                                                <span>Hoje</span>
                                            )}
                                        </div> : (user.role_utilizador === 3 && user.tipo_utilizador === 2) ? <><div className='row d-flex justify-between'><div
                                            key={index}
                                            style={{ fontSize: "0.8rem", fontWeight: "700" }}
                                            className='col-6 text-blue-900'
                                        >
                                            {calculateDaysPassed(req.data_estado) > 1 ? (
                                                <span> Há {calculateDaysPassed(req.data_estado)} dias</span>
                                            ) : calculateDaysPassed(req.data_estado) === 1 ? (
                                                <span> Há {calculateDaysPassed(req.data_estado)} dia</span>
                                            ) : (
                                                <span>Hoje</span>
                                            )}
                                        </div><div className='col-6 text-blue-900 d-flex justify-content-end' style={{ fontSize: "0.8rem", fontWeight: "700" }}>Professor</div></div></> : null
                                    )
                                }
                                <div className="d-flex align-items-center mb-2">
                                    <div style={{ fontSize: "1rem", fontWeight: "400" }}>Requisição {req.id_requisicao}</div>
                                    <div className="ps-5" style={{ fontSize: "1rem", fontWeight: "400" }}>{req.nome_uc_contexto}</div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center mb-2">
                                        {sortedUsers.map((user, index) => (
                                            user.role_utilizador === 3 ? (
                                                <div className='flex align-items-center'>
                                                    <img key={index} className="rounded-full" src={`${BASE_URL}${user.avatar_utilizador}`} style={{ height: "3rem", width: "3rem", marginRight: "0.5rem" }} />
                                                    <div className='me-4'>
                                                        <div className='font-semibold' style={{ fontSize: "0.8rem" }}>{user.nome_utilizador}</div>
                                                        {user.tipo_utilizador === 2 && user.role_utilizador === 3 ? <div className='text-blue-900' style={{ fontSize: "0.8rem", fontWeight: "400" }}>{user.email_utilizador}</div> : <div className='text-green-900' style={{ fontSize: "0.8rem", fontWeight: "400" }}>{user.email_utilizador}</div>}
                                                    </div>
                                                </div>
                                            ) : user.role_utilizador === 4 ? (<img key={index} className="rounded-full" src={`${BASE_URL}${user.avatar_utilizador}`} style={{ height: "2rem", width: "2rem", marginRight: "0.5rem" }} />) : null))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div >
        </>
    );
}