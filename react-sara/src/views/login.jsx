
import { Link } from 'react-router-dom';
import logo from '../images_logo/logo.svg';
import "../App.css";


export default function login() {

  const Submit = (e) => {
    e.preventDefault();

    }


    return (
        <>
            {/* Mobile Screen */}
            <div className="d-sm-block d-md-none d-flex flex-column justify-content-center align-items-center" style={{ marginLeft: "2rem", marginRight: "2rem", height: "100vh" }}>
                <div className="row w-100">
                    <div className="col-12 d-flex justify-content-center mb-4">
                        <img
                            src={logo}
                            className="img-fluid"
                            alt="Logo da sara, tipografia a dizer sara"
                            style={{ width: "6rem" }}
                        />
                    </div>
                </div>
                <div className="row w-100">
                    <div className="col-12">
                        <form onSubmit={Submit} className="w-100 text-start" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="txt-grey-900 font-bold" style={{ marginTop: "2rem" }}>
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
                            <div>
                                <label htmlFor="password" className="txt-grey-900 font-bold" style={{ marginTop: "2rem" }}>
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Insere a tua password aqui"
                                        required
                                        className="form-control background-grey-100 rounded w-100"
                                    />
                                </div>
                                <p className="font-size-body-2 my-2">Esqueceste da password? <span className="font-link">Clica aqui</span></p>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-sara-primary w-100"
                                style={{ marginTop: "2rem" }}
                            >
                                Entrar
                            </button>
                            <p className="font-size-body-2 my-2 text-center">Esqueceste da password? <Link className="font-link" to='/register'>Clica aqui</Link></p>
                        </form>
                    </div>
                </div>
            </div>


          <div className="d-none d-md-block">

          </div>
      </>
    )
  }
