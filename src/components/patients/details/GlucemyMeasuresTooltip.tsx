import React from "react";
import styled, { keyframes } from 'styled-components';
import { Animation, Bounce } from '../../../style';
import {IGlucoseMeasure, IGlucemyRanges} from '../../../models';

const show = keyframes`
  0% {
    opacity: 0;
    transform: translateX(50px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

type props = {
  className?: string
  data: {
    show: boolean;
    top: number;
    left: number;
    gm: IGlucoseMeasure;
  },
  ranges: IGlucemyRanges;
}

const Layout : React.FunctionComponent<props> = props => {
  let t = new Date(props.data.gm.date)
  const days = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab']
  return (
    <div className={props.className}>
      <span className="hour">{ t.getUTCHours().toString().padStart(2, '0') + ':' + t.getUTCMinutes().toString().padStart(2, '0') }</span>
      <span className="day">{ days[t.getUTCDay()] + ' ' + t.getUTCMonth() + '/' + t.getUTCDate() }</span>
      <span className="glucose">{ props.data.gm.glucose }</span>
    </div>
  )
}


export default styled(Layout)`
  position: absolute;
  top: ${props => props.data.top}px;
  left: ${props => props.data.left}px;
  width: 200px;
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
  background: white;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  animation: ${show} ${Animation.batu}s ${Bounce.xs} backwards;

  ::before {
    content: '';
    display: block;
    position: relative;
    top: 0px;
    width: 100%;
    height: 7px;
    background: black;
    ${props => (props.data.gm.glucose < props.ranges.low) && 'background: #d50025;' }
    ${props => (props.data.gm.glucose > props.ranges.ideal.to) && 'background: #598edb;' }
  }

  > .hour {
    position: absolute;
    top: 16px;
    left: 8px;
    font-size: 12px;
    color: #9b9b9b;
  }

  > .day {
    position: absolute;
    top: 16px;
    right: 8px;
    font-size: 12px;
    color: #9b9b9b;
  }

  > .glucose {
    position: absolute;
    bottom: 8px;
    left: 8px;
    width: 100px;
    color: #3a3a3a;
    font-size: 21px;

    ::before {
      content: 'Glucemia';
      font-size: 8px;
      color: #adadad;
      display: block;
    }

    ::after {
      content: 'mg/dL';
      position: absolute;
      bottom: 4px;
      margin-left: 3px;
      font-size: 8px;
      color: #3a3a3a;
    }
  }

`;


