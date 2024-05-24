import React from 'react';
export default function HomeReqDevolverRecolher({ porDevolverRecolher }) {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            {porDevolverRecolher.map(req => (
                <div key={req.id_requisicao} className={`background-green-50 p-4 mb-2`} style={{ borderRadius: "1rem" }}>
                    <div className="d-flex align-items-center mb-2">
                        <div style={{ fontSize: "1rem", fontWeight: "400" }}>Requisição {req.id_requisicao}</div>
                        <div className="ps-5" style={{ fontSize: "1rem", fontWeight: "400" }}>{req.nome_uc_contexto}</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="font-bold" style={{ fontSize: "0.8rem" }}>
                                Data de Recolha
                            </div>
                            <div style={{ fontSize: "0.8rem" }}>
                                {formatDate(req.data_inicio_requisicao)}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="font-bold" style={{ fontSize: "0.8rem" }}>
                                Data de Devolução
                            </div>
                            <div style={{ fontSize: "0.8rem" }}>
                                {formatDate(req.data_fim_requisicao)}
                            </div>
                            <div className="d-flex mb-2">
                                {req.utilizador.map((user, index) => (

                                    user.role_utilizador === 3 ? (
                                        <div>
                                            <img key={index} className="rounded-full" src={`http://localhost:8000${user.avatar_utilizador}`} style={{ height: "3rem", width: "3rem", marginRight: "0.5rem" }} />
                                            <div style={{ fontSize: "0.8rem", fontWeight: "400" }}>{user.nome_utilizador}</div>
                                            <div style={{ fontSize: "0.8rem", fontWeight: "400" }}>{user.email_utilizador}</div>
                                        </div>
                                    ) : user.role_utilizador === 4 ? (<img key={index} className="rounded-full" src={`http://localhost:8000${user.avatar_utilizador}`} style={{ height: "2rem", width: "2rem", marginRight: "0.5rem" }} />) : null

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}