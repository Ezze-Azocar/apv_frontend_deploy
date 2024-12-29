import {Link} from 'react-router-dom';
import { useState } from 'react';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/axios';



const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(email === '' || email.length < 5) {
      setAlerta({msg: 'El Email es Obligatorio.', error: true})
      return
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password',{ email })
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg, 
        error: true
      });
    }
  }

    const { msg } = alerta
  return (
    <>
   <div>
        <h1 className="text-indigo-600 font-black text-6xl">Recupera tu acceso y no pierdas a tus  {""}<span  className="text-black">Pacientes</span></h1>
      </div>
      <div>
      {msg && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="text" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input name='password' type="email" placeholder="Ingresa el email con el que creaste tu cuenta"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <input type="submit" name="submit" id="submit" value="Recuperar Contraseña" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/" className='block text-center my-5 text-gray-500'>Ya recorde mi contraseña, Iniciar Sesión</Link>
          <Link to="/registrar" className='block text-center my-5 text-gray-500'>No tienes una cuenta? Registrate</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword
