import { combineEpics, Epic } from "redux-observable";
import { catchError, filter, mergeMap } from "rxjs/operators";
import axios from 'axios';

import {
  PatientsAction,
  PatientsActionTypes,
  loadedPatients,
  loadingPatients,
  loadingPatientsFailed
} from "../actions/patientsActions";

import {IPatientItem} from '../../models';
import { IState } from "../reducers";
import { isOfType } from "typesafe-actions";

//API endpoint to dev by default
let API_ENDPOINT = '';
switch(process.env.NODE_ENV) {
  case 'production':
    API_ENDPOINT = process.env.PROD_API_ENDPOINT;
    break;

  case 'development':
  default:
    API_ENDPOINT = process.env.DEV_API_ENDPOINT;
    break; 
}

const loadPatientsEpic: Epic<PatientsAction, PatientsAction, IState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(PatientsActionTypes.LOAD_PATIENTS)),
    mergeMap(async (action) => {
      const patients = await axios.get(API_ENDPOINT).then( res => res.data as IPatientItem[] )
      return Object.assign({}, action, loadedPatients(patients))
    }),

    catchError(err => Promise.resolve(loadingPatientsFailed()))
  );

export default combineEpics(loadPatientsEpic);