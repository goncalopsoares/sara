import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../contexts/contextprovider';
import { useNavigate } from 'react-router-dom';

const Step5 = ({ requestId, startDate, endDate, formData }) => {
  const { cart, setCart } = useStateContext();
  const navigate = useNavigate();
  const [utilizadores, setUtilizadores] = useState([]);

  useEffect(() => {
    axiosClient.get('/nomesutilizadores')
      .then(response => {
        setUtilizadores(response.data);
      })
      .catch(error => {
        console.error("Erro ao obter nomes dos utilizadores:", error);
      });
  }, []);

  const getUserName = (id) => {
    const user = utilizadores.find(user => user.id_utilizador === id);
    return user ? user.nome_utilizador : 'Nome não encontrado';
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
  };

  const professor = formData.requisicao_has_utilizadores.find(utilizador => utilizador.role_utilizador === 2);
  const groupMembers = formData.requisicao_has_utilizadores.filter(utilizador => utilizador.role_utilizador === 4);

  return (
    <div>
      <h2>Request Summary</h2>
      <p>Request Name: {formData.nome_requisicao}</p>
      <p>Context: {formData.contexto_requisicao}</p>
      <p>Request Type: {formData.tipo_requisicao}</p>
      <p>Start Date: {formatDate(startDate)}</p>
      <p>End Date: {formatDate(endDate)}</p>
      <h3>Selected Equipment</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.nome_modelo_equipamento} - {item.nome_marca_equipamento}</li>
        ))}
      </ul>
      {professor && (
        <div>
          <h3>Professor</h3>
          <p>Name: {getUserName(professor.utilizador_id_utilizador)}</p>
        </div>
      )}
      {groupMembers.length > 0 && (
        <div>
          <h3>Group Members</h3>
          <ul>
            {groupMembers.map((member, index) => (
              <li key={index}>Name: {getUserName(member.utilizador_id_utilizador)}</li>
            ))}
          </ul>
        </div>
      )}
      <button className='text-dark bg-green-300 p-2' onClick={submitRequest}>Submit Request</button>
    </div>
  );
};

export default Step5;
