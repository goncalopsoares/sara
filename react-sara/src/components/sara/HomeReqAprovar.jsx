import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function HomeReqAprovar({ porAprovar }) {

    const [filter, setFilter] = useState('mostRecent');
    const [filteredData, setFilteredData] = useState([...porAprovar]);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    function calculateDaysPassed(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const timeDifference = today - date;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference;
    }

    useEffect(() => {
        let sortedData = [...porAprovar];
        if (filter === 'mostRecent') {
            sortedData.sort((a, b) => new Date(b.data_estado) - new Date(a.data_estado));
        } else {
            sortedData.sort((a, b) => new Date(a.data_estado) - new Date(b.data_estado));
        }
        setFilteredData(sortedData);
    }, [filter, porAprovar]);


    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div>
            <h1>Por aprovar</h1>
            <div className="filter-dropdown">
                <label htmlFor="filter">Ordenar por: </label>
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="mostRecent">Mais Recentes Primeiro</option>
                    <option value="moreAntique">Mais Antigos Primeiro</option>
                </select>
            </div>
            {filteredData.map(req => (
                <Link to={`/requisicao/${req.id_requisicao}`} key={req.id_requisicao} style={{ textDecoration: 'none' }}>
                <div key={req.id_requisicao} className={`background-green-50 p-4 mb-2`} style={{ borderRadius: "1rem" }}>
                    <div className="d-flex align-items-center mb-2">
                        <div style={{ fontSize: "0.8rem", fontWeight: "700" }}>
                            {calculateDaysPassed(req.data_estado) > 1 ? (<span> Há {calculateDaysPassed(req.data_estado)} dias</span>) :  calculateDaysPassed(req.data_estado) === 1 ? (<span> Há {calculateDaysPassed(req.data_estado)} dia</span>) :(<span>Hoje</span>)}
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <div style={{ fontSize: "1rem", fontWeight: "400" }}>Requisição {req.id_requisicao}</div>
                        <div className="ps-5" style={{ fontSize: "1rem", fontWeight: "400" }}>{req.nome_uc_contexto}</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="font-bold" style={{ fontSize: "0.8rem" }}>
                                Data de Recolha
                            </div>
                            <div style={{ fontSize: "0.8rem" }}>
                                {formatDate(req.data_inicio_requisicao)}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="font-bold" style={{ fontSize: "0.8rem" }}>
                                Data de Devolução
                            </div>
                            <div style={{ fontSize: "0.8rem" }}>
                                {formatDate(req.data_fim_requisicao)}
                            </div>
                            <div className="d-flex mb-2">
                                {req.utilizador.map((user, index) => (

                                    user.role_utilizador === 3 ? (
                                        <div>
                                            <img key={index} className="rounded-full" src={`http://localhost:8000${user.avatar_utilizador}`} style={{ height: "3rem", width: "3rem", marginRight: "0.5rem" }} />
                                            <div style={{ fontSize: "0.8rem", fontWeight: "400" }}>{user.nome_utilizador}</div>
                                            <div style={{ fontSize: "0.8rem", fontWeight: "400" }}>{user.email_utilizador}</div>
                                        </div>
                                    ) : user.role_utilizador === 4 ? (<img key={index} className="rounded-full" src={`http://localhost:8000${user.avatar_utilizador}`} style={{ height: "2rem", width: "2rem", marginRight: "0.5rem" }} />) : null

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    );
}