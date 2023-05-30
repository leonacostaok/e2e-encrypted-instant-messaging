import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import { GlobalStyle } from "./styles/global";
import UserProvider from "./providers/UserProvider";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

