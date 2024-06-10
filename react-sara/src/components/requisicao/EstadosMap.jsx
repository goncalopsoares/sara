//EstadosMap.jsx//
import React, { useState, useEffect } from "react";

const labels = [
    "Requisição realizada",
    "Autorização do Professor",
    "Aprovação do SARA",
    "Recolha",
    "Devolução",
];

export default function EstadosMap({ detalhesRequisicaoEstado }) {
    const [colors, setColors] = useState(Array(5).fill("#F0F0F0"));

    useEffect(() => {
        const newColors = colors.map((color, i) => {
            if (detalhesRequisicaoEstado === 6) {
                return i < 2 ? "#92D400" : i === 2 ? "red" : "#F0F0F0";
            } else if (detalhesRequisicaoEstado === 7) {
                return i < 1 ? "#92D400" : i === 1 ? "red" : "#F0F0F0";
            }
            return detalhesRequisicaoEstado > i && detalhesRequisicaoEstado < 6
                ? "#92D400"
                : "#F0F0F0";
        });
        setColors(newColors);
    }, [detalhesRequisicaoEstado]);

    return (
        <div className="flex justify-center sm:justify-start mt-5">
            {labels.map((label, i) => (
                <div
                    key={i}
                    className="flex flex-col items-center"
                    style={{
                        width: "auto",
                        height: "auto",
                        margin:
                            window.innerWidth > 1024
                                ? "0 2rem"
                                : window.innerWidth > 576
                                ? "0 1rem"
                                : "0 0.25rem",
                    }}
                >
                    <div
                        style={{
                            borderRadius: "50%",
                            width: window.innerWidth > 390 ? "2rem" : "1.25rem",
                            height:
                                window.innerWidth > 390 ? "2rem" : "1.25rem",
                            backgroundColor: colors[i],
                        }}
                    />
                    <p
                        style={{
                            marginTop: "1rem",
                            fontSize:
                                window.innerWidth > 1024
                                    ? "1rem"
                                    : window.innerWidth > 576
                                    ? "0.8rem"
                                    : window.innerWidth > 390
                                    ? "0.7rem"
                                    : "0.6rem",
                            color: "#000",
                            textAlign: "center",
                            width:
                                window.innerWidth > 1024
                                    ? "6rem"
                                    : window.innerWidth > 576
                                    ? "5rem"
                                    : window.innerWidth > 390
                                    ? "4.5rem"
                                    : "4rem",
                        }}
                    >
                        {label}
                    </p>
                </div>
            ))}
        </div>
    );
}
