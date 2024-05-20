import { useRef, useState } from 'react';
import logo from '../images_logo/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import background from "../images_logo/backgroundImageLogIn.png";
import PasswordInput from '../components/PasswordInput.jsx';


export default function Register() {
    const nameRef = useRef();
    const numMecRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmpasswordRef = useRef();

    const { setUser, setToken, setId_utilizador } = useStateContext();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        setError('');

        if (passwordRef.current.value === confirmpasswordRef.current.value) {
            const payload = {
                nome_utilizador: nameRef.current.value,
                numero_mecanografico_utilizador: numMecRef.current.value,
                email_utilizador: emailRef.current.value,
                password_utilizador: passwordRef.current.value,
                tipo_utilizador: 3,
            }

            axiosClient.post("/register", payload)
            .then(({ data }) => {
                console.log("Registro bem-sucedido:", data);
    
                // Realizar logout após o registro bem-sucedido
                axiosClient.post('/logout')
                    .then(({}) => {
                        // Limpar o estado do user, token e ID
                        setUser(null);
                        setToken(null);
                        setId_utilizador(null);
    
                        // Redirecionar para a página de login
                        navigate('/login');
                    })
                    .catch((error) => {
                        console.error("Erro ao fazer logout:", error);
                        // Opcional: lidar com erros de logout
                    });
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
        } else {
            setError('As passwords não são iguais');
        }
    }

    return (
        <div className="login-container">
            <div className="login-image-container">
                <img
                    src={background}
                    className="login-background-image"
                    alt="Background"
                />
            </div>
            <div className="login-form-container">
                <div className="logo-container">
                    <img
                        src={logo}
                        className="logo"
                        alt="Logo da sara, tipografia a dizer sara"
                    />
                </div>
                <form onSubmit={Submit} className="login-form">
                    <div style={{ marginTop: "1rem" }}>
                        <label htmlFor="nome_utilizador" className="form-label">
                            Nome
                        </label>
                        <input
                            ref={nameRef}
                            id="nome_utilizador"
                            name="nome_utilizador"
                            type="text"
                            autoComplete="nome_utilizador"
                            required
                            className="form-control"
                            placeholder="Ex: John Doe"
                        />
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                        <label htmlFor="numero_mecanografico_utilizador" className="form-label">
                            Número Mecanográfico
                        </label>
                        <input
                            ref={numMecRef}
                            id="numero_mecanografico_utilizador"
                            name="numero_mecanografico_utilizador"
                            type="number"
                            autoComplete="numero_mecanografico_utilizador"
                            required
                            className="form-control"
                            placeholder="Ex: 107344"
                        />
                    </div>
                    <div style={{ marginTop: "1rem" }}>
                        <label htmlFor="email_utilizador" className="form-label">
                            Email
                        </label>
                        <input
                            ref={emailRef}
                            id="email_utilizador"
                            name="email_utilizador"
                            type="email"
                            autoComplete="email"
                            required
                            className="form-control"
                            placeholder="Ex: johndoe@ua.pt"
                        />
                    </div>
                    <PasswordInput
                        ref={passwordRef}
                        id="password_utilizador"
                        name="password_utilizador"
                        placeholder="Password"
                    />
                    <PasswordInput
                        ref={confirmpasswordRef}
                        id="confirmpassword"
                        name="confirmpassword"
                        placeholder="Confirma a Password"
                    />
                    {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
                    <button style={{ marginTop: "1rem" }} type="submit" className="btn btn-sara-primary w-100">
                        Registar
                    </button>
                    <p className="register-link text-center">
                        Já tens conta? <Link className="font-link" to="/login">Entra aqui</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
