import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";
import emptyCartImg from "../images/icons/emptyCart.svg"; // Import the image
import { RiDeleteBin7Line } from "react-icons/ri";

const Carrinho = () => {
    const [message, setMessage] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [buttonPath, setButtonPath] = useState("");
    const [showEquipamentosButton, setShowEquipamentosButton] = useState(false);
    const navigate = useNavigate();
    const { user, cart, setCart } = useStateContext();
    const [cartData, setCartData] = useState({});
    const [utilizadores, setUtilizadores] = useState([]);
    const [Uc, setUc] = useState({});

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
                        id_requisicao: response.data.id_requisicao,
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
                            setUc(
                                {nome:response.data.nome_uc_contexto,
                                sigla:response.data.sigla_uc_contexto,
                                icone:response.data.icone_uc_contexto
                                }
                                );
                        })
                        .catch(error => {
                            console.error("Erro ao obter nome da UC:", error);
                        });
                } else if (
                    response.data.message ===
                    "Nenhuma requisição encontrada para este utilizador."||
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
    }, [user.id_utilizador, cart, cartData]);

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

    const handleDeleteRequisition = async (id) => {

        try {
            const response = await axiosClient.delete(`/requisicao/${id}`);

            console.log('Requisição eliminada com sucesso:', response.data);

            setCartData({});
            setCart([]);
           

        } catch (error) {
            console.error('Erro ao eliminar a requisição:', error);
        }
       
    }

    const professor = cartData.requisicao_has_utilizadores?.find(utilizador => utilizador.role_utilizador === 2);
    const groupMembers = cartData.requisicao_has_utilizadores?.filter(utilizador => utilizador.role_utilizador === 4);

    console.log(cart);
    console.log(cartData.id_requisicao);
    return (
        <div style={{ marginBottom: "4rem" }}> 
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
        
        {(cart.length > 0 || (cartData && Object.keys(cartData).length > 0)) && (
            <div className="mb-5" >
                

                {cartData && Object.keys(cartData).length > 0 && (
                    <div>
                        <h3 className="mt-3 font-thin">Resumo da requisição: {cartData.id_requisicao}</h3>
                        <p>Nome da Requisição </p>
                        <p style={{ borderRadius: "1rem", border:"1px, solid, grey", padding:"0.7rem" }}>{cartData.nome_requisicao}</p>
                        <p>Contexto da Requisição: </p>
                        <p style={{ borderRadius: "1rem", border:"1px, solid, grey", padding:"0.7rem" }}>{cartData.contexto_requisicao}</p>
                        
                        
                        {groupMembers.length > 0 && (
                            <div>
                                <p>Elementos do Grupo</p>
                                <ul className="p-0">
                                            {groupMembers.map((member, index) => (
                                        <li key={index} style={{ listStyle: 'none' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', borderRadius: '1rem', border: '1px solid grey', padding: '0.4rem', fontSize:"0.8rem", marginBottom: "0.3rem" }}>
                                                {member && (
                                                    <img
                                                        className="rounded-full h-7 w-7 mr-2"
                                                        src={`http://deca-sara.ua.pt/public${getUserInfo(member.utilizador_id_utilizador).avatar_utilizador}`}
                                                        alt={getUserInfo(member.utilizador_id_utilizador).nome_utilizador}
                                                    />
                                                )}
                                                <div>
                                                    {member && getUserInfo(member.utilizador_id_utilizador).nome_utilizador} ({member && getUserInfo(member.utilizador_id_utilizador).email_utilizador})
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                             </ul>
                            </div>
                        )}

                        {user.tipo_utilizador===2 &&
                        (

                            <div>
                                <p>UC</p>
                                <p style={{ display: 'flex', alignItems: 'center', borderRadius: '1rem', border: '1px solid grey', padding: '0', fontSize: '0.8rem' }}>
                                <img src={`http://deca-sara.ua.pt/public${Uc.icone}`} alt={Uc.nome} className="h-16 w-16 p-0" style={{ marginRight: '0.5rem', borderRadius: '1rem 0 0 1rem' }} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>{Uc.nome}</span>
                                    <span>{Uc.sigla}</span>
                                </div>
                            </p>

                             </div>



                        )
                        
                        }

                        {professor && (

                            <div>
                                <p>UC's e professores associados</p>
                                <p style={{ display: 'flex', alignItems: 'center', borderRadius: '1rem', border: '1px solid grey', padding: '0', fontSize: '0.8rem' }}>
                                <img src={`http://deca-sara.ua.pt/public${Uc.icone}`} alt={Uc.nome} className="h-16 w-16 p-0" style={{ marginRight: '0.5rem', borderRadius: '1rem 0 0 1rem' }} />
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span>{Uc.nome}</span>
                                    <span>{Uc.sigla}</span>
                                </div>
                            </p>


                                <p style={{ display: 'flex', alignItems: 'center', borderRadius: '1rem', border: '1px solid grey', padding: '0.4rem', fontSize:"0.8rem" }}>
                                        <img
                                            className="rounded-full h-7 w-7 mr-2"
                                            src={`http://deca-sara.ua.pt/public${getUserInfo(professor.utilizador_id_utilizador).avatar_utilizador}`}
                                            alt={getUserInfo(professor.utilizador_id_utilizador).nome_utilizador}
                                        />
                                        {getUserInfo(professor.utilizador_id_utilizador).nome_utilizador} ({getUserInfo(professor.utilizador_id_utilizador).email_utilizador})
                                    </p>

                               
                                
                            </div>
                        )}
                    </div>
                )}
                {cart.length>0 && 
                <ul className="p-0">
               Equipamentos Selecionados:
                    {cart.map((item, index) => (
                           
                        <li key={index}>
                            <p style={{ display: 'flex', alignItems: 'center', padding: '0.4rem', fontSize:"1rem" }}><img 
                            className=" h-24 w-30 mr-2 p-3"
                            style={{ backgroundColor: '#e0e0e0',  borderRadius: '0.6rem' }} 
                            src={`http://deca-sara.ua.pt/public${item.imagem_modelo_equipamento}`}
                            />
                             <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span className="fw-bold">{item.nome_marca_equipamento} </span>
                                    <span>{item.nome_modelo_equipamento} </span>
                                </div>
                            </p>
                            
                        </li>
                       
                    ))}
                </ul>
}
                <button
                                
                                style={{
                                    color: 'red',
                                    border: '2px solid red',
                                    borderRadius: '0.5rem',
                                    padding: '0.4rem', // Reduced uniform padding
                                    backgroundColor: 'white',
                                    position: 'fixed',
                                    right: '2rem',
                                    bottom: '6rem',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                                }}
                                onClick={() => handleDeleteRequisition(cartData.id_requisicao)} 
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffcccc'} // Light red hover effect
                                 onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'} // Revert background color on mouse leave
                            >
            <p style={{ display: 'flex', alignItems: 'center', margin: 0, fontSize: '1rem' }}>
                 Eliminar 
                <span style={{ marginLeft: '0.5rem' }}> {/* Separate text from icon */}
                     <RiDeleteBin7Line size={30} className="p-0" />
                </span>
               </p>


</button>

            </div>
                            
        )}
    </div>
) : null}

        </div>
    );
};

export default Carrinho;
