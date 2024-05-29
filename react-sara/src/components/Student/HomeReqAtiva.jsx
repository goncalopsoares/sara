import React from "react";
import { useNavigate } from "react-router-dom";
import { LuClipboard } from "react-icons/lu";

export default function HomeReqAtiva(props) {
    const { requisicao } = props;
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "long", year: "numeric" };
        return date.toLocaleDateString("pt-PT", options);
    };

    const handleShowMore = (
        id,
        equipamento,
        contexto_requisicao,
        comentario_professor_requisicao,
        comentario_sara_requisicao
    ) => {
        navigate(`/requisicao/${id}`, {
            state: {
                equipamento,
                contexto_requisicao,
                comentario_professor_requisicao,
                comentario_sara_requisicao,
            },
        });
    };

    return (
        <>
            {requisicao.map((req) => {
                const ultimoEstado = req.estados[req.estados.length - 1];
                if ([1, 3, 5, 6].includes(ultimoEstado.id_estado)) {
                    return (
                        <div
                            key={req.id_requisicao}
                            className={`background-green-50 p-4 mb-2`}
                            style={{ borderRadius: "1rem" }}
                        >
                            <div className="d-flex align-items-center mb-2">
                                <img
                                    src="https://images.pexels.com/photos/164907/pexels-photo-164907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    style={{
                                        height: "1.2rem",
                                        width: "1.2rem",
                                        borderRadius: "0.2rem",
                                        marginRight: "0.5rem",
                                    }}
                                />
                                <div
                                    style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "700",
                                    }}
                                >
                                    {req.nome_requisicao}
                                </div>
                            </div>
                            <div className="text-uppercase font-bold txt-green-900 mb-4">
                                {ultimoEstado.nome_estado}
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div
                                        className="font-bold"
                                        style={{ fontSize: "0.8rem" }}
                                    >
                                        Data de Recolha
                                    </div>
                                    <div style={{ fontSize: "0.8rem" }}>
                                        {formatDate(req.data_inicio_requisicao)}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div
                                        className="font-bold"
                                        style={{ fontSize: "0.8rem" }}
                                    >
                                        Data de Entrega
                                    </div>
                                    <div style={{ fontSize: "0.8rem" }}>
                                        {formatDate(req.data_fim_requisicao)}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end mt-4">
                                <button
                                    onClick={() =>
                                        handleShowMore(
                                            req.id_requisicao,
                                            req.equipamento,
                                            req.contexto_requisicao,
                                            req.comentario_professor_requisicao,
                                            req.comentario_sara_requisicao
                                        )
                                    }
                                    className="mt-3 text-white background-green-500 rounded font-semibold w-100" // Added w-100 for full width
                                    style={{
                                        paddingTop: "1rem",
                                        paddingBottom: "1rem",
                                    }}
                                >
                                    <LuClipboard className="inline-block align-middle me-3" />
                                    <span
                                        className="text-uppercase"
                                        style={{ fontSize: "0.8rem" }}
                                    >
                                        Ver Requisição
                                    </span>
                                </button>
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </>
    );
}
