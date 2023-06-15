import styled from "styled-components";

export const BoxShadow = styled.div`
  background-color: ${({theme}) => theme.white};
  box-shadow: 0 8px 10px rgba(0, 0, 0, 0.12), 0 3px 14px rgba(0, 0, 0, 0.08), 0 3px 5px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
`
