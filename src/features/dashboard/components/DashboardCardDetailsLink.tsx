import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const DashboardCardDetailsLink = styled(Link)`
  all: unset;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => {
    const typographyTheme = theme.typography.body;
    return css`
      font-size: ${typographyTheme.size};
      font-weight: ${typographyTheme.weight};
      line-height: ${typographyTheme.lineHeight};
    `;
  }}
`;
