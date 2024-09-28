import { combineReducers } from "redux"
import { PatientsReducer } from "./patients/patients.reducer"



export const rootreducer = combineReducers({
    patients: PatientsReducer
})