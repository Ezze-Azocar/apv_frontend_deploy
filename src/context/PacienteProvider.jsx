import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios'
import useAuth from "../hooks/useAuth";
import { use } from "react";

export const PacientesContext = createContext();

export const PacienteProvider = ({children}) => {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({})
  const { auth } = useAuth

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem('token')
        if(!token) return
        
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        const { data } = await clienteAxios.get('/pacientes', config)
        setPacientes(data)
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPacientes()
  },[auth])

  const guardarPaciente = async (paciente) => {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }

    try {
      if(paciente.id) {
        // Editando
        const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
        const pacientesActualizado = pacientes.map(pacienteState => 
          pacienteState._id === data._id ? data : pacienteState
        )
        setPacientes(pacientesActualizado)
      } else {
        // Nuevo paciente
        const { data } = await clienteAxios.post('/pacientes', paciente, config)
        const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
        setPacientes([pacienteAlmacenado, ...pacientes])
      }
    } catch (error) {
      console.log(error.response?.data?.msg)
    }
  }

  const setEdicion = (paciente) => {
    setPaciente(paciente)
  }

  const eliminarPaciente = async id => {
    const confirmar = confirm('¿Deseas eliminar este Paciente?')
    if(confirmar) {
      try {
        const token = localStorage.getItem('token')
        if(!token) return

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }

        await clienteAxios.delete(`/pacientes/${id}`, config)

        const pacientesActualizado = pacientes.filter(pacientesState => 
          pacientesState._id !== id
        )
        
        setPacientes(pacientesActualizado)
        
      } catch (error) {
        console.log(error)
      }
    }
  }
  return(
    <PacientesContext.Provider
      value={{
        pacientes,
        guardarPaciente,
        setEdicion,
        paciente,
        eliminarPaciente
      }}
    >
        {children}
    </PacientesContext.Provider>
  )
}
