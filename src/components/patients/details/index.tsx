import React from 'react';
import { IPatientItem } from '../../../models';
import GlucemyMeasuresChart from './GlucemyMeasuresChart';
import Card from '../../../components/shared/Card';
import Button from '../../../components/shared/Button';
import Section from '../../../components/shared/Section';

class PatientDetails extends React.Component<PatientDetailsProps, IPatientDetailsOwnState> {
  constructor(props: PatientDetailsProps) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <Section>
        <header>
          <h1>{this.props.patient.fullname}</h1>
          <div className="actions">
            <Button
              onClick={ () => this.props.clearPatient() }>
              Volver
            </Button>
          </div>
        </header>
        <Card >
          <GlucemyMeasuresChart
            patient={this.props.patient}>
          </GlucemyMeasuresChart>
        </Card>
      </Section>
    );
  }
}

export default PatientDetails;

export interface IPatientDetailsOwnState {
}

export interface IPatientDetailsStateProps {
  patient: IPatientItem | null;
}

export interface IPatientDetailsDispatchProps {
  clearPatient: () => void;
}

type PatientDetailsProps = IPatientDetailsStateProps & IPatientDetailsDispatchProps & IPatientDetailsOwnState