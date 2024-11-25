import styled, { css } from "styled-components";
import { Column } from "./Column";
import { Row } from "./Row";

export const MainLayoutWrapper = styled(Column)`
  height: 100vh;
  overflow: hidden;
`;

export const MainColumnLayoutWrapper = styled(Row)<{ wrapperOffsetTop: number }>`
  width: 100%;
  flex-grow: 1;
  align-items: flex-start;
  height: calc(100vh - ${(props) => props.wrapperOffsetTop}px);
`;

export const MainContent = styled.div<{ topOffset?: number }>`
  flex-grow: 1;
  height: 100%;
  overflow: auto;

  ${({ theme, topOffset = 0 }) => {
    return css`
      max-height: calc(100vh - ${topOffset}px);
      background-color: ${theme.colorSchemas.background.primary.color};
    `;
  }}
`;
