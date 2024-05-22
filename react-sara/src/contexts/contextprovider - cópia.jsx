import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import Cookies from 'js-cookie';

const stateContext = createContext({
    user: null,
    token: null,
    id_utilizador: null,
    setUser: () => {},
    setToken: () => {},
    setId_utilizador: () => {},

})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, _setToken] = useState(Cookies.get('XSRF-TOKEN'));
    const [id_utilizador, setId_utilizador] = useState(localStorage.getItem('id_utilizador') || null);


    const setToken = (token) => {
        _setToken(token);
        if(token){
            Cookies.set('XSRF-TOKEN', token);
        } else {
            Cookies.remove('XSRF-TOKEN');
        }
    }

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('id_utilizador', id_utilizador);
    }, [id_utilizador]);

    


    useEffect(() => {
        const token = Cookies.get('XSRF-TOKEN');
        if (token) {
            setToken(token);
        }
    }, []);


    return (
        <stateContext.Provider value={{
            user,
            token,
            id_utilizador,
            setUser,
            setToken,
            setId_utilizador,
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);