import React from 'react';
import {LuClipboard} from "react-icons/lu";

export default function HomeUcsAtiva(props){

    const {uc} = props;

    return(
        <>
            <div key={uc.id_uc_contexto} className={`background-grey-300 mb-4`} style={{borderRadius: "1rem", overflow: "hidden"}}>
                <div style={{height: "5rem"}}>
                    {uc.icone_uc_contexto !== "link" ?(
                    <img src={`http://laravel.local:8080${uc.icone_uc_contexto}`} alt="Top Image" style={{width: "100%", height: "100%", objectFit: "cover"}} />):(
                        <img src="https://images.pexels.com/photos/164907/pexels-photo-164907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Top Image" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                    )
                }
                </div>
                <div style={{padding: "0.5rem"}}>
                    <div style={{fontSize: "0.8rem", fontWeight: "700", paddingTop:"1rem"}}>{uc.sigla_uc_contexto}</div>
                    <div className="truncate-text" style={{fontSize: "0.8rem", paddingBottom:"1rem"}}>
                        {uc.nome_uc_contexto}
                    </div>
                </div>
            </div>



{/*            <div key={uc.id_uc_contexto} className="bg-white p-4 rounded-lg shadow-lg border-2">
                <p className='text-2xl font-bold'>{uc.nome_uc_contexto}</p>
                <h3 className="text-2xl font-bold">{uc.nome_requisicao}</h3>
                <p className='text-gray-500 text-end mt-2 mb-2'>{uc.sigla_uc_contexto}</p>
                <p className='text-gray-500'><strong>Código UC:</strong> {uc.codigo_uc_contexto}</p>
                <p className='text-gray-500'><strong>Semestre UC:</strong> {uc.semestre_uc_contexto}</p>
            </div>*/}
        </>
    )
}
