import React from 'react';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../contexts/contextprovider';
import { useNavigate } from 'react-router-dom';

const Step5 = ({ requestId, startDate, endDate, formData }) => {
  const { cart, setCart } = useStateContext();

  const navigate = useNavigate();

  const submitRequest = () => {
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

    const requestBody = {
      requisicao_id_requisicao: requestId,
      estado_id_estado: 1,
      data_estado: formatDate(new Date()),
      requisicao_has_equipamentos: cart.map(equipment => ({
        requisicao_id_requisicao: requestId,
        equipamento_id_equipamento: equipment.equipamento_id_equipamento, // Certifique-se de que 'equipamento_id_equipamento' está definido
        data_inicio_requisicao: formatDate(startDate),
        data_fim_requisicao: formatDate(endDate),
      })),
    };

    axiosClient.post(`/requisicao/${requestId}`, requestBody)
      .then(response => {
        console.log("Requisição finalizada com sucesso:", response.data);
        setCart([]);
        navigate('/home', /* { state: { successMessage: 'Registo criado com sucesso!' } } */)

      })
      .catch(error => {
        console.error("Erro ao finalizar requisição:", error);
      });
  };

  return (
    <div>
      <h2>Request Summary</h2>
      <p>Request Name: {formData.nome_requisicao}</p>
      <p>Context: {formData.contexto_requisicao}</p>
      <p>Request Type: {formData.tipo_requisicao}</p>
      <p>Start Date: {startDate.toString()}</p>
      <p>End Date: {endDate.toString()}</p>
      <h3>Selected Equipment</h3>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.nome_modelo_equipamento} - {item.nome_marca_equipamento}</li>
        ))}
      </ul>
      <button onClick={submitRequest}>Submit Request</button>
    </div>
  );
};

export default Step5;
