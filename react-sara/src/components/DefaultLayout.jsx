import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import BottomNavBar from "./bottomnavbar";
import Header from "./header";
import { useEffect } from "react";
import axiosClient from "../axiosClient";


export default function DefaultLayout() {

    const {id_utilizador, user, token, setUser, setId_utilizador } = useStateContext();
    const location = useLocation();

    useEffect(() => {
        // Verifique se id_utilizador está disponível
        if (id_utilizador) {
            axiosClient.get(`/utilizador/${id_utilizador}`)
            .then(({ data }) => {
                setUser(data);
                setId_utilizador(data.id_utilizador);
            })
                .catch(error => console.error('Error fetching user data:', error));
        } else {
            console.error('id_utilizador is not defined');
        }
    }, []);


    useEffect(() => {
        console.log({ id_utilizador });
        console.log({ user });
    }, [id_utilizador, user]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    console.log({user});

    return (
        <div>
            <div id="defaultLayout">
                <div>
                    <Header />
                    <main className="p-4">
                    {location.pathname === '/' && (
                            <>
                                <h1 className="mt-4 text-green-600 fw-bolder">
                                    {user.nome_utilizador},
                                </h1>
                                <h1 className='indent-3'>bem vindo de novo!!!</h1>
                                <p>O teu id é o <span className='fw-bolder'>{user.id_utilizador}</span></p>
                                <p>O teu mail associado é <span className='fw-bolder'>{user.email_utilizador}</span></p>
                                <p>O teu numero mecanografico é <span className='fw-bolder'>{user.numero_mecanografico_utilizador}</span></p>
                            </>
                        )}

                        <Outlet />

                    </main>
                    {(user.tipo_utilizador === 2 || user.tipo_utilizador === 3) ? <BottomNavBar /> : null}

                </div>
            </div>
        </div>
    );
}
