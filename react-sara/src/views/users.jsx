import axiosClient from "../axiosClient.js";
import { redirect } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider.jsx";
import { Frown,LogOut } from 'react-feather';

export default function Users() {
    const { setUser, setToken, setId_utilizador } = useStateContext();

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser(null);
                setToken(null);
                setId_utilizador(null);
                redirect('/login');
            })
            .catch((error) => {
                console.error("Erro ao fazer logout:", error);
                // Optional: handle logout errors
            });
    }

    return (
        <div className="container min-vh-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-lg-6 col-md-8 col-sm-10 col-12">
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className="text-center txt-grey-700" style={{ marginBottom: "1rem" }}>
                            <Frown className="txt-grey-700" style={{ marginBottom: "0.5rem" }} />
                        </div>
                        <div className="text-center txt-grey-700" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                            UPS! Parece que esta página está em construção
                        </div>
                        <div className="text-center txt-grey-700" style={{ fontWeight: "300", marginBottom: "1rem" }}>
                            Esta é apenas uma pequena lembrança de que estamos a trabalhar arduamente para desenvolver a melhor plataforma do deca.
                        </div>
                        <div className="text-center txt-grey-700" style={{ fontWeight: "300", marginBottom: "2rem" }}>
                            Contudo, não tens de ficar preso nesta plataforma:
                        </div>
                        <div>
                            <button className="btn btn-sara-primary d-flex align-items-center justify-content-center w-100" onClick={onLogout}>
                                <LogOut style={{ marginRight: "2rem" }} />
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
