import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import emptyCartImg from "../images/icons/emptyCart.svg"; // Import the image

const Carrinho = () => {
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [buttonPath, setButtonPath] = useState("");
    const [showEquipamentosButton, setShowEquipamentosButton] = useState(false);
    const navigate = useNavigate();
    const { user, cart, setCart } = useStateContext();
    const [cartData, setCartData] = useState({});
    const [utilizadores, setUtilizadores] = useState([]);
    const [nomeUc, setNomeUc] = useState('');

    useEffect(() => {
        const fetchRequisicaoStatus = async () => {
            try {
                const response = await axiosClient.get(
                    `/requisicao/ultimarequisicaosemestado/${user.id_utilizador}`
                );
                if (
                    response.data.message ===
                    "A última requisição encontrada não possui um estado associado."
                ) {
                    setMessage("Ainda não concluiu o processo de requisição");
                    setButtonText("Continuar Requisição");
                    setButtonPath("/requisitar");
                    setShowEquipamentosButton(false);

                    setCartData({
                        nome_requisicao: response.data.nome_requisicao,
                        contexto_requisicao: response.data.contexto_requisicao,
                        tipo_requisicao: 'Equipamento', // Supondo que este valor seja fixo
                        uc_contexto_id_uc_contexto: response.data.uc_contexto_id_uc_contexto,
                        requisicao_has_utilizadores: response.data.utilizadores.map(utilizador => ({
                          utilizador_id_utilizador: utilizador.utilizador_id_utilizador,
                          role_utilizador: utilizador.role_utilizador
                        }))
                    });

                    // Fetch utilizadores
                    axiosClient.get('/nomesutilizadores')
                        .then(response => {
                            setUtilizadores(response.data);
                        })
                        .catch(error => {
                            console.error("Erro ao obter nomes dos utilizadores:", error);
                        });

                    // Fetch UC name
                    axiosClient.get(`/uc/${response.data.uc_contexto_id_uc_contexto}`)
                        .then(response => {
                            setNomeUc(response.data.nome_uc_contexto);
                        })
                        .catch(error => {
                            console.error("Erro ao obter nome da UC:", error);
                        });
                } else if (
                    response.data.message ===
                        "Nenhuma requisição encontrada para este utilizador." ||
                    response.data.message ===
                        "A última requisição encontrada já possui um estado associado."
                ) {
                    setMessage(
                        "Comece uma nova requisição ou veja os equipamentos disponíveis."
                    );
                    setButtonText("Requisitar");
                    setButtonPath("/requisitar");
                    setShowEquipamentosButton(true);
                }
            } catch (error) {
                setMessage("Erro ao buscar o status da requisição");
                setButtonText("Tentar Novamente");
                setButtonPath("/");
                setShowEquipamentosButton(false);
            }
        };

        fetchRequisicaoStatus();
    }, [user.id_utilizador]);

    const handleButtonClick = () => {
        navigate(buttonPath);
    };

    const handleEquipamentosClick = () => {
        navigate("/equipamentos");
    };

    const getUserInfo = (id) => {
        const user = utilizadores.find(user => user.id_utilizador === id);
        return user || { nome_utilizador: 'Nome não encontrado' };
    };

    const professor = cartData.requisicao_has_utilizadores?.find(utilizador => utilizador.role_utilizador === 2);
    const groupMembers = cartData.requisicao_has_utilizadores?.filter(utilizador => utilizador.role_utilizador === 4);

    return (
        <div>
            <h1>Carrinho</h1>
            {cart.length === 0 && message !== "Ainda não concluiu o processo de requisição" && (
                <div className="d-flex flex-column align-items-center">
                    <div style={{ paddingRight: 10 }}>
                        <img src={emptyCartImg} alt="Empty Cart" />
                    </div>
                    <h3>O carrinho está vazio.</h3>
                </div>
            )}
            <p className="text-center">{message}</p>
            <div className="d-flex justify-content-between">
                {showEquipamentosButton && (
                    <button
                        className="btn btn-sara-secondary flex-grow-1 mr-2"
                        onClick={handleEquipamentosClick}
                    >
                        Equipamentos
                    </button>
                )}
                <button
                    className="btn btn-sara-primary flex-grow-1"
                    onClick={handleButtonClick}
                >
                    {buttonText}
                </button>
            </div>
            {message === "Ainda não concluiu o processo de requisição" ? (
                <div>
                    <h2>O que tens até agora no carrinho:</h2>
                    {cart.length > 0 ? (
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    {item.nome_modelo_equipamento} - {item.nome_marca_equipamento}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <h5>O teu processo de requisição:</h5>
                            <p>Nome da Requisição: {cartData.nome_requisicao}</p>
                            <p>Contexto da Requisição: {cartData.contexto_requisicao}</p>
                            <p>Tipo de Requisição: {cartData.tipo_requisicao}</p>
                            <p>UC: {nomeUc}</p>
                            {professor && (
                                <div>
                                    <h5>Professor</h5>
                                    <p>Nome: {getUserInfo(professor.utilizador_id_utilizador).nome_utilizador}</p>
                                    <p> {getUserInfo(professor.utilizador_id_utilizador).email_utilizador}</p>
                                    <img className="rounded-full h-12 w-12 mr-1" src={`http://localhost:8000${getUserInfo(professor.utilizador_id_utilizador).avatar_utilizador}`} alt={getUserInfo(professor.utilizador_id_utilizador).nome_utilizador} />
                                </div>
                            )}
                            {groupMembers.length > 0 && (
                                <div>
                                    <h5>Membros do Grupo</h5>
                                    <ul>
                                        {groupMembers.map((member, index) => (
                                            <li className="p-2" key={index}>
                                            Nome: {member && getUserInfo(member.utilizador_id_utilizador).nome_utilizador}<br />
                                            Email: {member && getUserInfo(member.utilizador_id_utilizador).email_utilizador}<br />
                                            Número Mecanográfico: {member && getUserInfo(member.utilizador_id_utilizador).numero_mecanografico_utilizador}
                                            {member && (
                                                <img className="rounded-full h-12 w-12 mr-1" src={`http://localhost:8000${getUserInfo(member.utilizador_id_utilizador).avatar_utilizador}`} alt={getUserInfo(member.utilizador_id_utilizador).nome_utilizador} />
                                            )}
                                        </li>
                                        
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Carrinho;
