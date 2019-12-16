import { IPatientItem } from "../../models";
import { string } from "prop-types";

export enum PatientsActionTypes {
  LOAD_PATIENTS = 'patients/load',
  LOADING_PATIENTS = 'patients/loading',
  LOADED_PATIENTS = 'patients/loaded',
  LOADING_PATIENTS_FAILED = 'patients/loading_failed',

  SELECT_PATIENT = 'patients/select',
  CLEAR_PATIENT = 'patients/clear',

  SELECT_PRACTITIONER = 'practitioner/select',
  CLEAR_PRACTITIONER = 'practitioner/clear'
}


export function loadPatients(): ILoadPatientsAction {
  return {
    type: PatientsActionTypes.LOAD_PATIENTS
  }
}

export function loadingPatients(): ILoadingPatientsAction {
  return {
    type: PatientsActionTypes.LOADING_PATIENTS
  }
}

export function loadedPatients(patients: IPatientItem[]): ILoadedPatientsAction {
  return {
    type: PatientsActionTypes.LOADED_PATIENTS,
    payload: patients
  }
}

export function loadingPatientsFailed(): ILoadingPatientsFailedAction {
  return {
    type: PatientsActionTypes.LOADING_PATIENTS_FAILED
  }
}




export function selectPractitioner(id: string): ISelectPractitionerAction {
  return {
    type: PatientsActionTypes.SELECT_PRACTITIONER,
    id: id
  }
}

export function clearPractitioner(): IClearPractitionerAction {
  return {
    type: PatientsActionTypes.CLEAR_PRACTITIONER
  }
}


export function selectPatient(id: string): ISelectPatientAction {
  return {
    type: PatientsActionTypes.SELECT_PATIENT,
    id: id
  }
}

export function clearPatient(): IClearPatientAction {
  return {
    type: PatientsActionTypes.CLEAR_PATIENT
  }
}



// Interfaces

export interface ILoadPatientsAction {
  type: PatientsActionTypes.LOAD_PATIENTS;
}

export interface ILoadingPatientsAction {
  type: PatientsActionTypes.LOADING_PATIENTS;
}

export interface ILoadedPatientsAction {
  type: PatientsActionTypes.LOADED_PATIENTS;
  payload: IPatientItem[];
}

export interface ILoadingPatientsFailedAction {
  type: PatientsActionTypes.LOADING_PATIENTS_FAILED;
}

export interface ISelectPractitionerAction {
  type: PatientsActionTypes.SELECT_PRACTITIONER;
  id: string;
}

export interface IClearPractitionerAction {
  type: PatientsActionTypes.CLEAR_PRACTITIONER;
}

export interface ISelectPatientAction {
  type: PatientsActionTypes.SELECT_PATIENT;
  id: string;
}

export interface IClearPatientAction {
  type: PatientsActionTypes.CLEAR_PATIENT;
}



export type PatientsAction = 
  ILoadPatientsAction | 
  ILoadingPatientsAction | 
  ILoadedPatientsAction | 
  ILoadingPatientsFailedAction |
  ISelectPractitionerAction |
  IClearPractitionerAction |
  ISelectPatientAction |
  IClearPatientAction;