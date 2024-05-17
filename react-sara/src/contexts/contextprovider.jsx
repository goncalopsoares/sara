import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import Cookies from 'js-cookie';

const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
})

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(Cookies.get('XSRF-TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if(token){
            Cookies.set('XSRF-TOKEN', token);
        } else {
            Cookies.remove('XSRF-TOKEN');
        }
    }

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
            setUser,
            setToken,
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);