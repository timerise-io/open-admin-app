import React, { PropsWithChildren } from "react";
import { Typography } from "components/Typography";
import styled from "styled-components";
import { StyledTableData } from "./StyledTableData";

const StyledTypography = styled(Typography)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface ItemListTextDataProps {
  w?: number;
  align?: "center" | "left" | "right" | "unset";
  className?: string;
  paddingRight?: boolean;
}

export const ItemListTextData: React.FC<PropsWithChildren<ItemListTextDataProps>> = ({
  children,
  align,
  w = 14,
  className = "",
  paddingRight,
}) => {
  return (
    <StyledTableData w={w} className={className} paddingRight={paddingRight}>
      <StyledTypography className="table-data-custom-text" typographyType="body" align={align} as="span">
        {children}
      </StyledTypography>
    </StyledTableData>
  );
};
