import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

export const StyledRow = styled.div<{ showHover: boolean; index: number }>`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  grid-column: 1/-1;
  padding: 16px 0;

  ${({ index }) => {
    return css`
      grid-row-start: ${2 + index};
      grid-row-end: ${3 + index};
    `;
  }}

  ${({ theme, showHover }) => {
    return css`
      background-color: ${theme.colorSchemas.background.secondary.color};
      cursor: ${showHover ? "pointer" : "auto"};
    `;
  }}

${({ showHover }) => {
    if (showHover)
      return css`
        &:hover {
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.24);
        }
      `;

    return "";
  }}
`;
interface ItemsListRowWrapperProps {
  to?: string;
  index: number;
}

export const ItemsListRowWrapper: React.FC<PropsWithChildren<ItemsListRowWrapperProps>> = ({ to, children, index }) => {
  const navigate = useNavigate();

  return (
    <>
      <StyledRow className="data-row" showHover={!!to} onClick={() => to && navigate(to)} index={index ?? 0}>
        {children}
      </StyledRow>
    </>
  );
};
