import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosClient from '../axiosClient';
import { ShoppingCart, Info } from 'react-feather';

export default function Equipamentos() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [equipamentos, setEquipamentos] = useState([]);
    const [visibleEquipamentos, setVisibleEquipamentos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const observer = useRef();

    const ITEMS_PER_PAGE = 10;
    const BASE_URL = "http://localhost:8000";

    useEffect(() => {
        axiosClient.get(`/equipamentos`)
            .then(response => {
                const equipamentosData = response.data.equipamentos;
                let uniqueCategories = [...new Set(equipamentosData.map(e => e.nome_categoria))].filter(category => category !== null);
                uniqueCategories = ["Todos", ...uniqueCategories];
                setCategories(uniqueCategories);
                setEquipamentos(equipamentosData);
                setVisibleEquipamentos(equipamentosData.slice(0, ITEMS_PER_PAGE));
                setLoading(false);
            })
            .catch(error => {
                console.error('Erro ao obter equipamentos:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    const loadMore = useCallback(() => {
        setVisibleEquipamentos(prevVisibleEquipamentos => {
            const filteredEquipamentos = selectedCategory === "Todos"
                ? equipamentos
                : equipamentos.filter(e => e.nome_categoria === selectedCategory);

            const newVisibleEquipamentos = [
                ...prevVisibleEquipamentos,
                ...filteredEquipamentos.slice(prevVisibleEquipamentos.length, prevVisibleEquipamentos.length + ITEMS_PER_PAGE)
            ];

            if (newVisibleEquipamentos.length >= filteredEquipamentos.length) {
                setHasMore(false);
            }

            return newVisibleEquipamentos;
        });
    }, [equipamentos, selectedCategory]);

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

    const handleCategoryClick = category => {
        setSelectedCategory(category);
        setVisibleEquipamentos([]);
        setHasMore(true);
    };

    useEffect(() => {
        setVisibleEquipamentos([]);
        setHasMore(true);
        if (selectedCategory) {
            loadMore();
        }
    }, [selectedCategory, loadMore]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading data</p>;
    }

    return (
        <>
            <div style={{ marginBottom: "4rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <div className="mobile-title">Equipamentos</div>
                </div>
                <div style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap" }}>
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`mt-2 mr-2 ${category === selectedCategory ? "btn-sara-terciary-selected" : "btn-sara-terciary"}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div>
                    {/* List of Equipamento Cards */}
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {visibleEquipamentos.map((equipamento, index) => {
                            const imageUrl = `${BASE_URL}${equipamento.imagem_modelo_equipamento}`;
                            return (
                                <div key={index} ref={visibleEquipamentos.length === index + 1 ? lastEquipamentoElementRef : null} className="card mt-4 border-0 position-relative">
                                    <div className="row align-items-center">
                                        <div className="col-4 d-flex justify-content-center">
                                            <img src={equipamento.imagem_modelo_equipamento || '/src/images/equipamento/noImg.png'} className="img-fluid" />
                                        </div>
                                        <div className="col-8 d-flex flex-column justify-content-between">
                                            <div>
                                                <div className="font-bold">
                                                    {equipamento.nome_marca_equipamento} {equipamento.nome_modelo_equipamento}
                                                </div>
                                                <div className="txt-grey-700 mb-2" style={{ fontSize: "0.8rem" }}>
                                                    {equipamento.nome_categoria}
                                                </div>
                                            </div>
                                            <div className="mt-2">
                                                <button className="btn-sara-terciary d-flex align-items-center">
                                                    <ShoppingCart size={16} className="me-3" /> Adicionar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="position-absolute" style={{ top: '10px', right: '10px' }}>
                                        <Info size={20} /> {/* Adjust size as needed */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {loading && <p>Loading more items...</p>}
                </div>
            </div>
        </>
    );
}
