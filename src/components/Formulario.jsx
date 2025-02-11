import { useState, useEffect } from "react"
import Alerta from './Alerta'
import { usePacientes } from '../hooks/usePacientes'


const Formulario = () => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [id, setId] = useState(null)


  const [alerta, setAlerta] = useState({})

  const { guardarPaciente , paciente} = usePacientes()

  // Agregar función para formatear la fecha
  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha)
    const year = nuevaFecha.getFullYear()
    const month = String(nuevaFecha.getMonth() + 1).padStart(2, '0')
    const day = String(nuevaFecha.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect( () => {
    if(paciente?.nombre){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(formatearFecha(paciente.fecha))
      setSintomas(paciente.sintomas)
      setId(paciente._id)
    }
  },[paciente])

  const handleSumbit = e => {
    e.preventDefault()

    //Validar Formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true
      })
      return
    }


    guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
    setAlerta({msg: 'Guardado Correctamente'})
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setId('')


  }
const { msg } = alerta
  return (
    <>
          <h2 className=" font-black text-3xl text-center">Administrador de Pacientes</h2>
          <p className=" text-xl mt-5 mb-10 text-center">
            Añade tus paciente y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
          </p>


      <form className="bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md" onSubmit={handleSumbit}>
        <div className="mb-5">
          <label 
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold"
          >Nombre Mascota</label>
          <input 
          type="text"
          id="nombre" 
          placeholder="Nombre de la Mascota"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
          htmlFor="propietario"
          className="text-gray-700 uppercase font-bold"
          >Nombre Propietario</label>
          <input 
          type="text"
          id="propietario" 
          placeholder="Nombre del Propietario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={propietario}
          onChange={e => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
          htmlFor="email"
          className="text-gray-700 uppercase font-bold"
          >Email Propietario</label>
          <input 
          type="email"
          id="email" 
          placeholder="email del Propietario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
          htmlFor="fecha"
          className="text-gray-700 uppercase font-bold"
          >Fecha de alta</label>
          <input 
          type="date"
          id="fecha" 
          placeholder="email del Propietario"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
          htmlFor="sintomas"
          className="text-gray-700 uppercase font-bold"
          >sintomas de la mascota</label>
          <textarea 
          id="sintomas" 
          placeholder="Describe los sintomas"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none"
          value={sintomas}
          onChange={e => setSintomas(e.target.value)}
          />
        </div>

      {msg && <Alerta alerta={alerta} />}
      
        <input type="submit" value={id ? 'Guardar Cambios': 'Agregar Paciente'} className="bg-indigo-600 p-3 w-full text-white font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-md"/>
      </form>


    </>
  )
}

export default Formulario
