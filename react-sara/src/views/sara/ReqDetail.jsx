import React, { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import { useParams } from 'react-router-dom';

export default function ReqDetail() {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detalhesRequisicao, setDetalhesRequisicao] = useState(null);
    const labels = ["Requisição realizada", "Autorização do Professor", "Aprovação do SARA", "Recolha", "Devolução"];

    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        };

        const dateString = new Date(date).toLocaleDateString('pt-PT', options);
        const [weekday, dateTime] = dateString.split(',');

        return `${dateTime.trim()}, ${weekday}`;
    };

    useEffect(() => {
        axiosClient.get(`/sara/requisicao/${id}`)
            .then(response => {
                setDetalhesRequisicao(response.data[0]);
                console.log(detalhesRequisicao);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao obter detalhes da requisição:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const aprovarRequisicao = async (id, estadoDataAprovar) => {
        try {
            const response = await axiosClient.post(`/sara/atualizarestado/${id}`, estadoDataAprovar);
            console.log('Estado atualizado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar estado:', error.response ? error.response.data : error.message);
        }
    };

    const rejeitarRequisicao = async (id, estadoDataRejeitar) => {
        try {
            const response = await axiosClient.post(`/sara/atualizarestado/${id}`, estadoDataRejeitar);
            console.log('Estado atualizado com sucesso:', response.data);
        } catch (error) {
            console.error('Erro ao atualizar estado:', error.response ? error.response.data : error.message);
        }
    };

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

    const [estadoDataAprovar, setEstadoDataAprovar] = useState({
        requisicao_id_requisicao: id,
        estado_id_estado: 4,
        data_estado: formatDatePost(new Date()),
    });

    const [estadoDataRejeitar, setEstadoDataRejeitar] = useState({
        requisicao_id_requisicao: id,
        estado_id_estado: 6,
        data_estado: formatDatePost(new Date()),
    });

    const handleAprovarClick = () => {
        aprovarRequisicao(id, estadoDataAprovar);
        console.log('estadoData:', estadoDataAprovar);
    };


    const handleRejeitarClick = () => {
        rejeitarRequisicao(id, estadoDataRejeitar);
        console.log('estadoData:', estadoDataRejeitar);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-sm-7'>
                        <h1>{/*detalhesRequisicao.id_requisicao*/}{detalhesRequisicao.nome_requisicao}</h1>
                    </div>
                    <div className='col-12 col-sm-5 position-fixed bottom-0' style={{ marginBottom: '6rem' }}>
                        <div className='flex justify-end'>
                            <button onClick={handleAprovarClick} className='btn btn-success mr-5'>Aprovar</button>
                            <button onClick={handleRejeitarClick} className='btn btn-danger'>Rejeitar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <div className="flex justify-center mb-5">
                            {(() => {
                                const estados = [];
                                for (let i = 0; i < 5; i++) {
                                    estados.push(
                                        <div key={i} className='m-5' style={{ width: '32px', height: '32px', position: 'relative' }}>
                                            <div
                                                style={{
                                                    borderRadius: '50%',
                                                    width: '2rem',
                                                    height: '2rem',
                                                    backgroundColor: detalhesRequisicao.id_estado > i && detalhesRequisicao.id_estado < 6  ? "#92D400" : "#F0F0F0",
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0'
                                                }}
                                            />
                                            <p
                                                style={{
                                                    position: 'absolute',
                                                    bottom: i > 2 ? '-2.85rem' : '-4rem',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    fontSize: '0.75rem',
                                                    color: '#000',
                                                    textAlign: 'center',
                                                    width: '5rem'
                                                }}
                                            >
                                                {labels[i]}
                                            </p>
                                        </div>
                                    );
                                }
                                return estados;
                            })()}
                        </div>
                        <div className='row'>
                            <h3 class='mobile-subtitle'>Contexto da Requisição</h3>
                            <p>{detalhesRequisicao.contexto_requisicao}</p>
                        </div>
                        <div className='row my-4'>
                            <div className='col-6'>
                                <h3 class='mobile-subtitle'>Data de Recolha</h3>
                                <p>{formatDate(detalhesRequisicao.data_inicio_requisicao)}</p>
                            </div>
                            <div className='col-6'>
                                <h3 class='mobile-subtitle'>Data de Devolução</h3>
                                <p>{formatDate(detalhesRequisicao.data_fim_requisicao)}</p>
                            </div>
                        </div>
                        <div className='row my-4'>
                            <h3 class='mobile-subtitle'>Elementos do Grupo</h3>
                            <div className="flex flex-wrap mt-3">
                                {detalhesRequisicao.utilizador.map((user, index) => (
                                    (user.role_utilizador === 3 || user.role_utilizador === 4) && (
                                        <div key={index} className="flex items-center mr-4 mb-4">
                                            <div className="flex items-center">
                                                {user.role_utilizador === 3 && <p className="text-green-900 font-semibold mr-1">Responsável</p>}
                                                <img className="rounded-full h-12 w-12 mr-1" src={`http://localhost:8000${user.avatar_utilizador}`} alt={user.nome_utilizador} />
                                            </div>
                                            <div className='mr-5'>
                                                <p className="font-semibold mb-0">{user.nome_utilizador}</p>
                                                <p className="text-green-900 mb-0">{user.email_utilizador}</p>
                                            </div>
                                        </div>)
                                ))}
                            </div>
                        </div>
                        <div className='row my-4'>
                            <div className='col-6'>
                                <h3 class='mobile-subtitle'>Unidade Curricular</h3>
                                <div className="flex items-center mt-3">
                                    <img className="rounded-md h-12 w-12 mr-3" src={`http://localhost:8000${detalhesRequisicao.icone_uc_contexto}`} alt={detalhesRequisicao.nome_uc_contexto} />
                                    <p className="mb-0">{detalhesRequisicao.nome_uc_contexto}</p>
                                </div>
                            </div>
                            <div className='col-6'>
                                <h3 class='mobile-subtitle'>Validado pelo Professor</h3>
                                {detalhesRequisicao.utilizador.map((user, index) => (
                                    (user.role_utilizador === 2) && (
                                        <div key={index} className="flex items-center mr-4 mb-4 mt-3">
                                            <div className="flex items-center">
                                                <img className="rounded-full h-12 w-12 mr-1" src={`http://localhost:8000${user.avatar_utilizador}`} alt={user.nome_utilizador} />
                                            </div>
                                            <div className='mr-5'>
                                                <p className="font-semibold mb-0">{user.nome_utilizador}</p>
                                                <p className="text-green-900 mb-0">{user.email_utilizador}</p>
                                            </div>
                                        </div>)
                                ))}
                            </div>
                        </div>
                        <div className='row my-4'>
                            <h3 class='mobile-subtitle'>Comentários</h3>
                            {detalhesRequisicao.comentario_professor_requisicao && (
                                <div className='row'>
                                    {detalhesRequisicao.utilizador.map((user, index) => (
                                        (user.role_utilizador === 2) && (
                                            <div key={index} className="flex items-center mr-4 mb-4 mt-3">
                                                <div className="flex items-center">
                                                    <img className="rounded-full h-12 w-12 mr-1" src={`http://localhost:8000${user.avatar_utilizador}`} alt={user.nome_utilizador} />
                                                </div>
                                                <div className='mr-5'>
                                                    <p className="mb-0">{detalhesRequisicao.comentario_professor_requisicao}</p>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                            {detalhesRequisicao.comentario_sara_requisicao && (
                                <div className='row'>
                                    {detalhesRequisicao.utilizador.map((user, index) => (
                                        (user.role_utilizador === 1 && index === 0) && (
                                            <div key={index} className="flex items-center mr-4 mb-4 mt-3">
                                                <div className="flex items-center">
                                                    <img className="rounded-full h-12 w-12 mr-1" src={`http://localhost:8000${user.avatar_utilizador}`} alt={user.nome_utilizador} />
                                                </div>
                                                <div className='mr-5'>
                                                    <p className="mb-0">{detalhesRequisicao.comentario_sara_requisicao}</p>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                    <div className='col-5'>
                        <h3>Equipamentos</h3>
                        {detalhesRequisicao.equipamento.map((equip, index) => (
                            <div key={index} className="row my-4 align-items-center">
                                <div className="col-2">
                                    <img
                                        src={`http://localhost:8000${equip.imagem_modelo_equipamento}`}
                                        alt={equip.nome_modelo_equipamento}
                                        className="img-fluid" // Ensures the image fits within the column
                                    />
                                </div>
                                <div className="col-5">
                                    <p className='mb-0 font-weight-bold'>{equip.nome_modelo_equipamento}</p>
                                    <p className='mb-0 font-weight-bold'>{equip.nome_marca_equipamento}</p>
                                    <p className='mb-0'>Id: {equip.id_interno_equipamento}</p>
                                    <p>Núm. de Série: {equip.numero_serie_equipamento}</p>
                                </div>
                                <div className="col-5">
                                    <p><strong>Observações:</strong> {equip.observacoes_equipamento || 'N/A'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
