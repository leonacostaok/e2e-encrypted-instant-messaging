import styled from 'styled-components'
const RowCs = styled.div<{ space?: number }>`
  display: flex;
  flex-wrap: wrap;
  margin-right: ${(props) => (props.space ? `${props.space}px` : '0')};
  margin-left: ${(props) => (props.space ? `${props.space}px` : '0')};
`
export default RowCs
