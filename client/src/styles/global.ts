import { createGlobalStyle, DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
    }
    #root, body, html {
        min-height: 100%;
        height: 100%;
        min-width: 100%;
    }
 `

const colors = (darkMode: boolean) => {
 return {
  darkMode,

  // base
  white: '#FFFFFF',
  black: '#000000',

  // colors
  aquamarine: '#e1fff3',
  darkGreen: '#009359',
  lightGreen: '#00ff9a',

  modalDarkGreen: 'rgba(0,147,89,0.4)',
 }
}

export const theme = (darkMode: boolean): DefaultTheme => {
 return {
  colors: colors(true)
 }
}
