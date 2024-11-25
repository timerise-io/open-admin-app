import styled, { css } from "styled-components";

export const SquareIconButton = styled.button<{
  variant?: "primary" | "danger" | "positive";
}>`
  all: unset;
  display: grid;
  place-items: center;
  color: #333333;
  transition: color 0.2s ease-in-out;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  cursor: pointer;

  ${({ disabled, variant = "primary" }) => {
    const baseColor = variant === "primary" ? "#333333" : "#EA4335";
    const disabledColor = variant === "primary" ? "#999999" : "#F4A099";

    return css`
      cursor: ${disabled ? "auto" : "pointer"};
      background: ${disabled ? "#F6F6F6" : "#FFFFFF"};
      color: ${disabled ? disabledColor : baseColor};
    `;
  }}
`;
