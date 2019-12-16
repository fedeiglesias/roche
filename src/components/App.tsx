import React from 'react';
import { IPatientItem, ApiStatus } from '../models';

//Finder
import PatientFinder from './patients/finder';

//List
import PatientList from './patients/list';

//Details
import PatientDetails from './patients/details';


class App extends React.Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount() {
    this.props.loadPatients();
  }

  render() {
    const { 
      patients,
      selected_patient,
      selected_practitioner,
      selectPatient,
      clearPatient,
      selectPractitioner,
      clearPractitioner 
    } = this.props;
    
    

    return (
      <div>

        { 
          ((selected_practitioner === null) && (selected_patient === null)) && 
          <PatientFinder 
            patients={patients}
            selectPractitioner={selectPractitioner}>
          </PatientFinder>
        }

        { 
          ((selected_practitioner !== null) && (selected_patient === null)) && 
          <PatientList 
            patients={patients}
            selected_practitioner={selected_practitioner}
            selectPatient={selectPatient}
            clearPractitioner={clearPractitioner}>
          </PatientList>
        }

        { 
          ((selected_practitioner !== null) && (selected_patient !== null)) && 
          <PatientDetails 
            patient={selected_patient} 
            clearPatient={clearPatient}>
          </PatientDetails>
        }

      </div>
    );
  }
}

export default App;

export interface IAppStateProps {
  loading: ApiStatus;
  selected_practitioner: string | null,
  selected_patient:IPatientItem | null,
  patients: IPatientItem[];
}

export interface IAppDispatchProps {
  loadPatients: () => void;
  selectPatient: (id: string) => void;
  clearPatient: () => void;
  selectPractitioner: (id: string) => void;
  clearPractitioner: () => void;
}

type AppProps = IAppStateProps & IAppDispatchProps