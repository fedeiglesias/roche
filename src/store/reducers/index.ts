import { combineReducers } from 'redux';
import {createSelector} from 'reselect';
import patientsReducer, { IPatientState, initialPatientState } from './patientsReducer';
import { IPatientItem } from '../../models';

export interface IState {
  patients: IPatientState;
}

/**
 * If we need to add new sections in the future like Practitioners details or other stuff
 * we can attach here our new reducer to manage their state
 * 
 *  Ex
 *  patients: patientsReducer,
 *  practitioners: practitionersReducer
 * 
 */

export const initialState: IState = {
  patients: initialPatientState
};

export default combineReducers({
  patients: patientsReducer
});



export const selectedPractitioner = (state: IState) => state.patients.selected_practitioner;
export const selectPatientsList = (state: IState) => state.patients.data;

export const selectPractitionerPatientList = createSelector(
  selectedPractitioner, selectPatientsList,
  (practitionerId, patientList) => {
    //Filter if Prectitioner is selected
    if (practitionerId !== null) {
      patientList = patientList.filter( patient => patient.practitionerId === practitionerId)
    }
    
    return patientList;
  }
)
