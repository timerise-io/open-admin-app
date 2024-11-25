import { ButtonType } from "models/theme";
import styled, { css } from "styled-components";

interface ButtonProps {
  buttonType: ButtonType;
  checked?: boolean;
  fillWidth?: boolean;
  noWrap?: boolean;
}

export const Button = styled.button<ButtonProps>`
  all: unset;
  text-align: center;
  cursor: pointer;
  font-weight: 700;
  padding: 10px 12px;
  ${({ fillWidth = true, noWrap = false }) => {
    return css`
      width: ${fillWidth ? "-webkit-fill-available" : "unset"};
      white-space: ${noWrap ? "nowrap" : "unset"};
    `;
  }}
  ${({ theme, buttonType, disabled, checked }) => {
    const colors = theme.colorSchemas.button[buttonType];
    const textColor = disabled ? colors.textDisabled ?? colors.text : colors.text;

    const background = disabled ? colors.backgroundDisabled : colors.background;
    const backgroundFocus = disabled ? colors.backgroundDisabled : colors.backgroundActive;

    const border = colors.border ?? "unset";
    const borderActive = colors.borderActive ?? border;
    const borderChecked = colors.borderChecked ?? border;
    const backgroundChecked = colors.backgroundChecked ?? background;
    const backgroundCheckedActive = colors.backgroundCheckedActive ?? backgroundChecked;

    const borderToUse = checked ? borderChecked : border;
    const backgroundToUse = checked ? backgroundChecked : background;
    const focusBackgroundToUse = checked ? backgroundCheckedActive : backgroundFocus;

    const focusBorderToUse = checked ? borderChecked : borderActive;

    const shadow = colors.shadow ?? "unset";
    const shadowToUse = disabled ? "unset" : shadow;

    const activeShadow = colors.shadowActive ?? "unset";
    const activeShadowToUse = disabled ? "unset" : activeShadow;

    return css`
      background-color: ${backgroundToUse};
      color: ${textColor};
      border-radius: ${theme.borderRadius};
      font-size: ${theme.typography.body.size};
      border: ${borderToUse};
      box-shadow: ${shadowToUse};

      &:hover,
      &:focus {
        background-color: ${focusBackgroundToUse};
        border: ${focusBorderToUse};
        box-shadow: ${activeShadowToUse};
      }
    `;
  }}
`;
