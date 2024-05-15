import { useState } from 'react'
import Equipamentos from './equipamentos/Equipamentos.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

function App() {

  const [mode, setMode] = useState('login');

  const changeMode = () => {
    setMode(prevMode=>prevMode==='login'?'register':'login')
  }

  return (
    <>
      {
      mode === 'login' ?
       <Login onChangeMode={changeMode} /> 
       : 
       <Register onChangeMode={changeMode} />
       }
    </>
  );
}

export default App
