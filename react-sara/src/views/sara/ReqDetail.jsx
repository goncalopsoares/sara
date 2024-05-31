import React, { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import { useParams } from 'react-router-dom';
import { useStateContext } from "../../contexts/contextprovider";
import EstadosMap from '../../components/requisicao/EstadosMap';
import DetalhesRequisicao from '../../components/requisicao/DetalhesRequisicao';
import Comentarios from '../../components/requisicao/Comentarios';
import Equipamentos from '../../components/requisicao/Equipamentos';

export default function ReqDetail() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detalhesRequisicao, setDetalhesRequisicao] = useState(null);
    const [estadoData, setEstadoData] = useState(null);
    const [comentarioSaraData, setComentarioSaraData] = useState('');
    const { user } = useStateContext();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`/sara/requisicao/${id}`);
                setDetalhesRequisicao(response.data[0]);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao obter detalhes da requisição:', error);
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [estadoData, comentarioSaraData]);

    const aprovarRejeitar = async (id, estadoData) => {
        try {
            const response = await axiosClient.post(`/sara/atualizarestado/${id}`, estadoData);
            console.log('Estado atualizado com sucesso:', response.data);
            setEstadoData(null);
            setComentarioSaraData('');
        } catch (error) {
            console.error('Erro ao atualizar estado:', error.response ? error.response.data : error.message);
        }
    };

    const comentar = async (id, comentarioSaraData) => {
        try {
            const response = await axiosClient.post(`/sara/comentar/${id}`, comentarioSaraData);
            console.log('Comentário atualizado com sucesso:', response.data);
            setComentarioSaraData('');
        } catch (error) {
            console.error('Erro ao atualizar comentário:', error.response ? error.response.data : error.message);
        }
    }

    const formatDatePost = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleClick = (event) => {
        const buttonId = event.target.id;
        const estadoId = buttonId === 'button1' ? 4 : 6;

        const data = {
            requisicao_id_requisicao: id,
            estado_id_estado: estadoId,
            data_estado: formatDatePost(new Date()),
        };

        console.log('data:', data);
        setEstadoData(data);
        aprovarRejeitar(id, data);
        console.log('estadoData:', data);
    };

    const handleComment = (newComment) => {
        const data = {
            id_requisicao: id,
            comentario_sara_requisicao: newComment,
        };

        setComentarioSaraData(data);
        comentar(id, data);

    };

    console.log('user', user)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-8 col-sm-7'>
                        <h1>Requisicao {detalhesRequisicao.id_requisicao}: {detalhesRequisicao.nome_requisicao}</h1>
                    </div>
                    <div
                        className={`col-4 col-sm-5 ${user.tipo_utilizador === 2 && detalhesRequisicao.id_estado === 1 ? 'position-fixed bottom-0' : ''}`}
                        style={user.tipo_utilizador === 2 && detalhesRequisicao.id_estado === 1 ? { marginBottom: '6rem' } : {}}
                    >
                        {user.tipo_utilizador === 1 && detalhesRequisicao.id_estado === 3 && (
                            <div className='flex justify-end'>
                                <button id='button1' onClick={handleClick} className='btn btn-success mr-5'>Aprovar</button>
                                <button id='button2' onClick={handleClick} className='btn btn-danger'>Rejeitar</button>
                            </div>)}
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-7">
                        <div className="flex justify-center mb-5">
                            <EstadosMap detalhesRequisicaoEstado={detalhesRequisicao.id_estado} />
                        </div>
                        <div>
                            <DetalhesRequisicao detalhesRequisicao={detalhesRequisicao} />
                        </div>
                        <div className='row my-4'>
                            <h3 class='mobile-subtitle'>Comentários</h3>
                            <Comentarios comentarioProfessorRequisicao={detalhesRequisicao.comentario_professor_requisicao} comentarioSaraRequisicao={detalhesRequisicao.comentario_sara_requisicao} utilizadores={detalhesRequisicao.utilizador} onSubmitComment={handleComment} currentUser={user} />
                        </div>

                    </div>
                    <div className='col-5'>
                        <h3>Equipamentos</h3>
                        <Equipamentos listaEquipamentos={detalhesRequisicao.equipamento} />

                    </div>
                </div>
            </div>
        </>
    );
};