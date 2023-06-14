import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import UserProvider from './providers/UserProvider'
import ThemeProvider ,{ GlobalStyle } from './styles/global'
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <App />

        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
)
