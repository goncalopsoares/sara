import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'react-feather';
import { useStateContext } from '../../contexts/contextprovider';

const Step2 = ({ utilizadores, selectedGroupMembers, handleUtilizadoresChange, handleRemoveGroupMember, formData, handleInputChange, handleSubmit, goToPreviousStep }) => {
    const [nomeRequisicaoCount, setNomeRequisicaoCount] = useState(formData.nome_requisicao.length);
    const [contextoRequisicaoCount, setContextoRequisicaoCount] = useState(formData.contexto_requisicao.length);
    const BASE_URL = "http://deca-sara.ua.pt/sara/public";
    const {user}= useStateContext();

    const handleNomeRequisicaoChange = (event) => {
        handleInputChange(event);
        setNomeRequisicaoCount(event.target.value.length);
    };

    const handleContextoRequisicaoChange = (event) => {
        handleInputChange(event);
        setContextoRequisicaoCount(event.target.value.length);
    };

    // Check if both nome_requisicao and contexto_requisicao have values
    const isContinueDisabled = !formData.nome_requisicao || !formData.contexto_requisicao;

    return (
        <>
            <div style={{ fontSize: "0.8rem", marginBottom: "1rem" }} className="fw-bold">Preenche com as informações gerais</div>

            <div>
                <div className="group-container">
                    <form onSubmit={handleSubmit} className="form-container">
                        <div className="form-group" style={{ marginTop: "0rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>Nome da Requisição <span style={{ color: "#CF6F00" }}>*</span></label>
                                <div style={{ fontSize: "0.8rem", color: "#818181" }}>{nomeRequisicaoCount}/32</div>
                            </div>
                            <input
                                type="text"
                                name="nome_requisicao"
                                value={formData.nome_requisicao}
                                onChange={handleNomeRequisicaoChange}
                                maxLength="32"
                                required
                                className="form-control rounded w-100"
                                style={{
                                    fontSize: "0.8rem",
                                    backgroundColor: "#FAFAFA",
                                    color: "black",
                                    marginBottom: "0.5rem"
                                }}
                                placeholder="Escreve um nome fácil de recordar"
                            />
                        </div>
                        <div className="form-group" style={{ marginTop: "1rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }}>Contexto da Requisição <span style={{ color: "#CF6F00" }}>*</span></label>
                                <div style={{ fontSize: "0.8rem", color: "#818181" }}>{contextoRequisicaoCount}/140</div>
                            </div>
                            <textarea
                                name="contexto_requisicao"
                                value={formData.contexto_requisicao}
                                onChange={handleContextoRequisicaoChange}
                                maxLength="140"
                                required
                                rows="4"
                                className="form-control rounded w-100"
                                style={{
                                    fontSize: "0.8rem",
                                    backgroundColor: "#FAFAFA",
                                    color: "black",
                                    marginBottom: "0.5rem",
                                    fontWeight: "200",
                                }}
                                placeholder="Escreve uma breve descrição do projeto. Ex: Gravações no Parque da Macaca durante a noite"
                            />
                        </div>
                        {/* andre alteracao */}
                        {user.tipo_utilizador===3 && (
                            <div>
                        <div style={{ fontSize: "0.8rem", marginBottom: "0.5rem", marginTop: "1rem" }}>Elementos do grupo</div>
                        <div className="select-container">
                            <select onChange={handleUtilizadoresChange} className="select-dropdown rounded w-100" style={{ fontSize: "0.8rem", backgroundColor: "#FAFAFA", color: "#818181", marginBottom: "0.5rem", }}>
                                <option value="" style={{ fontSize: "0.8rem" }}>Seleciona os elementos do grupo</option>
                                {utilizadores.filter(u => u.tipo_utilizador === 3 && !selectedGroupMembers.some(s => s.id_utilizador === u.id_utilizador)).map(u => (
                                    <option key={u.id_utilizador} value={u.id_utilizador}>
                                        {u.nome_utilizador} - {u.numero_mecanografico_utilizador}
                                    </option>
                                ))}
                            </select>
                            <ul className="group-list ps-0">
                                {selectedGroupMembers.map(u => {
                                    const imageUrl = `${BASE_URL}${u.avatar_utilizador}`;

                                    return (
                                        <li key={u.id_utilizador} className="group-list-item"
                                            style={{
                                                cursor: "pointer",
                                                padding: "0.5rem",
                                                borderRadius: "0.25rem",
                                                marginBottom: "0.5rem",
                                                backgroundColor: "#F3FAE6",
                                                color: "black",
                                                fontSize: "0.8rem",
                                                display: "flex",
                                                alignItems: "center"
                                            }}
                                        >
                                            <img
                                                style={{ height: "1.5rem", width: "1.5rem", marginRight: "0.5rem", borderRadius: "50%" }}
                                                className="img-fluid rounded-circle"
                                                src={imageUrl}
                                                alt="User Avatar"
                                            />
                                            {u.nome_utilizador}
                                            <X
                                                onClick={() => handleRemoveGroupMember(u.id_utilizador)}
                                                className="p-2 text-red-600"
                                                style={{ marginLeft: "auto", cursor: "pointer", color: "black" }}
                                                size={32}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        </div>
                        )}
                        <div className="d-flex justify-content-between">
                            <button
                                className='btn btn-sara-secondary'
                                onClick={goToPreviousStep}
                            >
                                <ArrowLeft className='inline-block align-middle me-3' />
                                <span className="text-uppercase" style={{ fontSize: "0.8rem" }}>Voltar</span>
                            </button>
                            <button
                                type="submit"
                                className='btn btn-sara-primary'
                                disabled={isContinueDisabled} // Disable the button if nome_requisicao or contexto_requisicao is empty
                            >
                                <span className="text-uppercase" style={{ fontSize: "0.8rem" }}>Continuar</span>
                                <ArrowRight className='inline-block align-middle ms-3' />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Step2;
