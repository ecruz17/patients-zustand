import { toast } from "react-toastify";
import { Patient } from "../interfaces/Patient"
import { usePatientStore } from "../store";
import { PatientLabel } from "./PatientLabel";

interface Props {
  patient: Patient;
}

export const PatientDetails = ({ patient }: Props) => {
  
  const { deletePatient, editPatient } = usePatientStore();

  const handleEdit = () => {
    editPatient(patient.id);
  }

  const handleDelete = () => {
    deletePatient(patient.id);
    toast.warning('Paciente eliminado con éxito')
  }

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl border border-gray-200">
      <div className="flex flex-col justify-start items-start">
        <PatientLabel label="id" data={patient.id} />
        <PatientLabel label="nombre" data={patient.name} />
        <PatientLabel label="fecha" data={patient.date.toString()} />
        <PatientLabel label="symptoms" data={patient.symptoms} />
        <PatientLabel label="dueño" data={patient.caretaker} />
        <PatientLabel label="email" data={patient.email} />
      </div>

      <div className="flex justify-end gap-3 mt-10">
        <button
          onClick={handleEdit}
          className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md hover:bg-blue-600">EDITAR</button>
        <button
          onClick={handleDelete}
          className="bg-red-500 font-semibold text-white px-4 py-2 rounded-md hover:bg-red-600">ELIMINAR</button>
      </div>
    </div>
  )
}