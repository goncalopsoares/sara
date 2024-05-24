import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';

const Carrinho = () => {
    const [message, setMessage] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [buttonPath, setButtonPath] = useState('');
    const navigate = useNavigate();
    const { user, cart, setCart } = useStateContext();

    useEffect(() => {
        const fetchRequisicaoStatus = async () => {
            try {
                const response = await axiosClient.get(`/requisicao/ultimarequisicaosemestado/${user.id_utilizador}`);
                if (response.data.message === 'A última requisição encontrada não possui um estado associado.') {
                    setMessage('Ainda não concluiu o processo de requisição');
                    setButtonText('Continuar Requisição');
                    setButtonPath('/requisitar');
                    
                } else if (response.data.message === 'Nenhuma requisição encontrada para este utilizador.' || response.data.message === 'A última requisição encontrada já possui um estado associado.') {
                    setMessage('Não tem uma nova requisição');
                    setButtonText('Criar Requisição');
                    setButtonPath('/requisitar');
                }
            } catch (error) {
                setMessage('Erro ao buscar o status da requisição');
                setButtonText('Tentar Novamente');
                setButtonPath('/');
            }
        };

        fetchRequisicaoStatus();
    }, [user.id_utilizador]);

    const handleButtonClick = () => {
        navigate(buttonPath);
    };

    return (
        <div>
            <p>{message}</p>
            <button className='bg-green-200 text-dark p-2 fw-bolder' onClick={handleButtonClick}>{buttonText}</button>
            
            {message === 'Ainda não concluiu o processo de requisição' ? (
                <div>
                    <h2>O que tens até agora no carrinho</h2>
                    {cart.length > 0 ? (
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    {item.nome_modelo_equipamento} - {item.nome_marca_equipamento}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>O carrinho está vazio.</p>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Carrinho;

