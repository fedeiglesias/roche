import styled, { keyframes }  from 'styled-components';
import { Bounce, Animation } from '../../style';
import {timingFunctions} from 'polished';

const show = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export default styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: #fff;
  padding: 15px;
  max-width: 1000px;
  min-width: 600px;
  margin-bottom: 40px;
  box-shadow: 
      inset 0px 0px 50px rgba(0, 0, 0, 0.01),
      0px 2px 7px rgba(0, 0, 0, 0.2);

  animation: ${show} ${Animation.batu}s ${timingFunctions('easeOutQuart')} backwards;
  transition: all ${Bounce.sm} ${Animation.batu}s ;
  
  :hover {
    box-shadow: 
      inset 0px 0px 50px rgba(0, 0, 0, 0.01),
      0px 5px 10px rgba(0, 0, 0, 0.3);
  }

  h1 {
    font-size: 28px;
    font-weight: 500;
    color: #0065c8;
    margin: 0px;
  }

  h4 {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    color: #333;
  }

`;