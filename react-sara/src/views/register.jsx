import { useRef } from 'react';
import logo from '../images_logo/logo.svg';
import { Link } from 'react-router-dom';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';

export default function register() {

  const nameRef = useRef();
  const numMecRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmpasswordRef = useRef();

  const { setUser, setToken } = useStateContext();

  const Submit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value === confirmpasswordRef.current.value) {

      const payload = {
        nome_utilizador: nameRef.current.value,
        numero_mecanografico_utilizador: numMecRef.current.value,
        email_utilizador: emailRef.current.value,
        password_utilizador: passwordRef.current.value,
        tipo_utilizador: 3,
      }

      axiosClient.post("/register", payload).then(({ data }) => {
        setUser(data.user);
        setToken(data.token);

        console.log(data);

      }).catch(err => {
        const response = err.response;

        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      })

    }
    else {
      console.log('As passwords não são iguais')
    }
}



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={logo}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Regista-te
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={Submit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Nome
            </label>
            <div className="mt-2">
              <input
                ref={nameRef}
                id="nome_utilizador"
                name="nome_utilizador"
                type="text"
                autoComplete="password_utilizador"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Número Mecanográfico
            </label>
            <div className="mt-2">
              <input
                ref={numMecRef}
                id="numero_mecanografico_utilizador"
                name="numero_mecanografico_utilizador"
                type="text"
                autoComplete="numero_mecanografico_utilizador"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                ref={emailRef}
                id="email_utilizador"
                name="email_utilizador"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                ref={passwordRef}
                id="password_utilizador"
                name="password_utilizador"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Confirmação da Password
            </label>
            <div className="mt-2">
              <input
                ref={confirmpasswordRef}
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                autoComplete="confirm-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
            >
              Registar
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Já tem registo?{' '}
          <Link className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500' to='/login'> Entra aqui</Link>

        </p>
      </div>
    </div>
  );
}
