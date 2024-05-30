import React from 'react';
import { Link } from 'react-router-dom';

export default function Recolhas({ porDevolverRecolher, getDate, BASE_URL, propsDate }) {

    const justDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    console.log(justDate(propsDate));


    return (
        <>
            {porDevolverRecolher.map(req => {
                const sortedUsers = [...req.utilizador].sort((a, b) => a.role_utilizador - b.role_utilizador);
                
                if (req.data_inicio_requisicao === justDate(propsDate) && req.estado_requisicao === 4) {
                    return (
                        <Link to={`/requisicao/${req.id_requisicao}`} key={req.id_requisicao} style={{ textDecoration: 'none', color: '#000' }}>
                            <div className="background-grey-300 p-4 mb-2" style={{ borderRadius: "1rem" }}>
                                {sortedUsers.map((user, index) => (
                                    (user.role_utilizador === 3 && user.tipo_utilizador === 3) ? (
                                        <div
                                            key={index}
                                            style={{ fontSize: "0.8rem", fontWeight: "700" }}
                                            className='text-green-900'
                                        >
                                            Hoje, {getDate(req.data_inicio_requisicao)}
                                        </div>
                                    ) : (user.role_utilizador === 3 && user.tipo_utilizador === 2) ? (
                                        <div
                                            key={index}
                                            style={{ fontSize: "0.8rem", fontWeight: "700" }}
                                            className='text-blue-900'
                                        >
                                        </div>
                                    ) : null
                                ))}
                                <div className="d-flex align-items-center mb-2">
                                    <div style={{ fontSize: "1rem", fontWeight: "400" }}>Requisição {req.id_requisicao}</div>
                                    <div className="ps-5" style={{ fontSize: "1rem", fontWeight: "400" }}>{req.nome_uc_contexto}</div>
                                </div>
                                <div className="row">
                                    <div className="d-flex align-items-center mb-2">
                                        {sortedUsers.map((user, index) => (
                                            user.role_utilizador === 3 ? (
                                                <div className='flex align-items-center' key={index}>
                                                    <img className="rounded-full" src={`${BASE_URL}${user.avatar_utilizador}`} style={{ height: "3rem", width: "3rem", marginRight: "0.5rem" }} alt={`Avatar de ${user.nome_utilizador}`} />
                                                    <div className='me-4'>
                                                        <div className='font-semibold' style={{ fontSize: "0.8rem" }}>{user.nome_utilizador}</div>
                                                        <div className='text-green-900' style={{ fontSize: "0.8rem", fontWeight: "400" }}>{user.email_utilizador}</div>
                                                    </div>
                                                </div>
                                            ) : user.role_utilizador === 4 ? (
                                                <img key={index} className="rounded-full" src={`${BASE_URL}${user.avatar_utilizador}`} style={{ height: "2rem", width: "2rem", marginRight: "0.5rem" }} alt={`Avatar de ${user.nome_utilizador}`} />
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                } else {
                    return null;
                }
            })}
        </>
    );
}
