import styled, { keyframes } from 'styled-components';
import { Bounce, Animation } from '../../style';
import { darken, lighten, rgba, saturate, desaturate} from 'polished';
import React from "react";

const show = keyframes`
  0% {
    opacity: 0;
    max-height: 0px;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    max-height: 50px;
    transform: scale(1);
  }
`;

// TODO: Create styles for warning and info messages
export enum ETypeMessage {
  info = "info",
  warning = "warning",
  error = "error"
}

export interface IInfoMessage {
  type: ETypeMessage;
  message: string;
  className?: string;
}

const Layout : React.FunctionComponent<IInfoMessage> = props => 
  <div className={[props.className, props.type].join(' ')}>
    {props.message}
  </div>


export default styled(Layout).attrs(props => ({
  
  // Set Base colors from type
  getBaseColor: () => {
    switch(props.type){
      case ETypeMessage.error: return '#d50025';
      case ETypeMessage.warning: return 'orange';
      case ETypeMessage.info: return 'lightblue';
    }
  }

}))`
  display: flex;
  align-items: center;
  min-height: 40px;
  border-radius: 4px;
  border: 1px solid ${ props => desaturate(0.1, darken(0.1, props.getBaseColor())) };
  margin: 20px 0;
  padding: 0 15px;

  font-size: 13px;
  font-weight: 500;

  background: ${ props => lighten(0.45, props.getBaseColor()) };
  color: ${ props => rgba( darken(0.35, props.getBaseColor()), 0.7) };
  box-shadow: 
    0 4px 10px 0 ${ props => rgba( darken(0.4, props.getBaseColor()), 0) }, 
    inset 0 0 10px ${ props => rgba( darken(0.1, props.getBaseColor()), 0.2) };

  animation: ${show} ${Animation.batu}s ${Bounce.sm} backwards;

  &:hover {
    box-shadow: 
      0 4px 10px 0 rgba(darken($base-color, 40%), 0.25), 
      inset 0 0 30px rgba(darken($base-color, 1%), 0.5);
    border: 1px solid darken($base-color, 10%);
  }

`;

