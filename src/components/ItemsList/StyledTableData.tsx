import styled, { css } from "styled-components";

export const StyledTableData = styled.div<{
  w: number;
  paddingRight?: boolean;
}>`
  display: grid;
  align-content: center;
  justify-content: start;
  ${({ theme, paddingRight }) => {
    return css`
      padding-right: ${paddingRight ? "16px" : "0"};
    `;
  }};
`;

export const StyledTableDataFlex = styled.div<{
  w: number;
  paddingRight?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ theme, paddingRight }) => {
    return css`
      padding-right: ${paddingRight ? "16px" : "0"};
    `;
  }};
`;
