import React from "react";
import * as R from "ramda";
import styled from "styled-components";

import Card from "../../../components/shared/Card";
import TextInput from "../../../components/shared/TextInput";
import Button from "../../../components/shared/Button";
import Section from "../../../components/shared/Section";
import { IPatientItem } from "../../../models";
import InfoMessage, { ETypeMessage } from "../../shared/InfoMessage";

const SearchForm = styled.div`
  display: flex;

  > input {
    flex: 1;
  }

  > div {
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

class PatientFinder extends React.Component<
  PatientFinderProps,
  IPatientFinderOwnState
> {
  constructor(props: PatientFinderProps) {
    super(props);

    this.state = {
      query: "2588ac7f57fd9b49",
      notification: {
        show: false,
        type: ETypeMessage.error,
        message: "",
      },
    };
  }

  selectPractitionerHandler() {
    //Check if patient exist
    let exist = R.findIndex(R.propEq("practitionerId", this.state.query))(
      this.props.patients
    );

    // If patient exist
    if (exist > -1) {
      this.props.selectPractitioner(this.state.query);
    } else {
      this.setState({
        notification: {
          show: true,
          type: ETypeMessage.error,
          message: "El ID del Médico ingresado no existe.",
        },
      });
    }
  }

  render() {
    return (
      <Section>
        <header>
          <h1>Buscar Pacientes</h1>
        </header>
        <Card>
          <p>Introduzca el ID del Médico</p>
          {this.state.notification.show && (
            <InfoMessage
              message={this.state.notification.message}
              type={this.state.notification.type}
            ></InfoMessage>
          )}
          <SearchForm>
            <TextInput
              type="text"
              value={this.state.query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                this.setState({
                  query: e.target.value,
                  notification: {
                    ...this.state.notification,
                    show: false,
                  },
                })
              }
              placeholder="ID de Médico"
            />

            <div>
              <Button onClick={() => this.selectPractitionerHandler()}>
                Buscar
              </Button>
            </div>
          </SearchForm>
        </Card>
      </Section>
    );
  }
}

export default PatientFinder;

export interface IPatientFinderOwnState {
  query: string;
  notification: {
    show: boolean;
    type: ETypeMessage;
    message: string;
  };
}

export interface IPatientFinderStateProps {
  patients: IPatientItem[];
}

export interface IPatientFinderDispatchProps {
  selectPractitioner: (id: string) => void;
}

type PatientFinderProps = IPatientFinderStateProps &
  IPatientFinderDispatchProps;
