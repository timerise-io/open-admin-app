import React from "react";
import styled from "styled-components";
import { IconChevronRight } from "@tabler/icons";

const StyledTableData = styled.div`
  width: 52px;
  max-width: 52px;
  display: grid;
  align-content: center;
`;

export const ItemListDetailChevron = () => {
  return (
    <StyledTableData>
      <IconChevronRight size={24} />
    </StyledTableData>
  );
};
