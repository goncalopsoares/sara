import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'react-feather';
import { useState } from 'react';
import logo from '../images_logo/logo.svg';
import '../App.css';
import background from '../images_logo/backgroundImageLogIn.png';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
    };

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
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
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
                    <button type="submit" className="btn btn-primary w-100">
                        Entrar
                    </button>
                    <p className="register-link text-center">
                        Esqueceste da password? <Link className="font-link" to="/register">Clica aqui</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
