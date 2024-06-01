import React from "react";
import { Edit, Trash2 } from "react-feather";

export default function ModalOutrasProf ({ hideModal, handleClick}) {

    return (
        <div className="modal-overlay" style={{ zIndex: "2000" }}>
            <div className="modal-content d-flex flex-column justify-content-center align-items-center text-center" onClick={e => e.stopPropagation()}>
                <p className="font-bold">Pretende comentar ou rejeitar esta requisição?</p>
                <button className="d-flex p-3 rounded-lg w-50 my-2 text-white justify-center" style={{ backgroundColor: "#68AF00" }}>
                    <Edit className="me-2" />COMENTAR
                </button>
                <button id="buttonRejeitarProf" onClick={handleClick} className="d-flex p-3 rounded-lg w-50 my-2 text-white justify-center" style={{ backgroundColor: "#B30020" }}>
                    <Trash2 className="me-2" /> REJEITAR
                </button>
                <button id="buttonCancelarProf" onClick={hideModal} className="d-flex p-3 rounded-lg w-50 my-2 text-green-800 justify-center" style={{ border: "1px solid #1C7A00" }}>
                    CANCELAR
                </button>
            </div>
        </div>
    )
}
