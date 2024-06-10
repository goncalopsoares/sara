//home.jsx//
import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import HomeReqAtiva from "../components/Student/HomeReqAtiva";
import HomeUcsAtiva from "../components/Student/HomeUcsAtiva";
import HomeReqValidar from '../components/prof/HomeReqValidar';
import { set } from 'date-fns';

const Home = () => {
    const [requisicao, setRequisicao] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [error, setError] = useState(null);
    const [error2, setError2] = useState(null);
    const [error3, setError3] = useState(null);
    const [modalData, setModalData] = useState({ show: false, equipamentos: [], contexto: '', comentarioprofessor: '', comentariosara: '' });
    const [ucs_aluno, setUcs_aluno] = useState([]);
    const [requisicaoPendente, setRequisicaoPendente] = useState([]);
    const [ucs_professor, setUcs_professor] = useState([]);
    const [requisicaoProfessor, setRequisicaoProfessor] = useState([]);

    const { user, cart } = useStateContext();

    const handleShowMore = (equipamentos, contexto, comentarioprofessor, comentariosara) => {
        setModalData({ show: true, equipamentos, contexto, comentarioprofessor, comentariosara });
    };

    const handleCloseModal = () => {
        setModalData({ show: false, equipamentos: [], contexto: '', comentarioprofessor: '', comentariosara: '' });
    };

    useEffect(() => {

    if(user.tipo_utilizador === 3){
            axiosClient.get(`/estudantehome/${user.id_utilizador}`)
                .then(response => {
                    console.log('Requisicao:', response.data);
                    const result = response.data.EstudanteHome;
                    setRequisicao(result || []);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Erro ao obter equipamentos:', error);
                    setError(error);
                    setLoading(false);
                });

            axiosClient.get(`/estudantehome/uc/${user.id_utilizador}`)
                .then(response => {
                    console.log('ucs', response.data);
                    const result_uc = response.data;
                    setUcs_aluno(result_uc || []);
                    setLoading2(false);
                })
                .catch(error => {
                    console.error('Erro ao obter UCs:', error);
                    setError2(error);
                    setLoading2(false);
                });

                 }else if(user.tipo_utilizador === 2){

                    axiosClient.get(`/professorhome/${user.id_utilizador}`)

                    .then(response => {
                        console.log('Requisicao:', response.data);
                        const resultProfessor = response.data.ProfessorHome;
                        setRequisicaoProfessor(resultProfessor);
                        console.log('professor',resultProfessor);
                        console.log('professor',requisicaoProfessor);

                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Erro ao obter dados:', error);
                        setError(error);
                        setLoading(false);
                    });
            axiosClient.get(`/professorhome/porvalidar/${user.id_utilizador}`)
                .then(response => {
                    console.log('validar', response.data);
                    const resultsPendente = response.data.ProfessorValidate || [];
                    setRequisicaoPendente(resultsPendente);
                    setLoading3(false);
                })
                .catch(error => {
                    console.error('Erro ao obter UCs:', error);
                    setError3(error);
                    setLoading3(false);
                });

            axiosClient.get(`/professorhome/uc/${user.id_utilizador}`)
                .then(response => {
                    console.log('ucsprofessor', response.data);
                    const result_uc = response.data;
                    setUcs_professor(result_uc || []);
                    setLoading2(false);
                })
                .catch(error => {
                    console.error('Erro ao obter UCs:', error);
                    setError2(error);
                    setLoading2(false);
                });

            }
    }, [user.id_utilizador, user.tipo_utilizador]);




    return (
        <>
            <div style={{ marginBottom: "4rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <div className="mobile-title">Olá, {user.nome_utilizador?.split(" ")[0]}</div>
                </div>

                <div>
                    <div className="mobile-subtitle mb-4">Requisições Ativas</div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            {user.tipo_utilizador === 3 && (
                                requisicao.length === 0 ? (
                                    <p>Não tem requisições ativas.</p>
                                ) : (
                                    requisicao.map(req => {
                                        const ultimoEstado = req.estados[req.estados.length - 1];
                                        if ([1, 2, 3, 4].includes(ultimoEstado.id_estado)) {
                                            return (
                                                <HomeReqAtiva
                                                    key={req.id_requisicao}
                                                    requisicao={requisicao}
                                                    handleShowMore={handleShowMore}
                                                    req={req}
                                                />
                                            );
                                        }
                                        return null;
                                    })
                                )
                            ) }
                           {user.tipo_utilizador === 2 && (
                                requisicaoProfessor && (
                                    requisicaoProfessor.length === 0 ? (
                                        <p>Não tem requisições ativas.</p>
                                    ) : (
                                        requisicaoProfessor.map(req => {
                                            if (!req.estados || req.estados.length === 0) {
                                                // Caso não haja estados, não podemos acessar req.estados[req.estados.length - 1]
                                                return null;
                                            }
                                            const ultimoEstado = req.estados[req.estados.length - 1];
                                            if (ultimoEstado && [2, 3, 4].includes(ultimoEstado.id_estado)) {
                                                return (
                                                    <HomeReqAtiva
                                                        key={req.id_requisicao}
                                                        requisicao={req} // Aqui deve ser 'req', não 'requisicaoProfessor'
                                                        handleShowMore={handleShowMore}
                                                        req={req}
                                                    />
                                                );
                                            }
                                            return null;
                                        })
        )
    )
)}


                        </div>
                    )}
                </div>

                {user.tipo_utilizador === 2 && (
                    <div>
                        <div className="mobile-subtitle mb-4">Por validar</div>
                        {loading3 ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                {requisicaoPendente?.length === 0 ? (
                                    <p>Não tem requisições por validar.</p>
                                ) : (
                                    requisicaoPendente.map(req => {
                                        const ultimoEstado = req.estado[req.estado.length - 1];
                                        if (ultimoEstado.id_estado === 1) {
                                            return (
                                                <HomeReqValidar
                                                    key={req.id_requisicao}
                                                    requisicao_pendente={requisicaoPendente}
                                                    handleShowMore={handleShowMore}
                                                    req={req}
                                                />
                                            );
                                        }
                                        return null;
                                    })
                                )}
                            </div>
                        )}
                    </div>
                )}

<div>
    <div className="mobile-subtitle mb-4 mt-4">As minhas UCs</div>
    {loading2 ? (
        <p>Loading...</p>
    ) : (
        <div className="row">
            {user.tipo_utilizador === 3 ? (
                ucs_aluno.length === 0 ? (
                    <p>Não tem UCs associadas.</p>
                ) : (
                    ucs_aluno.map(uc => (
                        <div className="col-6" key={uc.id}>
                            <HomeUcsAtiva uc={uc} />
                        </div>
                    ))
                )
            ) : null}

            {user.tipo_utilizador === 2 ? (
                ucs_professor.length === 0 ? (
                    <p>Não tem UCs associadas.</p>
                ) : (
                    ucs_professor.map(uc => (
                        <div className="col-6" key={uc.id}>
                            <HomeUcsAtiva uc={uc} />
                        </div>
                    ))
                )
            ) : null}
        </div>
    )}
</div>

            </div>
        </>
    );
};

export default Home;
