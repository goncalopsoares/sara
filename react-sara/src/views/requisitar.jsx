import React, { useState, useEffect } from 'react';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';

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

        // Adicionar utilizadores tipo 1 (estudantes) ao formulário
        const estudantes = ucUtilizadores.filter(u => u.tipo_utilizador === 1).map(u => ({
          utilizador_id_utilizador: u.id_utilizador,
          role_utilizador: 1, // Responsáveis
          pin_recolha: pinRecolha,
          pin_devolucao: pinDevolucao
        }));

        setFormData((prevFormData) => ({
          ...prevFormData,
          requisicao_has_utilizadores: [
            ...prevFormData.requisicao_has_utilizadores.filter(u => u.role_utilizador !== 1),
            ...estudantes
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
      <h1>Requisitar</h1>
      <div>
        {ucs.map(uc => (
          <div key={uc.id_uc_contexto}>
            <h2>{uc.nome_uc_contexto}</h2>
            <p>{uc.sigla_uc_contexto}</p>
            <img src={uc.icone_uc_contexto} alt={uc.nome_uc_contexto} />
            <button onClick={() => handleUcSelect(uc)}>Selecionar UC</button>

            {selectedUc && selectedUc.id_uc_contexto === uc.id_uc_contexto && (
              <div>
                <h3>Selecionar Professor</h3>
                <select onChange={handleProfessorSelect}>
                  <option value="">Selecione um professor</option>
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
      </div>

      {selectedProfessor && (
        <div>
          <h2>Adicionar Elementos ao Grupo</h2>
          <div>
            <select onChange={handleUtilizadoresChange}>
              <option value="">Selecione um utilizador</option>
              {utilizadores.filter(u => u.tipo_utilizador === 3 && !selectedGroupMembers.some(s => s.id_utilizador === u.id_utilizador)).map(u => (
                <option key={u.id_utilizador} value={u.id_utilizador}>
                  {u.nome_utilizador} - {u.numero_mecanografico_utilizador}
                </option>
              ))}
            </select>
            <ul>
              {selectedGroupMembers.map(u => (
                <li key={u.id_utilizador}>
                  {u.nome_utilizador} - {u.numero_mecanografico_utilizador}
                  <button onClick={() => handleRemoveGroupMember(u.id_utilizador)}>Remover</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedProfessor && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome da Requisição:</label>
            <input
              type="text"
              name="nome_requisicao"
              value={formData.nome_requisicao}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Contexto da Requisição:</label>
            <textarea
              name="contexto_requisicao"
              value={formData.contexto_requisicao}
              onChange={handleInputChange}
              required
              rows="4"
            />
          </div>
          <button type="submit">Enviar Requisição</button>
        </form>
      )}
    </div>
  );
};

export default Requisitar;
