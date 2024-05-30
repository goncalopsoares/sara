import React, { useState, useEffect } from "react";

const labels = ["Requisição realizada", "Autorização do Professor", "Aprovação do SARA", "Recolha", "Devolução"];

export default function EstadosMap({ detalhesRequisicaoEstado }) {
    const [colors, setColors] = useState(Array(5).fill("#F0F0F0"));

    useEffect(() => {
        const newColors = colors.map((color, i) => {
            if (detalhesRequisicaoEstado === 6) {
                return i < 3 ? "#92D400" : "red";
            }
            return detalhesRequisicaoEstado > i && detalhesRequisicaoEstado < 6 ? "#92D400" : "#F0F0F0";
        });
        setColors(newColors);
    }, [detalhesRequisicaoEstado]);

    return (
        <div className="flex">
            {labels.map((label, i) => (
                <div key={i} className='m-5' style={{ width: '32px', height: '32px', position: 'relative' }}>
                    <div
                        style={{
                            borderRadius: '50%',
                            width: '2rem',
                            height: '2rem',
                            backgroundColor: colors[i],
                            position: 'absolute',
                            top: '0',
                            left: '0'
                        }}
                    />
                    <p
                        style={{
                            position: 'absolute',
                            bottom: i > 2 ? '-2.85rem' : '-4rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '0.75rem',
                            color: '#000',
                            textAlign: 'center',
                            width: '5rem'
                        }}
                    >
                        {label}
                    </p>
                </div>
            ))}
        </div>
    );
}
