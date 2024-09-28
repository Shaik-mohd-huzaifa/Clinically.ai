import { PatientsActionTypes } from "./patients.actionTypes"

export const UpdatePatient = (patient) => {
    return {
        type: PatientsActionTypes.UPDATE_PATIENT,
        payload: patient,
    }
}