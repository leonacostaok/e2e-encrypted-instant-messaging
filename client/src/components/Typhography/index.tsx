import styled from "styled-components";
const TextGeneral = styled.p`
  font-family: ${({theme}) => theme.fontProximaNova};
  color: ${({theme}) => theme.mainTextDark};
  font-style: normal;
  font-weight: 400;
  margin: 0;
`
//[20,24]
export const TextLarge = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeText1};
  line-height: 1.2;
  letter-spacing: 0.03px;
`
//[16,24]
export const TextMedium = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeText2};
  line-height: 1.5;
  letter-spacing: 0.15px;
`
//[14,20]
export const TextSmall = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeText3};
  line-height: 1.428;
`
//[14,20]
export const LabelLarge = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeText3};
  line-height: 1.428;
`
//[12,16]
export const LabelMedium = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeText4};
  line-height: 1.333;
`
//[11,16]
export const LabelSmall = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeText5};
  line-height: 1.45;
`

//[48,auto]
export const Heading1 = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeHeading1};
`
//[32,auto]
export const Title1 = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeTitle1};
`
//[17,auto]
export const TextBody = styled(TextGeneral)`
  font-size: ${({theme}) => theme.fontSizeBody1};
`
