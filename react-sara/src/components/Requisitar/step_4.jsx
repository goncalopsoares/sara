import React, { useState, useEffect, useRef, useCallback } from 'react';
import axiosClient from '../../axiosClient';
import '../../App.css';
import { useStateContext } from '../../contexts/contextprovider';
import { ShoppingCart, Info,X } from 'react-feather';


const Step4 = ({ selectedUc, startDate, endDate, goToNextStep, goToStep5 }) => {
    const [equipamentos, setEquipamentos] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedEquipamento, setSelectedEquipamento] = useState(null);
    const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedSubCategory, setSelectedSubCategory] = useState('All');
    const { cart, setCart } = useStateContext();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredEquipamentos, setFilteredEquipamentos] = useState([]);
    const [visibleEquipamentos, setVisibleEquipamentos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const BASE_URL = "http://deca-sara.ua.pt:8080";
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        axiosClient.get(`/requisicao/uc/${selectedUc.id_uc_contexto}`)
            .then(response => {
                setEquipamentos(response.data);
                setLoading(false); // Add this line
            })
            .catch(error => {
                console.error("Erro ao obter equipamentos:", error);
                setError(error); // Add this line
                setLoading(false); // Add this line
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

    const filterEquipamentos = useCallback(() => {
        const filtered = equipamentos.filter(equipamento => {
            const categoriesMatch = selectedCategory === 'All' || equipamento.equipamentos.some(e => e.nome_categoria === selectedCategory);
            const subCategoriesMatch = selectedSubCategory === 'All' || equipamento.equipamentos.some(e => e.nome_sub_categoria === selectedSubCategory);
            return categoriesMatch && subCategoriesMatch;
        });

        setFilteredEquipamentos(filtered);
        setVisibleEquipamentos(filtered.slice(0, ITEMS_PER_PAGE));
        setHasMore(filtered.length > ITEMS_PER_PAGE);
    }, [equipamentos, selectedCategory, selectedSubCategory, ITEMS_PER_PAGE]);

    useEffect(() => {
        filterEquipamentos();
    }, [filterEquipamentos]);

    const loadMore = useCallback(() => {
        setVisibleEquipamentos(prevVisibleEquipamentos => {
            const newVisibleEquipamentos = [
                ...prevVisibleEquipamentos,
                ...filteredEquipamentos.slice(prevVisibleEquipamentos.length, prevVisibleEquipamentos.length + ITEMS_PER_PAGE)
            ];

            if (newVisibleEquipamentos.length >= filteredEquipamentos.length) {
                setHasMore(false);
            }

            return newVisibleEquipamentos;
        });
    }, [filteredEquipamentos, ITEMS_PER_PAGE]);

    const lastEquipamentoElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                loadMore();
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, loadMore]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data</p>;
    }



    return (
        <div>
            <div style={{ marginBottom: "1rem" }}>
                <div className="mobile-title">Equipamentos</div>
            </div>
            <div>
                <div style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap" }}>
                    {uniqueCategories.map((category, index) => (
                        <button
                            key={index}
                            className={`mt-2 mr-2 ${selectedCategory === category ? "btn-sara-terciary-selected" : "btn-sara-terciary"}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {visibleEquipamentos.map((equipamento, index) => {
                    let imageUrl = equipamento.imagem_modelo_equipamento
                        ? `${BASE_URL}${equipamento.imagem_modelo_equipamento}`
                        : `${BASE_URL}/images/equipamento/noImg.png`;

                    // Combine the brand and model name
                    let brandAndModel = `${equipamento.nome_marca_equipamento} ${equipamento.nome_modelo_equipamento}`;

                    // Truncate if the combined string exceeds 12 characters
                    let displayBrandAndModel =
                        brandAndModel.length > 12
                            ? `${brandAndModel.slice(0, 12)}...`
                            : brandAndModel;

                    return (
                        <div key={equipamento.id_modelo_equipamento} ref={visibleEquipamentos.length === index + 1 ? lastEquipamentoElementRef : null} className="card mt-4 border-0 position-relative">
                            <div className="row align-items-center">
                                <div className="col-4 d-flex justify-content-center">
                                    <img
                                        src={imageUrl}
                                        alt={equipamento.nome_modelo_equipamento}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-8 d-flex flex-column justify-content-between">
                                    <div>
                                        <div className="font-bold">
                                            {displayBrandAndModel}
                                        </div>
                                        <div className="txt-grey-700 mb-2" style={{ fontSize: "0.8rem" }}>
                                            {equipamento.equipamentos[0]?.nome_categoria}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        {isAvailable(equipamento.equipamentos[0]?.requisicoes) && (
                                        <button
                                            className={`btn-sara-terciary d-flex align-items-center ${
                                                isAvailable(equipamento.equipamentos[0]?.requisicoes) ? "text-green-200 fw-bolder" : "text-red-600"
                                            }`}
                                            onClick={() => {
                                                if (isAvailable(equipamento.equipamentos[0]?.requisicoes)) {
                                                    handleAddEquipmentToCart(equipamento);
                                                }
                                            }}
                                            disabled={!isAvailable(equipamento.equipamentos[0]?.requisicoes)}
                                        >
                                            <ShoppingCart size={16} className="me-3" /> Adicionar ao carrinho
                                        </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                                <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                                   
                                    <Info  onClick={() => openModal(equipamento)} size={20} /> {/* Adjust size as needed */}
                                </div>
                            
                        </div>
                    );
                })}
            </div>

        {modalIsOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close pe-1 fs-4 font-sans " onClick={closeModal}>x</button>
            {selectedEquipamento && (
              <div>
                <h5>Marca:<span className="fs-6 font-thin">  {selectedEquipamento.nome_marca_equipamento} </span></h5>
                <h5>Modelo:<span className="fs-6 font-thin"> {selectedEquipamento.nome_modelo_equipamento} </span></h5>
                {selectedEquipamento.descricao_modelo_equipamento
                  && <h5>Descrição:<span className="fs-6 font-thin">  {selectedEquipamento.descricao_modelo_equipamento} </span></h5>}
                  {selectedEquipamento.aplicablidade_modelo_equipamento 
                  && <h5>Aplicabilidade: <span className="fs-6 font-thin"> {selectedEquipamento.aplicablidade_modelo_equipamento} </span></h5>}
                    {selectedEquipamento.cuidados_modelo_equipamento
                     && <h5>Cuidados: <span className="fs-6 font-thin"> {selectedEquipamento.cuidados_modelo_equipamento} </span></h5>}
               
              </div>
            )}
          </div>
        </div>
      )}

            {cartModalIsOpen && (
                <div className="modal-overlay" onClick={closeCartModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="font-bold mb-4">Adicionado ao carrinho com sucesso!</div>
                        <div className="mb-4">
                            {cart.map((item, index) => {
                                console.log(cart);
                                console.log(item);
                                let imageUrl = item.imagem_modelo_equipamento
                                    ? `${BASE_URL}${item.imagem_modelo_equipamento}`
                                    : `${BASE_URL}/images/equipamento/noImg.png`;
                                return (
                                    <div key={index} className="d-flex align-items-center mb-3">
                                        <div className="col-2 mr-2"><img src={imageUrl} className="img-fluid" /></div>
                                        <div className="col-6">{item.nome_marca_equipamento} {item.nome_modelo_equipamento}</div>
                                        <X onClick={() => handleRemoveFromCart(item)} className="text-red-600 ml-auto" />
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={goToStep5} className="btn-sara-quaternary mb-2">Checkout</button>
                        <button onClick={closeCartModal} className="btn-sara-terciary">Continuar a Requisitar</button>
                    </div>
                </div>
            )}

    </div>
  );
};

export default Step4;
