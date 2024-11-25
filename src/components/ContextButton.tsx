import styled, { css } from "styled-components";

export const ContextButton = styled.button`
  all: unset;
  text-align: center;
  box-sizing: border-box;
  font-weight: 700;
  padding: 9px 12px;
  border-radius: 4px;
  display: flex;
  white-space: nowrap;
  font-size: 13px;
  line-height: 16px;

  ${({ disabled }) => {
    const textColor = disabled ? "#999" : "#333";
    const cursor = disabled ? "unset" : "pointer";
    const borderHover = disabled ? "#d9d9d9" : "#999";

    return css`
      border: 1px solid #d9d9d9;
      color: ${textColor};
      cursor: ${cursor};
      background: #ffffff;

      &:hover,
      &:focus {
        border: 1px solid ${borderHover};
      }
    `;
  }}

  & > * {
    font-size: 13px;
    line-height: 16px;
    height: 16px;
  }
`;
