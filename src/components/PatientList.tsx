import { usePatientStore } from "../store"
import { PatientDetails } from "./PatientDetails";

export const PatientList = () => {

  const { patients } = usePatientStore();

  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overfloy-y-scroll">
      {
        patients.length ?
          (
            <>
              <h2 className="text-3xl font-black text-center">Listado de pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Administra tus {''}
                <span className="text-blue-600 font-bold">pacientes</span>
              </p>
              
              {
                patients.map(patient => (
                  <PatientDetails key={patient.id} patient={patient} />
                ))
              }
            </>
            
          ) :
          (
            <>
              <h2 className="text-3xl font-black text-center">No hay pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Comienza a {''}
                <span className="text-blue-600 font-bold">agregar pacientes</span>
              </p>
            </>
          )
      }
    </div>
  )
}