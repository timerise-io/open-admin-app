import React from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { ROUTES } from "constans/routes";
import styled from "styled-components";
import { DashboardCardDetailsLink } from "./DashboardCardDetailsLink";

const StyledCard = styled.div`
  background: #ffffff;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
`;

export const DashboardBillingCard = () => {
  return (
    <StyledCard>
      <Typography typographyType="body" displayType="contents">
        Billing plan: Large
      </Typography>
      <Box w="26px" />
      <DashboardCardDetailsLink to={ROUTES.billing}>Manage</DashboardCardDetailsLink>
    </StyledCard>
  );
};
