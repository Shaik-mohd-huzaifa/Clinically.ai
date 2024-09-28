import { PatientsActionTypes } from "./patients.actionTypes"

const Inital_State = {
    patients: []
}

export const PatientsReducer = (state = Inital_State, action) => {
    const {type, payload} = action
    
    if(type === PatientsActionTypes.UPDATE_PATIENT){
        return {
            patients: [...state.patients, payload]
        }
    }
    return state
}