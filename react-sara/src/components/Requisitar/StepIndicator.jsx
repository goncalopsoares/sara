import React from 'react';
import "./StepStyles.css";

function StepIndicator({ currentStep }) {
    return (
        <div className="steps-container">
            <div className={`step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}>
                <div className="circle"></div>
                <div className="label">UC</div>
            </div>
            <div className={`step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
                <div className="circle"></div>
                <div className="label">Info</div>
            </div>
            <div className={`step ${currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : ''}`}>
                <div className="circle"></div>
                <div className="label">Datas</div>
            </div>
            <div className={`step ${currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : ''}`}>
                <div className="circle"></div>
                <div className="label">Equipamentos</div>
            </div>
            <div className={`step ${currentStep === 5 ? 'active' : currentStep > 5 ? 'completed' : ''}`}>
                <div className="circle"></div>
                <div className="label">Resumo</div>
            </div>
        </div>
    );
}

export default StepIndicator;
