export interface IPatientItem {
  patientId: string
  practitionerId: string
  name: string
  surname: string
  fullname: string
  dateOfBirth: string
  diabetesType: string
  ranges: IGlucemyRanges
  timeBlocks: {
      night: {
          from: string
          to: string
      },
      breakfast: {
          from: string
          to: string
      },
      lunch: {
          from: string
          to: string
      },
      dinner: {
          from: string
          to: string
      }
  },
  glucoseMesures: IGlucoseMeasure[]
}

export interface IGlucoseMeasure {
  glucose: number,
  date: string
}

export interface IGlucemyRanges {
  low: number,
  ideal: {
      from: number,
      to: number
  },
  high: number
}

export enum ApiStatus {
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed'
}

export const diabetesType = (type: string): string => {
  switch(type) {
    case 'DIABETES_TYPE1':
      return 'Tipo 1';
    case 'DIABETES_TYPE2':
      return 'Tipo 2';
    case 'DIABETES_TYPE3':
      return 'Tipo 3';
    default:
      return '';
  }
}
