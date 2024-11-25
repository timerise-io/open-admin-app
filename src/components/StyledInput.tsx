import styled, { css } from "styled-components";

const StyledInput = styled.input<{ isError?: boolean }>`
  all: unset;
  border-width: 1px;
  border-style: solid;
  ${({ theme, isError, disabled }) => {
    const borderColor = isError ? "#EA4335" : theme.colorSchemas.input.border;

    const backgroundColor = disabled ? "#F6F6F6" : theme.colorSchemas.input.background;

    const fontColor = disabled ? "#999999" : theme.colors.primary;

    return css`
      color: ${fontColor};
      background-color: ${backgroundColor};
      border-color: ${borderColor};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      padding: calc(1.125 * ${theme.spacing}) calc(1.375 * ${theme.spacing});
    `;
  }}
  ${({ theme, isError, disabled }) => {
    const borderHoverColor = isError ? "#EA4335" : theme.colorSchemas.input.borderHover;
    const borderFocusColor = isError ? "#EA4335" : theme.colors.primary;

    if (disabled) return ``;

    return css`
      &:hover {
        border-color: ${borderHoverColor};
      }

      &:focus {
        border-color: ${borderFocusColor};
      }
    `;
  }}
`;

export default StyledInput;
