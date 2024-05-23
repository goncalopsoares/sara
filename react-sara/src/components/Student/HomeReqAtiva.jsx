import React from 'react';
import { LuClipboard } from 'react-icons/lu';

export default function HomeReqAtiva(props){

    const {requisicao,handleShowMore} = props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('pt-PT', options);
    };


    return(
        <>
            {requisicao.map(req => {
                const ultimoEstado = req.estados[req.estados.length - 1];
                if ([1, 3, 5, 6].includes(ultimoEstado.id_estado)) {
                    return (
                        <div key={req.id_requisicao} className={`background-grey-300 p-4 mb-2`} style={{borderRadius:"1rem"}}>
                            <div className="d-flex align-items-center mb-4">
                               <img src="https://images.pexels.com/photos/164907/pexels-photo-164907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" style={{height:"1.2rem",width:"1.2rem",borderRadius:"0.2rem", marginRight:"0.5rem"}}/>
                                <div style={{fontSize:"1.2rem",fontWeight:"700"}}>{req.nome_requisicao}</div>
                            </div>
                            <div className="text-uppercase font-bold txt-green-900 mb-4">{ultimoEstado.nome_estado}</div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="font-bold" style={{fontSize:"0.8rem"}}>
                                    Data de Recolha
                                    </div>
                                    <div style={{fontSize:"0.8rem"}}>
                                        {formatDate(req.data_inicio_requisicao)}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="font-bold" style={{fontSize:"0.8rem"}}>
                                        Data de Devolução
                                    </div>
                                    <div style={{fontSize:"0.8rem"}}>
                                        {formatDate(req.data_fim_requisicao)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleShowMore(req.equipamento, req.contexto_requisicao, req.comentario_professor_requisicao, req.comentario_sara_requisicao)}
                                    className='mt-3 text-white background-green-500 rounded font-semibold' style={{paddingTop: "1rem", paddingBottom: "1rem"}}
                                >
                                    <LuClipboard className='inline-block align-middle me-3'/><span className="text-uppercase" style={{fontSize:"0.8rem"}}>Ver Requisição</span>
                                </button>
                            </div>
{/*                            <p>{req.nome_uc_contexto}</p>
                            <h3 className="text-2xl font-bold">{req.nome_requisicao}</h3>
                            <p className='text-gray-500 text-end mt-2 mb-2'>{ultimoEstado.nome_estado}</p>
                            <p className='text-gray-500'><strong>Data recolha:</strong> {req.data_inicio_requisicao}</p>
                            <p className='text-gray-500'><strong>Data devolução:</strong> {req.data_fim_requisicao}</p>
                            <button
                                onClick={() => handleShowMore(req.equipamento, req.contexto_requisicao, req.comentario_professor_requisicao, req.comentario_sara_requisicao)}
                                className='mt-4 border-r-2 text-white bg-green-950 p-2 rounded'
                            >
                                <LuClipboard className='inline-block align-middle me-3 ' />Ver requisição
                            </button>*/}
                        </div>
                    );
                }
                return null;
            })}
        </>
    )
}
