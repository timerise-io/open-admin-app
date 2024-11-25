import styled, { css } from "styled-components";

interface ProjectButtonProps {
  selected?: boolean;
  showBadge?: boolean;
}

export const ProjectButton = styled.button<ProjectButtonProps>`
  position: relative !important;
  all: unset;
  box-sizing: border-box;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  place-items: center;
  background: transparent !important;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 0;
  }

  & > .nav-tooltip {
    display: none;
  }

  & img {
    width: 28px;
    height: 28px;
    border-radius: 2px;
    background-color: #fff;
  }

  & p {
    width: 28px;
    height: 28px;
    border-radius: 2px;
    background-color: #fff;
    display: block;
    line-height: 28px;
  }

  ${({ theme, selected, disabled }) => {
    if (disabled) {
      return css`
        background-color: transparent;
        border: 1px solid transparent;
        color: #999999;
        cursor: unset;

        &:hover {
          border: 1px solid transparent;
        }

        &:hover > .nav-tooltip {
          display: unset;
        }
      `;
    }

    const backgroundColor = selected ? "#EBEBEB" : theme.colorSchemas.background.secondary.color;

    const borderColor = selected ? theme.colors.primary : "transparent";

    return css`
      background-color: ${backgroundColor};
      border: 1px solid ${borderColor};

      &:hover {
        border: 1px solid ${theme.colors.primary};
      }

      &:hover > .nav-tooltip {
        display: unset;
      }
    `;
  }};

  ${({ showBadge }) => {
    if (!showBadge) return "";

    return css`
      &::before {
        content: "";
        position: absolute;
        top: -6px;
        right: -6px;
        background: #ea4335;
        border: 2px solid #f6f6f6;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    `;
  }}
`;
