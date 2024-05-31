import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";
import EstadosMap from '../../components/requisicao/EstadosMap';
import DetalhesRequisicao from '../../components/requisicao/DetalhesRequisicao';
import Comentarios from '../../components/requisicao/Comentarios';
import Equipamentos from '../../components/requisicao/Equipamentos';
import { CheckCircle, XCircle, RefreshCcw } from 'react-feather';

export default function ReqDetail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detalhesRequisicao, setDetalhesRequisicao] = useState(null);
    const [estadoData, setEstadoData] = useState(null);
    const [comentarioSaraData, setComentarioSaraData] = useState("");
    const { user } = useStateContext();
    const [code, setCode] = useState('');
    const [showCode, setShowCode] = useState(false);

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(
                    `/sara/requisicao/${id}`
                );
                setDetalhesRequisicao(response.data[0]);
                setLoading(false);


            } catch (error) {
                console.error("Erro ao obter detalhes da requisição:", error);
                setError(error);
                setLoading(false);
            }
        };
        fetchData();

    }, [estadoData, comentarioSaraData]);


    const fetchCode = async () => {
        try {
            const codeResponse = await axiosClient.get(`/requisicao/pin/${detalhesRequisicao.id_requisicao}`);
            setCode(codeResponse.data);
            console.log
        } catch (error) {
            console.error('Erro ao obter código:', error.response ? error.response.data : error.message);
        }
    };



    const toggleCode = () => {
        // Se o código já estiver carregado, não precisa buscar novamente
        if (!showCode && code === '') {
            fetchCode();
        }
        setShowCode(!showCode); // Alterna o estado de exibição do código
    };


    const aprovarRejeitar = async (id, estadoData) => {
        try {
            const response = await axiosClient.post(
                `/sara/atualizarestado/${id}`,
                estadoData
            );
            console.log("Estado atualizado com sucesso:", response.data);
            setEstadoData(null);
            setComentarioSaraData("");
        } catch (error) {
            console.error(
                "Erro ao atualizar estado:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const comentar = async (id, comentarioSaraData) => {
        try {
            const response = await axiosClient.post(
                `/sara/comentar/${id}`,
                comentarioSaraData
            );
            console.log("Comentário atualizado com sucesso:", response.data);
            setComentarioSaraData("");
        } catch (error) {
            console.error(
                "Erro ao atualizar comentário:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const formatDatePost = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const hours = String(d.getHours()).padStart(2, "0");
        const minutes = String(d.getMinutes()).padStart(2, "0");
        const seconds = String(d.getSeconds()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleClick = (event) => {
        const buttonId = event.target.id;
        const estadoId = buttonId === 'button1' ? 3 : 6;

        const data = {
            requisicao_id_requisicao: id,
            estado_id_estado: estadoId,
            data_estado: formatDatePost(new Date()),
        };

        console.log("data:", data);
        setEstadoData(data);
        aprovarRejeitar(id, data);
        console.log("estadoData:", data);
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
    console.log('detalhesRequisicao', detalhesRequisicao);
    console.log('code', code);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="d-flex align-items-center">
                        <button onClick={goBack} className="mr-2">
                            <ArrowLeft />
                        </button>
                        <div
                            className="mobile-title truncate"
                            title={detalhesRequisicao.nome_requisicao}
                        >
                            {detalhesRequisicao.nome_requisicao}
                        </div>
                    </div>
                    <div
                        className={`col-4 col-sm-5 ${
                            user.tipo_utilizador === 2 &&
                            detalhesRequisicao.id_estado === 1
                                ? "position-fixed bottom-0"
                                : ""
                        }`}
                        style={
                            user.tipo_utilizador === 2 &&
                            detalhesRequisicao.id_estado === 1
                                ? { marginBottom: "6rem" }
                                : {}
                        }
                    >
                        {user.tipo_utilizador === 1 && detalhesRequisicao.id_estado === 2 && (
                            <div className='flex justify-end'>
                                <button id='button1' onClick={handleClick} className='btn btn-success mr-5'>Aprovar</button>
                                <button id='button2' onClick={handleClick} className='btn btn-danger'>Rejeitar</button>
                            </div>)}

                            {user.tipo_utilizador === 3 && detalhesRequisicao.id_estado === 3 && (
                               <div>
                               <button onClick={toggleCode} className="btn btn-success mr-5">
                                   {showCode ? 'Esconder Código' : 'Ver Código levantamento'}
                               </button>
                               {showCode && (
                                   <div className="mt-2">
                                       <pre>{code}</pre>
                                   </div>
                               )}
                           </div>
                            )
                            }
                             {user.tipo_utilizador === 3 && detalhesRequisicao.id_estado === 4 && (
                                <div>
                                <button onClick={toggleCode} className="btn btn-success mr-5">
                                    {showCode ? 'Esconder Código' : 'Ver Código devolução'}
                                </button>
                                {showCode && (
                                    <div className="mt-2">
                                        <pre>{code}</pre>
                                    </div>
                                )}
                            </div>
                            )
                            }

                    </div>
                </div>
            </div>
            <div className="container-fluid">
    <div className="row">
        <div className="col-sm-7">
            <div className="flex justify-center mb-5 w-100 w-sm-auto">
                <EstadosMap
                    detalhesRequisicaoEstado={
                        detalhesRequisicao.id_estado
                    }
                />
            </div>
            <div className="mobile-subtitle mt-sm-3">
                Resumo da requisição #{detalhesRequisicao.id_requisicao}
            </div>
            <div>
                <DetalhesRequisicao
                    detalhesRequisicao={detalhesRequisicao}
                />
            </div>
            <div className="row my-4">
                <h3 class="mobile-subtitle">Comentários</h3>
                <Comentarios
                    comentarioProfessorRequisicao={
                        detalhesRequisicao.comentario_professor_requisicao
                    }
                    comentarioSaraRequisicao={
                        detalhesRequisicao.comentario_sara_requisicao
                    }
                    utilizadores={detalhesRequisicao.utilizador}
                    onSubmitComment={handleComment}
                    currentUser={user}
                />
            </div>
        </div>
        <div className="col-5">
            <h3>Equipamentos</h3>
            <Equipamentos
                listaEquipamentos={detalhesRequisicao.equipamento}
            />
        </div>
    </div>
</div>
        </>
    );
}
