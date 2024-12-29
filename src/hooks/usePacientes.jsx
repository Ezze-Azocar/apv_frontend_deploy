import { useContext } from "react"
import { PacientesContext } from '../context/PacienteProvider'

export function usePacientes() {
  return useContext(PacientesContext)
}
