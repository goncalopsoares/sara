import React from "react";
import { CheckCircle, XCircle } from "react-feather";

export default function ModalAprovarSara({ hideModal, handleClick, idRequisicao, nomeRequisicao }) {

    return (
        <div className="modal-overlay" style={{ zIndex: "2000" }}>
            <div className="modal-content d-flex flex-column" onClick={e => e.stopPropagation()}>
                <p className="font-bold">Requisição {idRequisicao}: {nomeRequisicao}</p>
                <p>Tem a certeza que pretende aprovar esta requisição?</p>
                <div className="d-flex flex-row justify-content-between gap-12 mt-5">
                    <button 
                        id="buttonAprovarRequisicao" 
                        onClick={handleClick} 
                        className="d-flex p-3 rounded-lg w-50 my-2 text-white justify-center" 
                        style={{ backgroundColor: "#68AF00" }}>
                        <CheckCircle className="me-2" />APROVAR
                    </button>
                    <button 
                        id="buttonCancelarSara" 
                        onClick={hideModal} 
                        className="d-flex p-3 rounded-lg w-50 my-2 text-white justify-center" 
                        style={{ backgroundColor: "#B30020" }}>
                        <XCircle className="me-2" /> CANCELAR
                    </button>
                </div>
            </div>
        </div>
    );
}

