import React from "react";
import { Typography } from "components/Typography";
import styled from "styled-components";

const StyledTypography = styled(Typography)`
  display: inline;
  text-transform: uppercase;
  padding: 0 16px;
`;

interface ItemsListColumnHeaderProps {
  text: string;
}

export const ItemsListColumnHeader: React.FC<ItemsListColumnHeaderProps> = ({ text }) => {
  return (
    <td>
      <StyledTypography typographyType="label">{text}</StyledTypography>
    </td>
  );
};
