import React from 'react';
import { IPatientItem, diabetesType } from '../../../models';
import Card from '../../../components/shared/Card';
import Section from '../../../components/shared/Section';
import Button from '../../../components/shared/Button';
import styled  from 'styled-components';

const Wrapper = styled.section`
  padding: 40px 50px 20px 50px;

  .table-header {
    display: flex;
    align-items: center;
    height: 40px;
    min-width: 900px;
    border-radius: 4px;
    background: #F7F9FD;

    > span {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: 600;
      color: #6395DD;

      :nth-child(1) {
        justify-content: left;
        padding-left: 25px;
      }

      :nth-child(4) {
        width: 200px;
      }
    }
  }
`;

const Patient = styled.div`
  display: flex;

  > div {
    display: flex;
    flex: 1;
    height: 80px;
    align-items: center;
    justify-content: center;

    :nth-child(1){
      justify-content: left;
      padding: 0px 15px;
    }

    :nth-child(4){
      width: 200px;
    }
  }
`;


class PatientList extends React.Component<PatientListProps, IPatientListOwnState> {
  constructor(props: PatientListProps) {
    super(props);

    this.state = {
    }
  }

  formatBirthDate(date: string): string {
    let d = new Date(date);
    return `${d.getUTCDay()}-${d.getUTCMonth()}-${d.getUTCFullYear()}`;
  }

  render() {
    return (
      <Section>
        <header>
          <h1>Lista de Pacientes</h1>
          <div className="actions">
            <Button
              onClick={ () => this.props.clearPractitioner() }>
              Volver
            </Button>
          </div>
        </header>

        <Card className="card">
          <Wrapper>
            <h4><b>ID Médico:</b> {this.props.selected_practitioner}</h4>
            <div className="table-header">
              <span>Nombre</span>
              <span>Nacimiento</span>
              <span>Tipo diabetes</span>
              <span></span>
            </div>
            { 
              this.props.patients.map( patient => 
                <Patient key={patient.patientId}>
                  <div>{ patient.fullname }</div>
                  <div>{ this.formatBirthDate(patient.dateOfBirth) }</div>
                  <div>{ diabetesType(patient.diabetesType) }</div>
                  <div>
                    <Button onClick={ () => this.props.selectPatient(patient.patientId) }>
                      Ver Perfil
                    </Button>
                  </div>
                </Patient>
            )}
          </Wrapper>
        </Card>
      </Section>
    );
  }
}

export default PatientList;

export interface IPatientListOwnState {
}

export interface IPatientListStateProps {
  selected_practitioner: string;
  patients: IPatientItem[];
}

export interface IPatientListDispatchProps {
  selectPatient: (patient: string) => void;
  clearPractitioner: () => void;
}

type PatientListProps = IPatientListStateProps & IPatientListDispatchProps & IPatientListOwnState