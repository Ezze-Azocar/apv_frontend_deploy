import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Alerta from '../components/Alerta';
import useAuth from "../hooks/useAuth"
import clienteAxios from '../config/axios.jsx';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios.',
        error: true
      });
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login',{email, password});
      localStorage.setItem('token', data.token)
      localStorage.setItem('id', data._id)
      setAuth(data)

      navigate('/admin')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y Administra tus {""} <span  className="text-black">Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-xl px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta 
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="email" className="  text-gray-600 block text-2xl font-bold">Email</label>
            <input type="email" placeholder="example@example.com" value={email} onChange={e => setEmail(e.target.value)}
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
          </div>
          <div className="my-5">
            <label htmlFor="password" className=" text-gray-600 block text-2xl font-bold">Contraseña</label>
            <input name='password' type="password" placeholder="Ingrese su contraseña" value={password} onChange={e => setPassword(e.target.value)}
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"/>
          </div>
          <input type="submit" name="submit" id="submit" value="Iniciar Sesión" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/registrar" className='block text-center my-5 text-gray-500'>No tienes una cuenta? Registrate</Link>
          <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login
