import styled from 'styled-components';
import { darken, lighten, rgba, saturate} from 'polished';
import { Bounce, Animation } from '../../style';

const color = '#0065c8';
const size = 40;


export default styled.button`
  height: ${size}px;
  padding: 0px ${size * 0.5}px;
  border-radius: ${size * 0.5}px;
  background: ${color};
  outline: transparent;
  
  border: 1px solid transparent;
  text-transform: uppercase;
  cursor: pointer;

  color: white;
  font-weight: 500;
  font-size: 13px;
  white-space: nowrap;
  

  transition:
    all ${Animation.batu}s ${Bounce.lg},
    transform ${Animation.batu}s ${Bounce.lg};

  &:hover {
    box-shadow: 
      0 0 ${size * 0.2}px ${ rgba(lighten(0.06, color), 0.7) } , 
      inset 0 0 ${size * 0.5}px ${ darken(0.07, color) };
    
    padding: 0px ${size * 0.6}px;
    background: ${lighten(0.06, saturate(0.5, color))};
    border: 1px solid ${rgba(darken(0.08, color), 0.9)};
    text-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
  }
`;