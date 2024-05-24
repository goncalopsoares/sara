import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import '../../App.css';
import { useStateContext } from '../../contexts/contextprovider';

const Step4 = ({ selectedUc, startDate, endDate, goToNextStep, goToStep5 }) => {
  const [equipamentos, setEquipamentos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEquipamento, setSelectedEquipamento] = useState(null);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const uniqueCategories = ['All', ...new Set(equipamentos.flatMap(equipamento =>
    equipamento.equipamentos.map(e => e.nome_categoria).filter(Boolean)
  ))];

  const uniqueSubCategories = ['All', ...new Set(equipamentos.flatMap(equipamento =>
    equipamento.equipamentos.map(e => e.nome_sub_categoria).filter(Boolean)
  ))];

  const filteredEquipamentos = equipamentos.filter(equipamento => {
    const categoriesMatch = selectedCategory === 'All' || equipamento.equipamentos.some(e => e.nome_categoria === selectedCategory);
    const subCategoriesMatch = selectedSubCategory === 'All' || equipamento.equipamentos.some(e => e.nome_sub_categoria === selectedSubCategory);
    return categoriesMatch && subCategoriesMatch;
  });

  return (
    <div>
      <h2>Equipamento disponivel</h2>
      <div className="category-buttons">
        <h4>Categorias</h4>
        {uniqueCategories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="subcategory-buttons">
        <h4>Subcategorias</h4>
        {uniqueSubCategories.map(subCategory => (
          <button
            key={subCategory}
            onClick={() => handleSubCategoryChange(subCategory)}
            className={selectedSubCategory === subCategory ? 'active' : ''}
          >
            {subCategory}
          </button>
        ))}
      </div>
      <div className="equipments-grid">
        {filteredEquipamentos.map(equipamento => (
          <div key={equipamento.id_modelo_equipamento} className="equipment-card">
            <img src={equipamento.imagem_modelo_equipamento || 'default_image.jpg'} alt={equipamento.nome_modelo_equipamento} />
            <h3>{equipamento.nome_marca_equipamento} {equipamento.nome_modelo_equipamento}</h3>
            <p>{equipamento.equipamentos[0]?.observacoes_equipamento}</p>
            <button onClick={() => openModal(equipamento)}>Ver mais</button>
            {isAvailable(equipamento.equipamentos[0]?.requisicoes) ? (
              <button className='text-green-200 indent-4 fw-bolder' onClick={() => handleAddEquipmentToCart(equipamento)}>Adicionar ao carrinho</button>
            ) : (
              <p className='text-red-600'>Não disponivel</p>
            )}
          </div>
        ))}
      </div>

      

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
            <h3>Carrinho</h3>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.nome_modelo_equipamento} - {item.nome_marca_equipamento}
                  <button className='text-red-600 font-bold indent-3' onClick={() => handleRemoveFromCart(item)}>  Remover do carrinho</button>
                </li>
              ))}
            </ul>
            <button onClick={goToStep5}>Avançar para o resumo</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;
