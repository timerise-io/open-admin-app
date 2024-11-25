import React, { PropsWithChildren } from "react";
import { StyledTableData } from "./StyledTableData";

interface ItemListText {
  w?: number;
  className?: string;
  paddingRight?: boolean;
}

export const ItemList: React.FC<PropsWithChildren<ItemListText>> = ({
  children,
  w = 14,
  className = "",
  paddingRight,
}) => {
  return (
    <StyledTableData w={w} className={className} paddingRight={paddingRight}>
      {children}
    </StyledTableData>
  );
};
