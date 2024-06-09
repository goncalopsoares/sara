import React, { useState, useEffect } from 'react';
import {LuClipboard} from "react-icons/lu";

export default function HomeUcsAtiva(props){

    const {uc} = props;
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const imageHeight = windowWidth <= 768 ? "65%" : "10rem";

    return(
        <>
            <div key={uc.id_uc_contexto} className={`background-grey-300 mb-4`} style={{borderRadius: "1rem", overflow: "hidden"}}>
                <div style={{height: imageHeight}}>
                    {uc.icone_uc_contexto !== "link" ?(
                    <img src={`http://localhost:8000${uc.icone_uc_contexto}`} alt="Top Image" style={{width: "100%", height: "100%", objectFit: "cover"}} />):(
                        <img src="https://images.pexels.com/photos/164907/pexels-photo-164907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Top Image" style={{width: "100%", height: "100%", objectFit: "cover"}} />
                    )
                }
                </div>
                <div style={{padding: "0.5rem"}}>
                    <div style={{fontSize: "0.8rem", fontWeight: "700", paddingTop:"1rem"}}>{uc.sigla_uc_contexto}</div>
                    <div className="truncate-text" style={{fontSize: "0.8rem", paddingBottom:"1rem"}} title={uc.nome_uc_contexto}>
                        {uc.nome_uc_contexto}
                    </div>
                </div>
            </div>
        </>
    )
}
