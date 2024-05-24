import {useEffect, useState} from "react";
import axiosClient from '../axiosClient';


export default function equipamentos() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

            axiosClient.get(`/equipamentos`)
                .then(response => {
                    console.log('equipamentos:', response.data);
                    const result = response.data.EstudanteHome;
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Erro ao obter equipamentos:', error);
                    setError(error);
                    setLoading(false);
                });

    }, []);

    return(
        <div>
            Lista equipamentos
        </div>
    )

    }
