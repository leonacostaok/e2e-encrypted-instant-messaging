export type FontFamily = string
export interface FontFamilies {
  fontProximaNova: FontFamily
}
//fontSize
export type FontSize = string
export interface FontSizes {
  fontSizeText1: FontSize
  fontSizeText2: FontSize
  fontSizeText3: FontSize
  fontSizeText4: FontSize
  fontSizeText5: FontSize

  fontSizeHeading1: FontSize
  fontSizeTitle1: FontSize
  fontSizeBody1: FontSize
  fontSizeBody2: FontSize
}

//colors
export type Color = string
export interface Colors {
  darkMode: boolean

  // base
  white: Color
  black: Color

  // colors
  aquamarine: Color
  darkGreen: Color
  lightGreen: Color

  modalDarkGreen: Color
  mainColor:Color
  mainLight:Color
  mainDark:Color
  mainLightTheme:Color
  //colors elements
  mainEle:Color
  secondaryEle:Color
  secondaryEleLight:Color
  tertiaryEle:Color
  tertiaryEleLight:Color
  tertiaryEleDark:Color
  disabledEle:Color
  disabledEleLight:Color
  disabledEleDark:Color

  //colors text
  mainText:Color
  secondaryText:Color
  secondaryTextLight:Color
  caption:Color
  mainTextLight:Color

  //background Color
  mainBg:Color
  secondaryBg:Color
  incomingBg:Color
  incomingBgLight:Color
  outgoingBg:Color
  outgoingBgDark:Color
  bgModal:Color

  dropdownBg:Color
  inputBg:Color
  inputBgLight:Color

  //color action
  divider:Color
  error:Color
  success:Color
  highlight:Color
  system:Color
}
