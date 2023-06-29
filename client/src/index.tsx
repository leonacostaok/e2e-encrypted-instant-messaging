import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import UserProvider from './providers/UserProvider'
import ThemeProvider ,{ GlobalStyle } from './styles/global'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <Provider store={store}>
        <UserProvider>
          <BrowserRouter>
            <App />

          </BrowserRouter>
        </UserProvider>
      </Provider>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
)
