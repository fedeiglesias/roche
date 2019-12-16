import { connect } from 'react-redux';
import App, { IAppStateProps, IAppDispatchProps } from '../components/App';
import { IState, selectPractitionerPatientList } from '../store/reducers';
import {  loadPatients,
          selectPatient,
          selectPractitioner ,
          clearPatient,
          clearPractitioner
        } from '../store/actions/patientsActions';


function mapStateToDispatch(state: IState): IAppStateProps {
  return {
    patients: selectPractitionerPatientList(state),
    selected_patient: state.patients.selected_patient,
    selected_practitioner: state.patients.selected_practitioner,
    loading: state.patients.loading,
  }
}

const mapDispatchToProps: IAppDispatchProps = {
  loadPatients,
  selectPatient,
  clearPatient,
  selectPractitioner,
  clearPractitioner
}

export default connect(mapStateToDispatch, mapDispatchToProps)(App);