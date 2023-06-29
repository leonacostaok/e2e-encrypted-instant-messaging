import styled from 'styled-components'
interface TypeCol {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
  gutter?: number
}
const getWidthCol = (span: number): number => {
  return (span / 12) * 100
}
const ColumnCs = styled.div<TypeCol>`
  padding-left: ${(props) => (props.gutter ? `${props.gutter}px` : '0')};
  padding-right: ${(props) => (props.gutter ? `${props.gutter}px` : '0')};
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: ${(props) => props.xs && `${getWidthCol(props.xs)}%`};
  max-width: ${(props) => props.xs && `${getWidthCol(props.xs)}%`};
  @media (min-width: 576px) {
    flex-basis: ${(props) => props.sm && `${getWidthCol(props.sm)}%`};
    max-width: ${(props) => props.sm && `${getWidthCol(props.sm)}%`};
  }
  @media (min-width: 768px) {
    flex-basis: ${(props) => props.md && `${getWidthCol(props.md)}%`};
    max-width: ${(props) => props.md && `${getWidthCol(props.md)}%`};
  }
  @media (min-width: 992px) {
    flex-basis: ${(props) => props.lg && `${getWidthCol(props.lg)}%`};
    max-width: ${(props) => props.lg && `${getWidthCol(props.lg)}%`};
  }
  @media (min-width: 1200px) {
    flex-basis: ${(props) => props.xl && `${getWidthCol(props.xl)}%`};
    max-width: ${(props) => props.xl && `${getWidthCol(props.xl)}%`};
  }
  @media (min-width: 1400px) {
    flex-basis: ${(props) => props.xxl && `${getWidthCol(props.xxl)}%`};
    max-width: ${(props) => props.xxl && `${getWidthCol(props.xxl)}%`};
  }
`
export default ColumnCs
