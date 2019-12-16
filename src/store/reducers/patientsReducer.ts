import { ApiStatus, IPatientItem } from '../../models';
import { PatientsAction, PatientsActionTypes } from '../actions/patientsActions';


export interface IPatientState {
  loading: ApiStatus;
  data: IPatientItem[];
  selected_patient: IPatientItem | null,
  selected_practitioner: string | null
}

export const initialPatientState: IPatientState = {
  loading: ApiStatus.LOADING,
  data: [],
  selected_patient: null,
  selected_practitioner: null
}

export default function patientsReducer(state: IPatientState = initialPatientState, action: PatientsAction) {
  switch (action.type) {
    case PatientsActionTypes.LOAD_PATIENTS:
    case PatientsActionTypes.LOADING_PATIENTS:
      return {...state, loading: ApiStatus.LOADING }

    case PatientsActionTypes.LOADING_PATIENTS_FAILED:
      return {...state, loading: ApiStatus.FAILED }

    case PatientsActionTypes.LOADED_PATIENTS:
      return {...state, loading: ApiStatus.LOADED, data: action.payload }

    case PatientsActionTypes.SELECT_PRACTITIONER:
      return {...state, selected_practitioner: action.id }

    case PatientsActionTypes.CLEAR_PRACTITIONER:
      return {...state, selected_practitioner: null }
    
    case PatientsActionTypes.SELECT_PATIENT:
      return {...state, selected_patient: state.data.find(patient => patient.patientId === action.id) }
    
    case PatientsActionTypes.CLEAR_PATIENT:
      return {...state, selected_patient: null }

    default:
      return state
  }
}

