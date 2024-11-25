import { Box, BoxProps } from "components/layout/Box";
import { AlignItems, JustifyContent } from "models/commonProperties";
import styled from "styled-components";

type ColumnProps = BoxProps & {
  jc?: JustifyContent;
  ai?: AlignItems;
  gap?: string;
};

export const Column = styled(Box)<ColumnProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ jc }) => jc ?? "space-between"};
  align-items: ${({ ai }) => ai ?? "center"};
  gap: ${({ gap }) => gap ?? "0"};

  & > .stretch-element {
    flex: 1;
  }
`;
