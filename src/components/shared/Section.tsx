import styled, { keyframes } from 'styled-components';
import { Bounce, Animation } from '../../style';
import React, { ReactNode } from "react";

const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const appearFromLeft = keyframes`
  0% {
    transform: translateX(-80px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`
const appearFromRight = keyframes`
  0% {
    transform: translateX(80px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
`

type props = {
  children: ReactNode,
  className?: string
}

const Layout : React.FunctionComponent<props> = props =>
  <div className={props.className}>
    {props.children}
  </div>

export default styled(Layout)`
  display: flex;
  flex-direction: column;
  animation: ${show} ${Animation.batu}s ${Bounce.md};

  > header {
    display: flex;
    align-items: center;
    height: 100px;

    > h1 {
      flex: 1;
      font-size: 36px;
      font-weight: 200;
      color: #0065c8;
      opacity: 0;
      margin: 0px;
  
      animation: ${appearFromLeft} ${Animation.batu}s ${Bounce.lg} ${Animation.batu * 0.8}s forwards;
    }

    > .actions {
      display: flex;
      justify-content: center;
      width: 120px;

      > button {
        opacity: 0;
        animation: ${appearFromRight} ${Animation.batu}s ${Bounce.lg} ${Animation.batu * 0.8}s forwards;
      }
    }

  }

  > .card {
    animation-delay: ${Animation.batu}s;
  }
`;


