import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import '../../App.css';
import { useStateContext } from '../../contexts/contextprovider';

const Step4 = ({ selectedUc, startDate, endDate, goToNextStep, goToStep5 }) => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const { cart, setCart } = useStateContext();

  useEffect(() => {
    axiosClient.get(`/requisicao/uc/${selectedUc.id_uc_contexto}`)
      .then(response => {
        setEquipamentos(response.data);
      })
      .catch(error => {
        console.error("Erro ao obter equipamentos:", error);
      });
  }, [selectedUc.id_uc_contexto]);

  const isAvailable = (requisicoes) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return !requisicoes.some(r => {
      const reqStart = new Date(r.data_inicio_requisicao);
      const reqEnd = new Date(r.data_fim_requisicao);
      return (start < reqEnd && end > reqStart);
    });
  };

  const openModal = (equipamento) => {
    setSelectedEquipamento(equipamento);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEquipamento(null);
  };

  const openCartModal = () => {
    setCartModalIsOpen(true);
  };

  const closeCartModal = () => {
    setCartModalIsOpen(false);
  };

  const handleAddEquipmentToCart = (equipamento) => {
    const equipamentoToAdd = {
      ...equipamento,
      equipamento_id_equipamento: equipamento.equipamentos[0].id_equipamento,
    };
    setCart([...cart, equipamentoToAdd]);
    setEquipamentos(equipamentos.filter(e => e.id_modelo_equipamento !== equipamento.id_modelo_equipamento));
    openCartModal();
  };

  const handleRemoveFromCart = (equipamento) => {
    setCart(cart.filter(item => item.id_modelo_equipamento !== equipamento.id_modelo_equipamento));
    setEquipamentos([...equipamentos, equipamento]);
  };

  return (
    <div>
      <h2>Available Equipments</h2>
      <div className="equipments-grid">
        {equipamentos.map(equipamento => (
          <div key={equipamento.id_modelo_equipamento} className="equipment-card">
            <img src={equipamento.imagem_modelo_equipamento || 'default_image.jpg'} alt={equipamento.nome_modelo_equipamento} />
            <h3>{equipamento.nome_marca_equipamento} {equipamento.nome_modelo_equipamento}</h3>
            <p>{equipamento.equipamentos[0]?.observacoes_equipamento}</p>
            <button onClick={() => openModal(equipamento)}>Ver mais</button>
            {isAvailable(equipamento.equipamentos[0]?.requisicoes) ? (
              <button className='text-green-500' onClick={() => handleAddEquipmentToCart(equipamento)}>Add to Cart</button>
            ) : (
              <p className='text-red-600'>Not available</p>
            )}
          </div>
        ))}
      </div>

      <button onClick={goToNextStep}>Next</button>

      {modalIsOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>X</button>
            {selectedEquipamento && (
              <div>
                <h2>Marca: {selectedEquipamento.nome_marca_equipamento}</h2>
                <h2>Modelo: {selectedEquipamento.nome_modelo_equipamento}</h2>
                <p>{selectedEquipamento.descricao_modelo_equipamento}</p>
                <p>{selectedEquipamento.aplicablidade_modelo_equipamento}</p>
                <p>{selectedEquipamento.cuidados_modelo_equipamento}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {cartModalIsOpen && (
        <div className="modal-overlay" onClick={closeCartModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCartModal}>X</button>
            <h3>Cart</h3>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.nome_modelo_equipamento} - {item.nome_marca_equipamento}
                  <button className='text-red-600 font-bold indent-3' onClick={() => handleRemoveFromCart(item)}>  Remove</button>
                </li>
              ))}
            </ul>
            <button onClick={goToStep5}>Proceed to Summary</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
