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

    return (
        <div>
            <h1>Carrinho</h1>
            {cart.length === 0 &&
                message !== "Ainda não concluiu o processo de requisição" && (
                    <div className="d-flex flex-column align-items-center">
                        {" "}
                        <div style={{ paddingRight: 10 }}>
                            <img src={emptyCartImg} alt="Empty Cart" />{" "}
                        </div>
                        <h3>O carrinho está vazio.</h3>
                    </div>
                )}
            <p className="text-center">{message}</p>{" "}
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
                                    {item.nome_modelo_equipamento} -{" "}
                                    {item.nome_marca_equipamento}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            O carrinho está vazio mas deveria estar a aparecer a
                            data pelo menos e a uc escolhida com o professor.
                        </p>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Carrinho;
