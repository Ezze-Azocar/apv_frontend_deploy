import {useState} from 'react';
import {Link} from 'react-router-dom';
import Alerta from '../components/Alerta.jsx';
import clienteAxios from '../config/axios.jsx';

const Registrar = () => {
  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async e => {
    e.preventDefault() 
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({ msg: 'Completa todos los campos', error:true })
      return;
    }

    if(password !== repetirPassword){
      setAlerta({ msg: 'Las Contraseñas no coinciden.', error:true })
      return;
    }

    if(password.length < 6){
      setAlerta({ msg: 'La contraseña debe tener un minimo de 6 caracteres.', error:true })
      return;
      
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      await clienteAxios.post( '/veterinarios', {nombre, email, password})
      setAlerta({msg: 'Cuenta Creada Correctamente, Revisa tu Email.',
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  };

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y Administra tus  {""}<span  className="text-black">Pacientes</span></h1>
      </div>
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
      {msg && <Alerta alerta={alerta} />}
      <form action="" onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="text" className=" text-gray-600 block text-2xl font-bold">Nombre</label>
            <input type="text" placeholder="Escriba su nombre"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={nombre} onChange={e => setNombre(e.target.value)}/>
          </div>
          <div className="my-5">
            <label htmlFor="email" className=" text-gray-600 block text-2xl font-bold">Email</label>
            <input type="email" placeholder="example@example.com"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="my-5">
            <label htmlFor="password" className=" text-gray-600 block text-2xl font-bold">Contraseña</label>
            <input name='password' type="password" placeholder="Crea tu contraseña"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="my-5">
            <label htmlFor="Password" className=" text-gray-600 block text-2xl font-bold">Confirma tu contraseña</label>
            <input type="Password" placeholder="Repite tu Contraseña"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}/>
          </div>
          <input type="submit" name="submit" id="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/" className='block text-center my-5 text-gray-500'>Ya tiene una cuenta? Inicia Sesión</Link>
          <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar