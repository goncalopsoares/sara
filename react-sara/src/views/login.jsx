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

  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();

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
    

    } catch (error) {
      const response = error.response;
      if (response && response.status === 422) {
        console.log(response.status);
      } else {
        console.error(error);
      }
    }
  };

    return (
        <>
            {/* Mobile Screen */}
            <div
                className="d-sm-block d-md-none d-flex flex-column justify-content-center align-items-center"
                style={{ marginLeft: '2rem', marginRight: '2rem', height: '100vh' }}
            >
                <div className="row w-100">
                    <div className="col-12 d-flex justify-content-center mb-4">
                        <img
                            src={logo}
                            className="img-fluid"
                            alt="Logo da sara, tipografia a dizer sara"
                            style={{ width: '6rem' }}
                        />
                    </div>
                </div>
                <div className="row w-100">
                    <div className="col-12">
                        <form onSubmit={handleSubmit} className="w-100 text-start" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="txt-grey-900 font-bold" style={{ marginTop: '2rem' }}>
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Insere o teu email aqui"
                                        required
                                        className="form-control background-grey-100 rounded w-100"
                                    />
                                </div>
                            </div>
                            <div className="position-relative">
                                <label
                                    htmlFor="password"
                                    className="txt-grey-900 font-bold"
                                    style={{ marginTop: '2rem' }}
                                >
                                    Password
                                </label>
                                <div className="mt-2 position-relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        placeholder="Insere a tua password aqui"
                                        required
                                        className="form-control background-grey-100 rounded w-100 pr-10"
                                    />
                                    <div
                                        className="position-absolute top-50 end-3 translate-middle-y"
                                        style={{ cursor: 'pointer' }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="feather-eye" />
                                        ) : (
                                            <Eye className="feather-eye" />
                                        )}
                                    </div>
                                </div>
                                <p className="font-size-body-2 my-2">
                                    Esqueceste da password?{' '}
                                    <span className="font-link">Clica aqui</span>
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-sara-primary w-100"
                                style={{ marginTop: '2rem' }}
                            >
                                Entrar
                            </button>
                            <p className="font-size-body-2 my-2 text-center">
                                Esqueceste da password?{' '}
                                <Link className="font-link" to="/register">
                                    Clica aqui
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Desktop view */}
            <div className="d-none d-md-block">
                <div className="row h-screen">
                    <div className="col-6 flex justify-center items-center">
                        <img
                            src={background}
                            className="w-full h-full object-cover"
                            alt="Background"
                        />
                    </div>
                    <div className="col-6 flex flex-col justify-center items-center">
                        <div className="mb-4">
                            <img
                                src={logo}
                                className="img-fluid"
                                alt="Logo da sara, tipografia a dizer sara"
                                style={{ width: '6rem' }}
                            />
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-md text-start"
                            action="#"
                            method="POST"
                        >
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="txt-grey-900 font-bold"
                                >
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Insere o teu email aqui"
                                        required
                                        className="form-control background-grey-100 rounded w-full"
                                    />
                                </div>
                            </div>
                            <div className="position-relative mb-4">
                                <label
                                    htmlFor="password"
                                    className="txt-grey-900 font-bold"
                                >
                                    Password
                                </label>
                                <div className="mt-2 position-relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        placeholder="Insere a tua password aqui"
                                        required
                                        className="form-control background-grey-100 rounded w-100 pr-10"
                                    />
                                    <div
                                        className="position-absolute top-50 end-3 translate-middle-y"
                                        style={{ cursor: 'pointer' }}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="feather-eye" />
                                        ) : (
                                            <Eye className="feather-eye" />
                                        )}
                                    </div>
                                </div>
                                <p className="font-size-body-2 my-2">
                                    Esqueceste da password?{' '}
                                    <span className="font-link">Clica aqui</span>
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-sara-primary w-full"
                            >
                                Entrar
                            </button>
                            <p className="font-size-body-2 my-2 text-center">
                                Esqueceste da password?{' '}
                                <Link className="font-link" to="/register">
                                    Clica aqui
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
