import styled, { css } from "styled-components";

export const Card = styled.div`
  width: 100%;
  padding: 20px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  ${({ theme }) => {
    return css`
      border-radius: ${theme.borderRadius};
      background-color: ${theme.colorSchemas.background.secondary.color};
    `;
  }}
`;
