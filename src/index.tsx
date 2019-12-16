import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import AppContainer from './containers/AppContainer';

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0px;
    margin: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6f6f8;
  }

  * {
    font-family: 'Montserrat', sans-serif;
  }
`

ReactDOM.render(  
  <Provider store={store}>
    <GlobalStyle />
    <AppContainer/>
  </Provider>, 
  document.getElementById('app')
);