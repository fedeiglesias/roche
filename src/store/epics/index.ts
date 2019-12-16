import { combineEpics, createEpicMiddleware } from 'redux-observable';
import patientsEpics from './patientsEpics';
import { IState } from '../reducers';
import { Action } from 'redux';


/**
 * Like in reducers, we have combine function to have our epics organized.
 * If we need to add more epic we can import it and add to combineEpics
 * 
 *  Ex
 *  combineEpics(patientsEpics, practitionersEpics)
 * 
 */
export const rootEpic = combineEpics(patientsEpics);

//Export ready to use middleware
export default createEpicMiddleware<Action, Action, IState>();