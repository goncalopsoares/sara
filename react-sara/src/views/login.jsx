import { Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, XCircle } from 'react-feather';
import { useState, useRef, useEffect } from 'react';
import logo from '../images_logo/logo.svg';
import { useStateContext } from '../contexts/contextprovider';
import '../App.css';
import background from '../images_logo/backgroundImageLogIn.png';
import axiosClient from '../axiosClient';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(true);
    const location = useLocation();
    const successMessage = location.state?.successMessage;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken, setId_utilizador } = useStateContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit is being called");
        console.log(emailRef.current);
        console.log(passwordRef.current);
        try {

            const payload = {
                email_utilizador: emailRef.current.value,
                password_utilizador: passwordRef.current.value,
            };

            console.log(payload);

            const response = await axiosClient.post("/login", payload);
            setUser(response.data.user);
            setToken(response.data.token);
            setId_utilizador(response.data.id_utilizador);



        } catch (error) {
            const response = error.response;
            setFailMessage(true);
            if (response && response.status === 422) {
                console.log(response.status);
            } else {
                console.error(error);
            }
        }
    };

    const handleCloseMessage = () => {
        setIsMessageVisible(false);
        setFailMessage(false);
    };

    return (
            <div>
                {successMessage && isMessageVisible && (
                    <div style={{
                        position: 'absolute',
                        top: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <div
                            style={{
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                textAlign: 'right',
                                backgroundColor: '#92D400',
                                borderRadius: 10,
                                padding: '1rem',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            {successMessage}
                            <XCircle
                                onClick={handleCloseMessage}
                                style={{ marginLeft: '0.5rem', cursor: 'pointer' }}
                            />
                        </div>
                    </div>
                )}

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
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    ref={emailRef}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Insere o teu email aqui"
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group position-relative">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    ref={passwordRef}
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    placeholder="Insere a tua password aqui"
                                    required
                                    className="form-control pr-10"
                                />

                                <div
                                    className="password-toggle-icon position-absolute top-50 end-3 translate-middle-y"
                                    style={{ cursor: 'pointer' }}
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="feather-eye" />
                                    ) : (
                                        <Eye className="feather-eye" />
                                    )}
                                </div>
                                <p className="forgot-password">
                                    Esqueceste da password? <span className="font-link">Clica aqui</span>
                                </p>
                            </div>
                            <button type="submit" className="btn btn-sara-primary w-100">
                                Entrar
                            </button>
                            <p className="register-link text-center">
                                Ainda não tens conta? <Link className="font-link" to="/register">Regista-te aqui</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
    );

}
