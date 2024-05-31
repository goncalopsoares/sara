import React from 'react';

const ErrorModal = ({ message, onClose }) => {
    return (
        <div className="modal-overlay" style={{zIndex:"1000"}}>
            <div className="modal">
                <p className="text-red-500">{message}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
};

export default ErrorModal;
