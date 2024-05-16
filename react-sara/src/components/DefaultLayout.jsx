import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from "../contexts/contextprovider";
import { LuClipboard } from "react-icons/lu";

function Modal({ show, onClose, equipamentos, contexto, comentario }) {
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
                <p><strong>Comentário do Professor:</strong> {comentario}</p>
                <p><strong>Contexto:</strong> {contexto}</p>
            </div>
        </div>
    );
}

export default function DefaultLayout() {






    const { user, token } = useStateContext();
    const [requisicao, setRequisicao] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalData, setModalData] = useState({ show: false, equipamentos: [], contexto: '', comentario: '' });
    
    

    const handleShowMore = (equipamentos, contexto, comentario) => {
        setModalData({ show: true, equipamentos, contexto, comentario });
    };

    const handleCloseModal = () => {
        setModalData({ show: false, equipamentos: [], contexto: '', comentario: '' });
    };





    if (!token) {
        return <Navigate to="/login" />;
    }




    useEffect(() => {
        axios.get('http://localhost:8000/api/estudantehome/6')
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
    }, []);


    return (
        <div>
            <div id="defaultLayout">
                <div>
                    <header className="bg-green-400 p-4 text-white flex justify-between">
                        <div>Header</div>
                        <div>
                            <a href="" className='button-red'>Logout</a>
                        </div>
                    </header>
                    <main className="p-4">


                        <Outlet />

<div className="text-4xl mt-4 mb-4 ">Requisições Ativas</div>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {requisicao.map(req => (
                                <div key={req.id_requisicao} className="bg-white p-4 rounded-lg shadow-lg border-2">
                                    <p>{req.nome_uc_contexto}</p>
                                    <h3 className="text-2xl font-bold">{req.nome_requisicao}</h3>
                                    <p className='text-gray-500 text-end mt-2 mb-2'>{req.nome_estado}</p>
                                    <p className='text-gray-500'><strong>Data recolha:</strong> {req.data_inicio_requisicao}</p>
                                    <p className='text-gray-500'><strong>Data devolução:</strong> {req.data_fim_requisicao}</p>
                                    <button
                                        onClick={() => handleShowMore(req.equipamento, req.contexto_requisicao, req.comentario_professor_requisicao)}
                                        className='mt-4 border-r-2 text-white bg-green-950 p-2 rounded'
                                    >
                                        <LuClipboard className='inline-block align-middle me-3 ' />Ver requisição
                                    </button>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
            <Modal
                show={modalData.show}
                onClose={handleCloseModal}
                equipamentos={modalData.equipamentos}
                contexto={modalData.contexto}
                comentario={modalData.comentario}
            />
        </div>
    );
}
