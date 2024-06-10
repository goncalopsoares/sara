import React, {useState, useRef} from "react";
import { CheckCircle, XCircle } from "react-feather";

export default function ModalDevolucaoSara({ hideModal, handleClick, idRequisicao, nomeRequisicao, pinDevolucao }) {

    const [code, setCode] = useState(["", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1 || value === "") {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Move to the next input field
            if (value !== "" && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleConfirmation = (e) => {
        const confirmarDevolucao = code.join("");
        if (confirmarDevolucao === pinDevolucao) {
            handleClick(e);
        } else {
            alert("Código introduzido inválido.");
        }
    };

    console.log('pindev', pinDevolucao)

    return (
        <div className="modal-overlay" style={{ zIndex: "2000" }}>
            <div className="modal-content d-flex flex-column" onClick={e => e.stopPropagation()}>
                <p className="font-bold">Devolução da requisição {idRequisicao}: {nomeRequisicao}</p>
                <p className="mb-4">Por favor, insere o código que os estudantes fornecem</p>
                <div className="d-flex justify-center">
                    {code.map((char, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={char}
                            onChange={e => handleChange(e, index)}
                            onKeyDown={e => handleKeyDown(e, index)}
                            ref={el => (inputRefs.current[index] = el)}
                            className="form-control text-center mx-2"
                            style={{ width: "3rem", height: "3rem" }}
                        />
                    ))}
                </div>
                <div className="d-flex flex-row justify-content-between gap-3 mt-4">
                    <button
                        id="buttonAprovarDevolucao"
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

