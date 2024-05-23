import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import "../App.css"
import { FaArrowAltCircleRight } from "react-icons/fa";

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
  const [currentStep, setCurrentStep] = useState(1); // Controla a fase atual do processo

console.log(formData)

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
          role_utilizador: 3, // Requisitante
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

        // Adicionar utilizadores tipo 1 (SARA) ao formulário
        const sara = ucUtilizadores.filter(u => u.tipo_utilizador === 1).map(u => ({
          utilizador_id_utilizador: u.id_utilizador,
          role_utilizador: 1, // SARA
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
          role_utilizador: 2, // Professor
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
            role_utilizador: 4, // Role para os selecionados do grupo
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

  return (
    <div>
      <h1 className='mb-3'>Requisitar</h1>
      <div className="breadcrumb">
        <div onClick={()=>setCurrentStep(1)} className={`step ${currentStep === 1 ? 'active' : ''}`}>UC</div>
        <div onClick={()=>setCurrentStep(2)} className={`step ${currentStep === 2 ? 'active' : ''}`}>Info</div>
      </div>

      {currentStep === 1 && (
        <div>
          <h2 className='mt-5 mb-5'>Escolha a UC e o Professor</h2>
          {ucs.map(uc => (
            <div className='bg-grey-100 mb-4' key={uc.id_uc_contexto}>
              <h4>{uc.nome_uc_contexto}</h4>
              <p>{uc.sigla_uc_contexto}</p>
              <button className=' text-green-400 p-3' onClick={() => handleUcSelect(uc)}>Selecionar UC</button>
      
              {selectedUc && selectedUc.id_uc_contexto === uc.id_uc_contexto && (
                <div>
                  <select onChange={handleProfessorSelect}>
                    <option value="">Professor</option>
                    {professores.map(professor => (
                      <option key={professor.id_utilizador} value={professor.id_utilizador}>
                        {professor.nome_utilizador}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
          {selectedUc && selectedProfessor && (
            <FaArrowAltCircleRight className='text-end' size={40} onClick={() => setCurrentStep(2)} />
          )}
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h3 className='mt-5 mb-5'>Informação geral</h3>
          <div className="group-container">
            <h4>Elementos do grupo</h4>
            <div className="select-container">
              <select onChange={handleUtilizadoresChange} className="select-dropdown">
                <option value="">Selecione os elementos do grupo</option>
                {utilizadores.filter(u => u.tipo_utilizador === 3 && u.id_utilizador !== user.id_utilizador && !selectedGroupMembers.some(s => s.id_utilizador === u.id_utilizador)).map(u => (
                  <option key={u.id_utilizador} value={u.id_utilizador}>
                    {u.nome_utilizador} - {u.numero_mecanografico_utilizador}
                  </option>
                ))}
              </select>
              <ul className="group-list">
                {selectedGroupMembers.map(u => (
                  <li key={u.id_utilizador} className="group-list-item">
                    {u.nome_utilizador} - {u.numero_mecanografico_utilizador}
                    <button onClick={() => handleRemoveGroupMember(u.id_utilizador)} className="p-2 text-red-600">Remover</button>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-group">
                <label>Nome da Requisição:</label>
                <input
                  type="text"
                  name="nome_requisicao"
                  value={formData.nome_requisicao}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Contexto da Requisição:</label>
                <textarea
                  name="contexto_requisicao"
                  value={formData.contexto_requisicao}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="form-control"
                />
              </div>
              <button type="submit" className="bg-green-200 p-2 mt-2 text-black fw-bolder rounded-2">Criar Requisição</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requisitar;
