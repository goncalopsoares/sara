import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

const stateContext = createContext({
    user: null,
    token: null,
    id_utilizador: null,
    cart: [],
    setUser: () => {},
    setToken: () => {},
    setId_utilizador: () => {},
    setCart: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [token, _setToken] = useState(Cookies.get('XSRF-TOKEN') || null);
    const [id_utilizador, setId_utilizador] = useState(localStorage.getItem('id_utilizador') || null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            Cookies.set('XSRF-TOKEN', token);
        } else {
            Cookies.remove('XSRF-TOKEN');
        }
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        localStorage.setItem('id_utilizador', id_utilizador);
    }, [id_utilizador]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

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
            cart,
            setUser,
            setToken,
            setId_utilizador,
            setCart,
        }}>
            {children}
        </stateContext.Provider>
    );
};

export const useStateContext = () => useContext(stateContext);
