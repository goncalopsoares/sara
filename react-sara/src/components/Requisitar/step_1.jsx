import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-feather';
import "../../App.css";
import { useStateContext } from '../../contexts/contextprovider';

const Step1 = ({ ucs, selectedProfessor, professores, handleUcSelect: parentHandleUcSelect, handleProfessorSelect, goToNextStep }) => {
    const BASE_URL = "http://localhost:8000";
    const [selectedUcId, setSelectedUcId] = useState(null);
    const [selectedProfessorId, setSelectedProfessorId] = useState(null);
    const [isContinueDisabled, setIsContinueDisabled] = useState(true);
    const {user}= useStateContext();

    const handleUcSelect = (uc) => {
        const newSelectedUcId = selectedUcId === uc.id_uc_contexto ? null : uc.id_uc_contexto;
        setSelectedUcId(newSelectedUcId);
        if (parentHandleUcSelect) {
            parentHandleUcSelect(uc);
            //andre alteracao
            if(user.tipo_utilizador===2){
                setIsContinueDisabled(false);
            }
        }
        if (newSelectedUcId === null) {
            setSelectedProfessorId(null); // Reset professor selection if UC is deselected
            setIsContinueDisabled(true); // Disable continue button if UC is deselected
        
        }
    };

    const handleProfessorClick = (professorId) => {
        if (selectedProfessorId === professorId) {
            // If the clicked professor is already selected, unselect them
            setSelectedProfessorId(null);
            setIsContinueDisabled(true); // Disable the continue button
        } else {
            // If a different professor is clicked, select them
            setSelectedProfessorId(professorId);
            setIsContinueDisabled(false); // Enable the continue button
            handleProfessorSelect({ target: { value: professorId } });
        }
    };

    return (
        <>
            <div style={{fontSize:"0.8rem", marginBottom: "1rem" }} className="fw-bold">Escolhe uma unidade curricular, para depois selecionares o teu professor associado à requisição</div>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {ucs.map(uc => {
                        if (!uc.icone_uc_contexto) {
                            return ;
                        }
                        const imageUrl = `${BASE_URL}${uc.icone_uc_contexto}`;
                        const isSelected = selectedUcId === uc.id_uc_contexto;
                        const truncatedNomeUc = uc.nome_uc_contexto.length > 27 ? `${uc.nome_uc_contexto.substring(0, 27)}...` : uc.nome_uc_contexto;

                        return (
                            <React.Fragment key={uc.id_uc_contexto}>
                                <div
                                    className={`background-grey-300 mb-4`}
                                    style={{
                                        borderRadius: "1rem",
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        height: "5rem",
                                        backgroundColor: isSelected ? '#F3FAE6' : '#f0f0f0', // Change background color if selected
                                    }}
                                    onClick={() => handleUcSelect(uc)}
                                >
                                    <div style={{ width: "5rem", height: "100%" }}>
                                        <img src={imageUrl} alt="UC Icon" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div style={{ padding: "0.5rem", flex: 1 }}>
                                        <div style={{ fontSize: "0.8rem", fontWeight: "700", paddingTop: "0.5rem" }}>{uc.sigla_uc_contexto}</div>
                                        <div className="truncate-text" style={{ fontSize: "0.8rem", paddingBottom: "0.5rem", whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {truncatedNomeUc}
                                        </div>
                                    </div>
                                </div>
                                {/* andre alteracao */}
                                {isSelected && user.tipo_utilizador===3  &&(
                                    <div style={{ marginTop: "0.5rem", marginBottom: "3rem" }}>
                                        <div style={{ fontSize: "0.8rem", marginBottom: "0.5rem" }} className="fw-bold">Escolhe um professor</div>
                                        <div>
                                       
                                            {professores.map(professor => {
                                                const imageUrl = `${BASE_URL}${professor.avatar_utilizador}`;

                                                return (
                                                    <div
                                                        key={professor.id_utilizador}
                                                        style={{
                                                            cursor: "pointer",
                                                            padding: "0.5rem",
                                                            borderRadius: "0.25rem",
                                                            marginBottom: "0.5rem",
                                                            backgroundColor: selectedProfessorId === professor.id_utilizador ? '#F3FAE6' : 'transparent',
                                                            color: "black",
                                                            fontSize: "0.8rem",
                                                            display: "flex",
                                                            alignItems: "center"
                                                        }}
                                                        onClick={() => handleProfessorClick(professor.id_utilizador)}
                                                    >
                                                        <img
                                                            style={{ height: "1.5rem", marginRight: "0.5rem", borderRadius: "50%" }}
                                                            className="img-fluid rounded-circle"
                                                            src={imageUrl}
                                                            alt="Professor Avatar"
                                                        />
                                                        {professor.nome_utilizador}
                                                    </div>
                                                );
                                            })}
                                
                                        </div>
                                    </div>
                                )}
                                
                            </React.Fragment>
                        );
                    })}
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        className='btn btn-sara-secondary opacity-0'
                    >
                        <ArrowLeft className='inline-block align-middle me-3' />
                        <span className="text-uppercase" style={{ fontSize: "0.8rem" }}>Voltar</span>
                    </button>
                    <button
                        className='btn btn-sara-primary'
                        disabled={isContinueDisabled}
                        onClick={goToNextStep}
                    >
                        <span className="text-uppercase" style={{ fontSize: "0.8rem" }}>Continuar</span>
                        <ArrowRight className='inline-block align-middle ms-3' />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Step1;
