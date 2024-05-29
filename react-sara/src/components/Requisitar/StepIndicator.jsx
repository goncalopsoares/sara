import React from 'react';
import "./StepStyles.css";

function StepIndicator({ currentStep }) {
    return (
        <div className="steps-container">
            <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
                <div className="circle"></div>
                <div className="label">UC</div>
            </div>
            <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
                <div className="circle"></div>
                <div className="label">Info</div>
            </div>
            <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
                <div className="circle"></div>
                <div className="label">Datas</div>
            </div>
            <div className={`step ${currentStep === 4 ? 'active' : ''}`}>
                <div className="circle"></div>
                <div className="label">Equipamentos</div>
            </div>
            <div className={`step ${currentStep === 5 ? 'active' : ''}`}>
                <div className="circle"></div>
                <div className="label">Resumo</div>
            </div>
        </div>
    );
}

export default StepIndicator;
