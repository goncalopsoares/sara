import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Devolucoes from './Devolucoes';
import Recolhas from './Recolhas';

export default function HomeReqDevolverRecolher({ porDevolverRecolher, date }) {

    const [sortedUsers, setSortedUsers] = useState([]);
    const [propsDate, setPropsDate] = useState(date);

    const formatDate = (date) => {
        const options = {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        };

        const dateString = new Date(date).toLocaleTimeString('pt-PT', options);

        return dateString;
    };


    const BASE_URL = 'http://deca-sara.ua.pt';

    return (
        <>
            <div className='container'>
                <div className='row mt-4'>
                    <div className='col-6'>
                        <h2>Devoluções</h2>
                        <Devolucoes porDevolverRecolher={porDevolverRecolher} getDate={formatDate} BASE_URL={BASE_URL} propsDate={date} />
                    </div>
                    <div className='col-6'>
                        <h2>Recolhas</h2>
                        <Recolhas porDevolverRecolher={porDevolverRecolher} getDate={formatDate} BASE_URL={BASE_URL} propsDate={date} />
                    </div>
                </div >
            </div>
        </>
    );
}
