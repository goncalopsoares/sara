//users.jsx//
import axiosClient from "../axiosClient.js";
import { redirect } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider.jsx";
import { Frown, LogOut, Edit } from "react-feather";
import React, { useState, useEffect } from "react";
import { LuClipboard } from "react-icons/lu";
import HomeReqPassada from "../components/Student/HomeReqAtiva.jsx";
import { useNavigate } from "react-router-dom";

/* function Modal({ show, onClose, equipamentos, contexto, comentarioprofessor, comentariosara }) {
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
} */

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("pt-PT", options);
};

export default function Users() {
    const { setUser, setToken, setId_utilizador } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient
            .post("/logout")
            .then(() => {
                setUser(null);
                setToken(null);
                setId_utilizador(null);
                redirect("/login");
            })
            .catch((error) => {
                console.error("Erro ao fazer logout:", error);
                // Optional: handle logout errors
            });
    };

    const [requisicao, setRequisicao] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalData, setModalData] = useState({
        show: false,
        equipamentos: [],
        contexto: "",
        comentarioprofessor: "",
        comentariosara: "",
    });

    const { user } = useStateContext();

    const handleCloseModal = () => {
        setModalData({
            show: false,
            equipamentos: [],
            contexto: "",
            comentarioprofessor: "",
            comentariosara: "",
        });
    };

    useEffect(() => {
        if (user.id_utilizador && user.tipo_utilizador === 3) {
            axiosClient
                .get(`/estudantehome/${user.id_utilizador}`)
                .then((response) => {
                    console.log("Requisicao:", response.data);
                    const result = response.data.EstudanteHome;
                    setRequisicao(result || []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao obter equipamentos:", error);
                    setError(error);
                    setLoading(false);
                });
        } else if (user.id_utilizador && user.tipo_utilizador === 2) {
            axiosClient
                .get(`/c/${user.id_utilizador}`)
                .then((response) => {
                    console.log("Requisicao:", response.data);
                    const result = response.data.ProfessorHome;
                    setRequisicao(result || []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao obter equipamentos:", error);
                    setError(error);
                    setLoading(false);
                });
        }
    }, [user.id_utilizador, user.tipo_utilizador]);

    const getCardColor = (estadoId) => {
        switch (estadoId) {
            case 2:
            case 4:
                return "bg-red-100";
            case 7:
                return "bg-green-100";
            default:
                return "bg-white";
        }
    };

    const navigate = useNavigate();

    const handleShowMore = (
        id,
        equipamento,
        contexto_requisicao,
        comentario_professor_requisicao,
        comentario_sara_requisicao
    ) => {
        navigate(`/requisicao/${id}`, {
            state: {
                equipamento,
                contexto_requisicao,
                comentario_professor_requisicao,
                comentario_sara_requisicao,
            },
        });
    };

    return (
        <>
            <div className="row">
                <div className="col-3 col-md-1">
                    <img
                        style={{
                            width: "4rem",
                            height: "4rem",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                        src={`http://deca-sara.ua.pt${user.avatar_utilizador}`}
                        alt="Avatar do utilizador"
                    />
                </div>
                <div className="col-9">
                    <div
                        className="row font-bold"
                        style={{ fontSize: "1.2rem" }}
                    >
                        {user.nome_utilizador}
                    </div>
                    <div className="row txt-grey-700">
                        {user.email_utilizador}
                    </div>
                </div>
            </div>
            <button className="btn-sara-terciary mt-2 mr-2">
                <Edit className="inline-block align-middle me-3" size={16} />
                Editar Perfil
            </button>
            <button className="btn-sara-terciary mt-4 mb-4" onClick={onLogout}>
                <LogOut className="inline-block align-middle me-3" size={16} />
                Log Out
            </button>

            {/* Histórico */}

            <div>
                <div className="mobile-subtitle mb-4">
                    Histórico de Requisições
                </div>
                {loading && <p>Loading...</p>}
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {requisicao.map((req) => {
                        const ultimoEstado =
                            req.estados[req.estados.length - 1];
                        if ([5, 6, 7].includes(ultimoEstado.id_estado)) {
                            return (
                                <div
                                    key={req.id_requisicao}
                                    className={`background-grey-300 p-4 mb-2`}
                                    style={{ borderRadius: "1rem" }}
                                >
                                    <div className="d-flex align-items-center mb-4">
                                        <img
                                            src="https://images.pexels.com/photos/164907/pexels-photo-164907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                            style={{
                                                height: "1.2rem",
                                                width: "1.2rem",
                                                borderRadius: "0.2rem",
                                                marginRight: "0.5rem",
                                            }}
                                        />
                                        <div
                                            style={{
                                                fontSize: "1.2rem",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {req.nome_requisicao}
                                        </div>
                                    </div>
                                    <div className="text-uppercase font-bold txt-green-900 mb-4">
                                        {ultimoEstado.nome_estado}
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div
                                                className="font-bold"
                                                style={{ fontSize: "0.8rem" }}
                                            >
                                                Data de Recolha
                                            </div>
                                            <div style={{ fontSize: "0.8rem" }}>
                                                {formatDate(
                                                    req.data_inicio_requisicao
                                                )}
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div
                                                className="font-bold"
                                                style={{ fontSize: "0.8rem" }}
                                            >
                                                Data de Devolução
                                            </div>
                                            <div style={{ fontSize: "0.8rem" }}>
                                                {formatDate(
                                                    req.data_fim_requisicao
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleShowMore(
                                                    req.id_requisicao,
                                                    req.equipamento,
                                                    req.contexto_requisicao,
                                                    req.comentario_professor_requisicao,
                                                    req.comentario_sara_requisicao
                                                )
                                            }
                                            className="mt-3 text-white background-green-500 rounded font-semibold"
                                            style={{
                                                paddingTop: "1rem",
                                                paddingBottom: "1rem",
                                            }}
                                        >
                                            <LuClipboard className="inline-block align-middle me-3" />
                                            <span
                                                className="text-uppercase"
                                                style={{ fontSize: "0.8rem" }}
                                            >
                                                Ver Requisição
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </>
    );
}

/*        <div className="container min-vh-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className="text-center txt-grey-700" style={{ marginBottom: "1rem" }}>
                            <Frown className="txt-grey-700" style={{ marginBottom: "0.5rem" }} />
                        </div>
                        <div className="text-center txt-grey-700" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                            UPS! Parece que esta página está em construção
                        </div>
                        <div className="text-center txt-grey-700" style={{ fontWeight: "300", marginBottom: "1rem" }}>
                            Esta é apenas uma pequena lembrança de que estamos a trabalhar arduamente para desenvolver a melhor plataforma do deca.
                        </div>
                        <div className="text-center txt-grey-700" style={{ fontWeight: "300", marginBottom: "2rem" }}>
                            Contudo, não tens de ficar preso nesta plataforma:
                        </div>
                        <div>
                            <button className="btn btn-sara-primary d-flex align-items-center justify-content-center w-100" onClick={onLogout}>
                                <LogOut style={{ marginRight: "2rem" }} />
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
        </div>*/
