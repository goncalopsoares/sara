import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import Step1 from '../components/Requisitar/step_1';
import Step2 from '../components/Requisitar/step_2';
import Step3 from '../components/Requisitar/step_3';
import Step4 from '../components/Requisitar/step_4';
import Step5 from '../components/Requisitar/step_5';
import "../App.css";
import 'react-datepicker/dist/react-datepicker.css';
import { FaArrowAltCircleRight } from "react-icons/fa";
import StepIndicator from "../components/Requisitar/StepIndicator.jsx";
import { ArrowLeft,ArrowRight } from 'react-feather';


const Requisitar = () => {
    const { user } = useStateContext(); // Adicionei user ao contexto
    const { cart, setCart } = useStateContext();
    const [ucs, setUcs] = useState([]);
    const [selectedUc, setSelectedUc] = useState(null);
    const [professores, setProfessores] = useState([]);
    const [selectedProfessor, setSelectedProfessor] = useState(null);
    const [utilizadores, setUtilizadores] = useState([]);
    const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
    const [formData, setFormData] = useState({
        nome_requisicao: '',
        contexto_requisicao: '',
        tipo_requisicao: 'Equipamento',
        uc_contexto_id_uc_contexto: '',
        requisicao_has_utilizadores: []
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [requestId, setRequestId] = useState(null);

    const stepNames = ['UC', 'Info', 'Datas', 'Equipamentos', 'Resumo'];

    useEffect(() => {
        axiosClient.get(`/estudantehome/uc/${user.id_utilizador}`)
            .then(response => {
                setUcs(response.data);
            })
            .catch(error => {
                console.error("Erro ao obter UCs:", error);
            });
    }, [user.id_utilizador]);

    useEffect(() => {
        axiosClient.get(`/requisicao/ultimarequisicaosemestado/${user.id_utilizador}`)
            .then(response => {
                if (response.data.message === 'A última requisição encontrada não possui um estado associado.') {
                    setCart([]);
                    setCurrentStep(3);
                    setSelectedUc({ id_uc_contexto: response.data.uc_contexto_id_uc_contexto });
                    setRequestId(response.data.id_requisicao);
                    setFormData({
                        nome_requisicao: response.data.nome_requisicao,
                        contexto_requisicao: response.data.contexto_requisicao,
                        tipo_requisicao: 'Equipamento', // Supondo que este valor seja fixo
                        uc_contexto_id_uc_contexto: response.data.uc_contexto_id_uc_contexto,
                        requisicao_has_utilizadores: response.data.utilizadores.map(utilizador => ({
                            utilizador_id_utilizador: utilizador.utilizador_id_utilizador,
                            role_utilizador: utilizador.role_utilizador
                        }))
                    });
                }
            })
            .catch(error => {
                console.error("Erro ao obter última requisição:", error);
            });
    }, []);

    const handleUcSelect = (uc) => {
        const pinRecolha = generateRandomPin();
        const pinDevolucao = generateRandomPin();

        setSelectedUc(uc);
        setFormData({
            ...formData,
            uc_contexto_id_uc_contexto: uc.id_uc_contexto,
            requisicao_has_utilizadores: [
                {
                    utilizador_id_utilizador: user.id_utilizador,
                    role_utilizador: 3,
                    pin_recolha: pinRecolha,
                    pin_devolucao: pinDevolucao
                }
            ]
        });

        axiosClient.get(`/utilizadores`)
            .then(response => {
                const ucUtilizadores = response.data.find(u => u.id_uc_contexto === uc.id_uc_contexto)?.utilizador || [];
                const filteredUtilizadores = ucUtilizadores.filter(u => u.id_utilizador !== user.id_utilizador);
                setUtilizadores(filteredUtilizadores);

                const ucProfessores = filteredUtilizadores.filter(u => u.tipo_utilizador === 2);
                setProfessores(ucProfessores);

                const sara = filteredUtilizadores.filter(u => u.tipo_utilizador === 1).map(u => ({
                    utilizador_id_utilizador: u.id_utilizador,
                    role_utilizador: 1,
                    pin_recolha: pinRecolha,
                    pin_devolucao: pinDevolucao
                }));

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    requisicao_has_utilizadores: [
                        ...prevFormData.requisicao_has_utilizadores.filter(u => u.role_utilizador !== 1),
                        ...sara
                    ]
                }));
            })
            .catch(error => {
                console.error("Erro ao obter utilizadores:", error);
            });
    };

    const handleProfessorSelect = (e) => {
        const professor = professores.find(p => p.id_utilizador === parseInt(e.target.value));
        setSelectedProfessor(professor);
        setFormData((prevFormData) => ({
            ...prevFormData,
            requisicao_has_utilizadores: [
                ...prevFormData.requisicao_has_utilizadores.filter(u => u.role_utilizador !== 2),
                {
                    utilizador_id_utilizador: professor.id_utilizador,
                    role_utilizador: 2,
                    pin_recolha: prevFormData.requisicao_has_utilizadores[0]?.pin_recolha || '',
                    pin_devolucao: prevFormData.requisicao_has_utilizadores[0]?.pin_devolucao || ''
                }
            ]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    console.log(formData);
    console.log(cart, "cart");
    console.log(requestId, "id");
    console.log(startDate, endDate);

    const handleUtilizadoresChange = (e) => {
        const selectedUserId = parseInt(e.target.value);
        if (selectedUserId && !selectedGroupMembers.some(u => u.id_utilizador === selectedUserId)) {
            const selectedUser = utilizadores.find(u => u.id_utilizador === selectedUserId);
            setSelectedGroupMembers([...selectedGroupMembers, selectedUser]);
            setFormData((prevFormData) => ({
                ...prevFormData,
                requisicao_has_utilizadores: [
                    ...prevFormData.requisicao_has_utilizadores,
                    {
                        utilizador_id_utilizador: selectedUser.id_utilizador,
                        role_utilizador: 4,
                        pin_recolha: prevFormData.requisicao_has_utilizadores[0]?.pin_recolha || '',
                        pin_devolucao: prevFormData.requisicao_has_utilizadores[0]?.pin_devolucao || ''
                    }
                ]
            }));
        }
    };

    const handleRemoveGroupMember = (userId) => {
        setSelectedGroupMembers(selectedGroupMembers.filter(u => u.id_utilizador !== userId));
        setFormData((prevFormData) => ({
            ...prevFormData,
            requisicao_has_utilizadores: prevFormData.requisicao_has_utilizadores.filter(u => u.utilizador_id_utilizador !== userId || u.role_utilizador !== 4)
        }));
    };

    const handleDateSubmit = (start, end) => {
        setStartDate(start);
        setEndDate(end);
        goToNextStep();
    };

    const generateRandomPin = () => {
        return Math.random().toString(36).substring(2, 6);
    };

    const fetchLastRequestId = () => {
        axiosClient.get(`/requisicao/ultimarequisicao/${user.id_utilizador}`)
            .then(response => {
                setRequestId(response.data.requisicao_id_requisicao);
                goToNextStep();
            })
            .catch(error => {
                console.error("Erro ao obter última requisição:", error);
            });
    };

    const handleSubmitStep2 = (e) => {
        e.preventDefault();
        axiosClient.post('/requisicao', formData)
            .then(response => {
                fetchLastRequestId();
                console.log("criada a requisicao");
            })
            .catch(error => {
                console.error("Erro ao criar requisição:", error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitRequest();
    };

    const goToNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const goToStep5 = () => {
        setCurrentStep(5);
    };

    console.log(formData);
    console.log(requestId, "id");
    console.log(cart, "cart");
    console.log(selectedUc);
    console.log(ucs);

    return (
        <div style={{ marginBottom: "4rem" }}>
            <div style={{ marginBottom: "1rem" }}>
                <div className="mobile-title">Requisitar</div>
            </div>
            <div>
                {currentStep && (
                    <>
                        <div className="text-center mobile-subtitle ">{stepNames[currentStep - 1]}</div>
                        <StepIndicator currentStep={currentStep} />
                    </>
                )}
            </div>

            {currentStep === 1 && (
                <Step1
                    ucs={ucs}
                    selectedUc={selectedUc}
                    selectedProfessor={selectedProfessor}
                    professores={professores}
                    handleUcSelect={handleUcSelect}
                    handleProfessorSelect={handleProfessorSelect}
                    goToNextStep={goToNextStep}
                />
            )}

            {currentStep === 2 && (
                <Step2
                    utilizadores={utilizadores}
                    selectedGroupMembers={selectedGroupMembers}
                    handleUtilizadoresChange={handleUtilizadoresChange}
                    handleRemoveGroupMember={handleRemoveGroupMember}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmitStep2}
                    goToPreviousStep={goToPreviousStep}
                />
            )}

            {currentStep === 3 && (
                <Step3
                    handleDateSubmit={handleDateSubmit}
                    goToPreviousStep={goToPreviousStep}
                />
            )}

            {currentStep === 4 && (
                <Step4
                    selectedUc={selectedUc}
                    startDate={startDate}
                    endDate={endDate}
                    handleAddToCart={(equipamento) => setCart([...cart, equipamento])}
                    goToNextStep={goToNextStep}
                    goToStep5={goToStep5}
                />
            )}

            {currentStep === 5 && (
                <Step5
                    requestId={requestId}
                    startDate={startDate}
                    endDate={endDate}
                    formData={formData}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default Requisitar;
