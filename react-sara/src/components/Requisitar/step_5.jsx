import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../contexts/contextprovider';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'react-feather';


const Step5 = ({ requestId, startDate, endDate, formData }) => {
    const { cart, setCart } = useStateContext();
    const navigate = useNavigate();
    const [utilizadores, setUtilizadores] = useState([]);
    const [userId, setUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const BASE_URL = "http://localhost:8000";

    useEffect(() => {
        // Retrieve id_utilizador from local storage
        const storedUserId = localStorage.getItem('id_utilizador');
        console.log('Retrieved user id from local storage:', storedUserId);
        setUserId(storedUserId);

        axiosClient.get('/nomesutilizadores')
            .then(response => {
                console.log("Fetched users:", response.data); // Debug output
                setUtilizadores(response.data);

                // Find the user object that matches the stored user id
                const matchedUser = response.data.find(user => user.id_utilizador == storedUserId);
                if (matchedUser) {
                    console.log('Matched user:', matchedUser); // Debug output
                    setCurrentUser(matchedUser);
                } else {
                    console.log('No matching user found'); // Debug output
                }
            })
            .catch(error => {
                console.error("Erro ao obter nomes dos utilizadores:", error);
            });
    }, []);

    const renderUser = (user, role) => {
        const imageUrl = `${BASE_URL}${user.avatar_utilizador}`;
        let backgroundColor = "#FAFAFA";

        if (role === "currentUser") {
            backgroundColor = "#F3FAE6"; // Current user
        } else if (role === "groupMember") {
            backgroundColor = "#FAFAFA"; // Group member
        } else if (role === "professor") {
            backgroundColor = "#EFE5FB"; // Professor
        }

        return (
            <div
                key={user.id_utilizador}
                style={{
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                    marginBottom: "0.5rem",
                    backgroundColor: backgroundColor,
                    color: "black",
                    fontSize: "0.8rem",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <img
                    style={{ height: "1.5rem", width: "1.5rem", marginRight: "0.5rem", borderRadius: "50%" }}
                    className="img-fluid rounded-circle"
                    src={imageUrl}
                    alt="User Avatar"
                />
                {user.nome_utilizador}
            </div>
        );
    };

    const renderGroupMembers = () => {
        if (!groupMembers || groupMembers.length === 0) {
            return null;
        }

        return (
            <div>
                {groupMembers.map((member, index) => {
                    const user = utilizadores.find(u => u.id_utilizador === member.utilizador_id_utilizador);
                    if (user) {
                        return renderUser(user, "groupMember");
                    } else {
                        return (
                            <div key={index}>
                                Nome não encontrado
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    const renderProfessor = () => {
        if (!professor) {
            return null;
        }

        const professorUser = utilizadores.find(u => u.id_utilizador === professor.utilizador_id_utilizador);
        if (professorUser) {
            return (
                <div style={{padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "0.25rem"}}>
                    <div className="fw-bold">Professor Associado</div>
                    {renderUser(professorUser, "professor")}
                </div>
            );
        } else {
            return (
                <div style={{ backgroundColor: "#EFE5FB", padding: "0.5rem", marginBottom: "0.5rem", borderRadius: "0.25rem" }}>
                    <div className="fw-bold">Professor Associado</div>
                    <div>Nome não encontrado</div>
                </div>
            );
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const submitRequest = () => {
        const requestBody = {
            requisicao_id_requisicao: requestId,
            estado_id_estado: 1,
            data_estado: formatDate(new Date()),
            requisicao_has_equipamentos: cart.map(equipment => ({
                requisicao_id_requisicao: requestId,
                equipamento_id_equipamento: equipment.equipamento_id_equipamento,
                data_inicio_requisicao: formatDate(startDate),
                data_fim_requisicao: formatDate(endDate),
            })),
        };



        axiosClient.post(`/requisicao/${requestId}`, requestBody)
            .then(response => {

                console.log("Requisição finalizada com sucesso:", response.data);
                setCart([]);
                navigate('/home', /* { state: { successMessage: 'Registo criado com sucesso!' } } */);
            })
            .catch(error => {
                console.error("Erro ao finalizar requisição:", error);
            });

            console.log("request", requestBody); // Debug output
    };

    console.log(formatDate(startDate), formatDate(endDate) , "datas")


    const professor = formData.requisicao_has_utilizadores.find(utilizador => utilizador.role_utilizador === 2);
    const groupMembers = formData.requisicao_has_utilizadores.filter(utilizador => utilizador.role_utilizador === 4);

    console.log("formData:", formData); // Debug output
    console.log("Professor:", professor); // Debug output
    console.log("requestId:", requestId);

    // Debug output

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div>
                <div style={{marginBottom: "1rem" }} className="fw-bold">Resumo da Requisição</div>
                <div style={{fontSize:"0.8rem"}}>
                    <div className="fw-bold">Nome da Requisição</div>
                    <div className="txt-grey-900">{formData.nome_requisicao}</div>
                    <div className="mt-3 fw-bold">Contexto da Requisição</div>
                    <div className="txt-grey-900">{formData.contexto_requisicao}</div>
                    <div className="mt-3 fw-bold">Tipo de Requisição</div>
                    <div className="txt-grey-900">{formData.tipo_requisicao}</div>
                    <div className="mt-3 fw-bold">Data de Recolha</div>
                    <div className="txt-grey-900">{formatDate(startDate)}</div>
                    <div className="mt-3 fw-bold">Data de Devolução</div>
                    <div className="txt-grey-900">{formatDate(endDate)}</div>
                    <div className="mt-3 fw-bold">Elementos do Grupo</div>
                    {currentUser && (
                        <div>
                            {renderUser(currentUser, "currentUser")}
                            {groupMembers.map((member, index) => (
                                <div key={index}>
                                    {renderUser(utilizadores.find(u => u.id_utilizador === member.utilizador_id_utilizador), "groupMember")}
                                </div>
                            ))}
                        </div>
                    )}
                    {renderProfessor()}

                    <div className="mt-2 fw-bold mb-1">Equipamento</div>
                    <div>
                        {cart.map((item, index) => {
                            const imageUrl = item.imagem_modelo_equipamento
                                ? `${BASE_URL}${item.imagem_modelo_equipamento}`
                                : `${BASE_URL}/images/equipamento/noImg.png`;

                            return (
                                <div className="row align-items-center mb-2" key={index}>
                                    <div className="col-4 d-flex justify-content-center">
                                        <img
                                            src={imageUrl}
                                            alt={item.nome_modelo_equipamento}
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="col-8 d-flex flex-column justify-content-between">
                                        <div>
                                            <div className="font-bold">
                                                {item.nome_marca_equipamento} {item.nome_modelo_equipamento}
                                            </div>
                                            <div className="txt-grey-700 mb-2" style={{ fontSize: "0.8rem" }}>
                                                {item.equipamentos[0]?.nome_categoria}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <button className='btn-sara-primary rounded p-3 d-flex align-items-center' onClick={submitRequest}>
                            <CheckCircle size={16} className="mr-3"/>
                            Confirmar Requisição
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step5;
