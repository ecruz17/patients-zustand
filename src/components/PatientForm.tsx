import { useForm } from "react-hook-form"
import { ErrorMsg } from "./ErrorMsg";
import { PatientDraft } from "../interfaces/Patient";
import { usePatientStore } from "../store";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const PatientForm = () => {
  const { addPatient, patients, activeId, updatePatient } = usePatientStore();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<PatientDraft>();

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(patient => patient.id === activeId)[0];
      setValue('name', activePatient.name);
      setValue('caretaker', activePatient.caretaker);
      setValue('email', activePatient.email);
      setValue('date', activePatient.date);
      setValue('symptoms', activePatient.symptoms);
    }
  }, [activeId])


  const registerPatient = (formData: PatientDraft) => {
    if (activeId) {
      updatePatient(formData);
      toast.success('Paciente editado con éxito');
    } else {
      addPatient(formData);
      toast.success('Paciente guardado con éxito');
    }
    reset();
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 border border-gray-200"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold flex mb-2">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-300 rounded"
            type="text"
            placeholder="Nombre del Paciente"
            {...register('name', {
              required: 'El nombre del paciente es requerido',
            })}
          />     
          {
            errors.name?.message && (<ErrorMsg>{errors.name?.message}</ErrorMsg>)
          }      
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold flex mb-2">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-300 rounded"
            type="text"
            placeholder="Nombre del Propietario"
            {...register('caretaker', {
              required: "El nombre del propietario es requerido"
            })}
          />
          {
            errors.caretaker?.message && (<ErrorMsg>{errors.caretaker?.message}</ErrorMsg>)
          }
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold flex mb-2">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-300 rounded"
            type="email"
            placeholder="Email de Registro"
            {...register('email', {
              required: "El email del paciente es requerido",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "El email no es válido"
              }
            })}
          />
          {
            errors.email?.message && (<ErrorMsg>{errors.email?.message}</ErrorMsg>)
          }
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold flex mb-2">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-300 rounded"
            type="date"
            {...register('date', {
              required: "La fecha de alta del paciente es requerida"
            })}
          />
          {
            errors.date?.message && (<ErrorMsg>{errors.date?.message}</ErrorMsg>)
          }
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold flex mb-2">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-300 rounded"
            placeholder="Síntomas del paciente"
            {...register('symptoms', {
              required: "Los síntomas del paciente son requeridos"
            })}
          ></textarea>
          {
            errors.symptoms?.message && (<ErrorMsg>{errors.symptoms?.message}</ErrorMsg>)
          }
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full rounded p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value='Guardar Paciente'
        />
      </form>
    </div>
  )
}
