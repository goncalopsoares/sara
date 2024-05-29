import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import HomeReqAtiva from "../components/Student/HomeReqAtiva";
import HomeUcsAtiva from "../components/Student/HomeUcsAtiva";

/*
function Modal({ show, onClose, equipamentos, contexto, comentarioprofessor, comentariosara }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{fontSize:"0.2rem"}}>
            <div className="bg-white p-6 rounded-lg">
                <button onClick={onClose} className="float-right text-red-500">Close</button>
                {equipamentos.map((equipamento, index) => (
                    <div key={index} className="mb-4">
                        <p className='font-bold'>{equipamento.nome_modelo_equipamento}</p>
                        {equipamento.imagem_modelo_equipamento && <img src={equipamento.imagem_modelo_equipamento} alt={equipamento.nome_modelo_equipamento} className="mb-2" />}
                        <p><strong>Marca:</strong> {equipamento.nome_marca_equipamento}</p>
                    </div>
                ))}
                <p><strong>Comentário do Professor:</strong> {comentarioprofessor}</p>
                <p><strong>Comentário do SARA:</strong> {comentariosara}</p>
                <p><strong>Contexto:</strong> {contexto}</p>
            </div>
        </div>
    );
}
*/

const Home = () => {
    const [requisicao, setRequisicao] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(null);
    const [error2, setError2] = useState(null);
    const [modalData, setModalData] = useState({ show: false, equipamentos: [], contexto: '', comentarioprofessor: '', comentariosara: '' });
    const [ucs_aluno, setUcs_aluno] = useState([]);

    const { user } = useStateContext();

    const handleShowMore = (equipamentos, contexto, comentarioprofessor, comentariosara) => {
        setModalData({ show: true, equipamentos, contexto, comentarioprofessor, comentariosara });
    };

    const handleCloseModal = () => {
        setModalData({ show: false, equipamentos: [], contexto: '', comentarioprofessor: '', comentariosara: '' });
    };

    useEffect(() => {
        if (user.id_utilizador) {
            axiosClient.get(`/estudantehome/${user.id_utilizador}`)
                .then(response => {
                    console.log('Requisicao:', response.data);
                    const result = response.data.EstudanteHome;
                    setRequisicao(result);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Erro ao obter equipamentos:', error);
                    setError(error);
                    setLoading(false);
                });
        }
    }, [user.id_utilizador]); // Adicionada a dependência correta

    useEffect(() => {
        if (user.id_utilizador) {
            axiosClient.get(`/estudantehome/uc/${user.id_utilizador}`)
                .then(response => {
                    console.log('ucs', response.data);
                    const result_uc = response.data;
                    setUcs_aluno(result_uc);
                    setLoading2(false);
                })
                .catch(error => {
                    console.error('Erro ao obter UCs:', error);
                    setError2(error);
                    setLoading2(false);
                });
        }
    }, [user.id_utilizador]); // Adicionada a dependência correta

    return (
        <>
            <div style={{marginBottom:"4rem"}}>
            <div style={{marginBottom:"1rem"}}>
                <div className="mobile-title">Olá, {user.nome_utilizador?.split(" ")[0]}</div>
            </div>

            {/* Requisições Ativas */}

            <div>
                <div className="mobile-subtitle mb-4">Requisições Ativas</div>
                {loading && <p>Loading...</p>}
                <div>
                    <div>
                        {requisicao.map(req => {
                            const ultimoEstado = req.estados[req.estados.length - 1];
                            if ([1, 3, 5, 6].includes(ultimoEstado.id_estado)) {
                                return (
                                    <HomeReqAtiva
                                        requisicao={requisicao}
                                        handleShowMore={handleShowMore}
                                        req={req}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>

            {/* UCs */}

            <div>
                <div className="mobile-subtitle mb-4 mt-4">As minhas UCs</div>
                {loading && <p>Loading...</p>}
                <div className="row">
                    {ucs_aluno.map(uc => (
                        <div className="col-6" key={uc.id}>
                            <HomeUcsAtiva uc={uc} />
                        </div>
                    ))}
                </div>
            </div>
            </div>
            {/*
            <Modal
                show={modalData.show}
                onClose={handleCloseModal}
                equipamentos={modalData.equipamentos}
                contexto={modalData.contexto}
                comentarioprofessor={modalData.comentarioprofessor}
                comentariosara={modalData.comentariosara}
            />
            */}
        </>
    );
};

export default Home;
