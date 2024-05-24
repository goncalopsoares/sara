import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosClient from '../axiosClient';
import { ShoppingCart } from 'react-feather';


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

    useEffect(() => {
        axiosClient.get(`/equipamentos`)
            .then(response => {
                console.log('equipamentos:', response.data);
                const equipamentosData = response.data.equipamentos;

                // Extract unique categories and filter out empty strings
                let uniqueCategories = [...new Set(equipamentosData.map(e => e.nome_categoria))].filter(category => category !== null);

                // Add "Todos" at the beginning of the array
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
            if (newVisibleEquipamentos.length === filteredEquipamentos.length) {
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
    }, [selectedCategory]);

    useEffect(() => {
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
                            if (visibleEquipamentos.length === index + 1) {
                                return (
                                    <div key={index} ref={lastEquipamentoElementRef} className="card">
                                        <h3>{equipamento.nome_marca_equipamento} {equipamento.nome_modelo_equipamento}</h3>
                                        <p>{equipamento.nome_categoria}</p>
                                        <p>{equipamento.numero_serie_equipamento}</p>
                                        <p>{equipamento.observacoes_equipamento}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={index} className="card mt-4 border-0">
                                        <div className="row">
                                            <div className="col-4">
                                                <img src="https://d2e6ccujb3mkqf.cloudfront.net/5b8bf1d5-3769-498b-a0fa-c1f3d8ea6b43-1_cd3efcee-d1d8-4d60-89c4-2d53e4563477.jpg" className="img-fluid"/>
                                            </div>
                                            <div className="col-8">
                                                <div className="row font-bold">
                                                    {equipamento.nome_marca_equipamento} {equipamento.nome_modelo_equipamento}
                                                </div>
                                                <div className="row txt-grey-700 mb-2" style={{fontSize:"0.8rem"}}>
                                                    {equipamento.nome_categoria}
                                                </div>
                                                <div>
                                                    <button className="btn-sara-terciary d-flex align-items-center"><ShoppingCart size={16} className="me-3"/> Adicionar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    {loading && <p>Loading more items...</p>}
                </div>
            </div>
        </>
    );
}
