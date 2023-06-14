import *as React from "react";
import {createGlobalStyle, css, DefaultTheme, ThemeProvider as StyledComponentsThemeProvider} from 'styled-components'

import { Colors, FontFamilies, FontSizes } from './styled'
import {useMemo} from 'react'
const colors = (darkMode: boolean): Colors => {
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
    mainColor: darkMode ? '#FF8A2D' : '#FFF3E8',
    mainLight: '#FFF3E8',
    mainDark: '#FF8A2D',
    mainLightTheme: '#FFAA66',
    //colors elements
    mainEle: darkMode ? '#74A1FD' : '#FFAA66',
    secondaryEle: darkMode ? '#FFFFFF' : '#202F3E',
    tertiaryEle: darkMode ? '#90979F' : '#636D78',
    tertiaryEleLight: '#636D78',
    tertiaryEleDark: '#636D78',
    disabledEle: darkMode ? '#636D78' : '#BCC1C5',
    disabledEleLight: '#636D78',
    //colors text
    mainText: darkMode ? '#FFFFFF' : '#0B1B0F',
    secondaryText: darkMode ? '#90979F' : '#636D78',
    caption: '#90979F',
    mainTextDark: '#0B1B0F',
    mainBg: darkMode ? '#202F3E' : '#FFFFFF',
    secondaryBg: darkMode ? '#131D28' : '#FFFFFF',
    incomingBg: darkMode ? '#E4E6E8' : '#414E5B',
    outgoingBg: darkMode ? '#3978FC' : '#E7EFFF',

    dropdownBg: darkMode ? '#202F3E' : '#FFFFFF',
    inputBg: darkMode ? '#414E5B' : '#F7F7F7',

    //color action
    divider: darkMode ? '#414E5B' : '#E7EFFF',
    error: '#FF766E',
    success: '#49CF77',
    highlight: '#FFFDC1',
    system: '#FFFFFF'
  }
}
//fontFamily
const proximaNova = 'Proxima Nova, sans-serif'
function fontFamilies(): FontFamilies {
  return {
    fontProximaNova: proximaNova
  }
}
// ===== start fontSize =====
function fontSizes(): FontSizes {
  return {
    fontSizeText1: '20px',
    fontSizeText2: '16px',
    fontSizeText3: '14px',
    fontSizeText4: '12px',
    fontSizeText5: '11px',

    fontSizeHeading1: '48px',
    fontSizeTitle1: '32px',
    fontSizeBody1: '17px'
  }
}
// ===== end fontSize =====
export const theme = (darkMode: boolean): DefaultTheme => {
  return {
    ...colors(darkMode),
    ...fontFamilies(),
    ...fontSizes(),
    flexRowCenter: css`
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    flexRowCenterVertical: css`
      display: flex;
      align-items: center;
    `,
  }
}
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeObject = useMemo(() => theme(true), [])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}
export const GlobalStyle = createGlobalStyle` 
  
`
