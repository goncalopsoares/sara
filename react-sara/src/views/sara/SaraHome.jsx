import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';
import HomeReqAprovar from '../../components/sara/HomeReqAprovar.jsx';
import HomeReqDevolverRecolher from '../../components/sara/HomeReqDevolverRecolher.jsx';
import Calendar from '../../components/sara/Calendar.jsx';

export default function SaraHome() {
    const [porAprovar, setPorAprovar] = useState([]);
    const [porDevolverRecolher, setPorDevolverRecolher] = useState([]);
    const [date, setDate] = useState(new Date());
    const [loadingAprovar, setLoadingAprovar] = useState(true);
    const [loadingRecolher, setLoadingRecolher] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosClient.get(`/sara/validar`)
            .then(response => {
                setPorAprovar(response.data);
                console.log('Requisições por aprovar:', response.data);
                setLoadingAprovar(false);
            })
            .catch(error => {
                console.error('Erro ao obter requisições por aprovar:', error);
                setError(error);
                setLoadingAprovar(false);
            });
    }, []);

    const fetchRequisicoes = (formattedDate) => {
        setLoadingRecolher(true);
        axiosClient.get(`/sara/recolher/${formattedDate}`)
            .then((response) => {
                setPorDevolverRecolher(response.data);
                console.log('Requisições por devolver/recolher:', response.data);
                console.log('Data:', formattedDate);
                setLoadingRecolher(false);
            })
            .catch((error) => {
                console.error('Erro ao obter requisições:', error);
                setError(error);
                setLoadingRecolher(false);
            });
    };

    useEffect(() => {
        const formattedDate = date.toISOString().split('T')[0];
        fetchRequisicoes(formattedDate);
    }, [date]);

    const handleDateSelect = (date) => {
        setDate(date);
    };


    return (
        <>
            <div className='container-fluid mx-0'>
                <div className='row'>
                    <div className='col-4'>
                        <h1>Por Aprovar</h1>
                        {loadingAprovar ? <div>Loading...</div> : <HomeReqAprovar porAprovar={porAprovar} />}
                    </div>
                    <div className='col-8'>
                        <div className='row mb-4'>
                            <h1 className='ms-2'>Calendário</h1>
                            <div className='row mt-3'>
                                <Calendar onDateSelect={handleDateSelect} />
                            </div>
                        </div>
                        {loadingRecolher ? <div>Loading...</div> : <HomeReqDevolverRecolher porDevolverRecolher={porDevolverRecolher} date={date} />}
                    </div>
                </div>
            </div>
        </>
    );
}