import React from "react";
import { CheckCircle, XCircle } from "react-feather";

export default function ModalRejeitarSara({ hideModal, handleClick, idRequisicao, nomeRequisicao }) {

    function handleConfirmation(e) {
        const confirmacaoRejeicao = document.getElementById("confirmacaoRejeicao").value;
        if (confirmacaoRejeicao === "Eu confirmo") {
            handleClick(e);
                } else {
            alert("Confirmação inválida.");
        }
    }

    return (
        <div className="modal-overlay" style={{ zIndex: "2000" }}>
            <div className="modal-content d-flex flex-column" onClick={e => e.stopPropagation()}>
                <p className="font-bold">Requisição {idRequisicao}: {nomeRequisicao}</p>
                <p className="mb-0">Tens a certeza que pretendes rejeitar esta requisição?</p>
                <p className="mb-5">Esta ação é definitiva e não poderá ser revogada.</p>
                <p className="font-bold">Confirma esta ação escrevendo: "Eu confirmo"</p>
                <input type="text" id="confirmacaoRejeicao" className="w-100 rounded-lg" />
                <div className="d-flex flex-row justify-content-between gap-12 mt-5">
                    <button
                        id="buttonRejeitarRequisicao"
                        onClick={handleConfirmation}
                        className="d-flex p-3 rounded-lg w-50 my-2 text-white justify-center"
                        style={{ backgroundColor: "#68AF00" }}>
                        <CheckCircle className="me-2" /> CONFIRMAR
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

