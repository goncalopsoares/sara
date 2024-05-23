import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import Step1 from '../components/Requisitar/step_1';
import Step2 from '../components/Requisitar/step_2';
import Step3 from '../components/Requisitar/step_3';
import "../App.css";
import 'react-datepicker/dist/react-datepicker.css';

const Requisitar = () => {
  const { user } = useStateContext();
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

  // State for step 3
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    axiosClient.get(`/estudantehome/uc/${user.id_utilizador}`)
      .then(response => {
        setUcs(response.data);
      })
      .catch(error => {
        console.error("Erro ao obter UCs:", error);
      });
  }, [user.id_utilizador]);

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
        setUtilizadores(ucUtilizadores);

        const ucProfessores = ucUtilizadores.filter(u => u.tipo_utilizador === 2);
        setProfessores(ucProfessores);

        const sara = ucUtilizadores.filter(u => u.tipo_utilizador === 1).map(u => ({
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
    console.log("Selected Start Date: ", start);
    console.log("Selected End Date: ", end);
    // Handle the date submission, e.g., proceed to the next step or submit the form
  };

  const generateRandomPin = () => {
    return Math.random().toString(36).substring(2, 6);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData
    };

    axiosClient.post('/requisicao', finalData)
      .then(response => {
        console.log("Requisição criada com sucesso:", response.data);
      })
      .catch(error => {
        console.error("Erro ao criar requisição:", error);
      });
  };

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  console.log(formData)
  console.log(startDate, endDate)

  return (
    <div>
      <h1 className='mb-3'>Requisitar</h1>
      <div className="breadcrumb">
        {currentStep && (
          <>
            <div onClick={() => setCurrentStep(1)} className={`step ${currentStep === 1 ? 'active' : ''}`}>UC</div>
            <div onClick={() => setCurrentStep(2)} className={`step ${currentStep === 2 ? 'active' : ''}`}>Info</div>
            <div onClick={() => setCurrentStep(3)} className={`step ${currentStep === 3 ? 'active' : ''}`}>Datas</div>

            {/* <div className={`step ${currentStep === 3 ? 'active' : ''}`}>Datas</div>  */}
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
          handleSubmit={handleSubmit}
        />
      )}

      {currentStep === 3 && (
        <Step3
          handleDateSubmit={handleDateSubmit}
        />
      )}
    </div>
  );
};

export default Requisitar;
