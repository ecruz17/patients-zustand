import { create } from "zustand";
import { Patient, PatientDraft } from './interfaces/Patient';
import { v4 as uuid } from 'uuid';

interface PatientState { 
  patients: Patient[];
  activeId: string;
  addPatient: (patient: PatientDraft) => void;
  deletePatient: (id: Patient['id']) => void;
  editPatient: (id: Patient['id']) => void;
  updatePatient: (patient: PatientDraft) => void;
}

const createPatient = (patient: PatientDraft): Patient => {
  return {...patient, id: uuid()}
}

export const usePatientStore = create<PatientState>((set) => ({
    patients: [],
    activeId: '',
    addPatient: (patientDraft) => {

      const newPatient = createPatient(patientDraft);

      set((state) => ({
        patients: [...state.patients, newPatient ],
      }));
    },

    deletePatient: (id) => {
      set((state) => ({
        patients: state.patients.filter((patient: Patient) => patient.id !== id)
      }));  
    },

    editPatient: (id) => {
      set(() => ({
        activeId: id
      }))
    },

    updatePatient(data) {
      set((state) => ({
        patients: state.patients.map(patient => patient.id === state.activeId ? { ...data, id: patient.id } : patient),
        activeId: ''
      }))
    },
  }
));