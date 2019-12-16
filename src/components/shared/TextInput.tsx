import styled, { keyframes }  from 'styled-components';


export default styled.input`
  display: flex;
  align-items: center;
  width: 215px;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  font-size: 15px;
  font-weight: 300;
  color: #4d4d4d;
  background: whitesmoke;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  outline: 0;

  :hover {
    border: 1px solid #c3c3c3;
  }

  :active, :focus {
    border: 1px solid #00b9ff;
    box-shadow: 0px 0px 7px rgba(26, 192, 255, 0.75), inset 0px 0px 7.5px rgba(92, 92, 92, 0.25);
  }

`;