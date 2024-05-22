

import React, { useState, useEffect } from 'react';
import { LuClipboard } from "react-icons/lu";
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';

function Modal({ show, onClose, equipamentos, contexto, comentarioprofessor, comentariosara }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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

const Users = () => {
    const [requisicao, setRequisicao] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalData, setModalData] = useState({ show: false, equipamentos: [], contexto: '', comentarioprofessor: '', comentariosara: '' });

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

    const getCardColor = (estadoId) => {
        switch (estadoId) {
            case 2:
            case 4:
                return 'bg-red-100'; 
            case 7:
                return 'bg-green-100'; 
            default:
                return 'bg-white';
        }
    };

    return (
        <div>
            <div className="text-4xl mt-6 mb-4">Requisições Passadas</div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requisicao.map(req => {
                    const ultimoEstado = req.estados[req.estados.length - 1];
                    if ([2, 4, 7].includes(ultimoEstado.id_estado)) {
                        return (
                            <div key={req.id_requisicao} className={`${getCardColor(ultimoEstado.id_estado)} p-4 rounded-lg shadow-lg border-2`}>
                                <p>{req.nome_uc_contexto}</p>
                                <h3 className="text-2xl font-bold">{req.nome_requisicao}</h3>
                                <p className='text-gray-500 text-end mt-2 mb-2'>{ultimoEstado.nome_estado}</p>
                                <p className='text-gray-500'><strong>Data recolha:</strong> {req.data_inicio_requisicao}</p>
                                <p className='text-gray-500'><strong>Data devolução:</strong> {req.data_fim_requisicao}</p>
                                <button
                                    onClick={() => handleShowMore(req.equipamento, req.contexto_requisicao, req.comentario_professor_requisicao, req.comentario_sara_requisicao)}
                                    className='mt-4 border-r-2 text-white bg-green-950 p-2 rounded'
                                >
                                    <LuClipboard className='inline-block align-middle me-3 ' />Ver requisição
                                </button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <Modal
                show={modalData.show}
                onClose={handleCloseModal}
                equipamentos={modalData.equipamentos}
                contexto={modalData.contexto}
                comentarioprofessor={modalData.comentarioprofessor}
                comentariosara={modalData.comentariosara}
            />
        </div>
    );
};

export default Users;
