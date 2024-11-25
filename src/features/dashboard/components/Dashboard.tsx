import React from "react";
import { FullScreenButton } from "components/FullScreenButton";
import { Select } from "components/Select";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { DashboardBillingCard } from "./DashboardBillingCard";
import { DashboardCard } from "./DashboardCard";
import { DashboardCardDetailsLink } from "./DashboardCardDetailsLink";

const ContentWrapper = styled.div`
  padding: 0 32px 32px 32px;
`;

const StyledSection = styled.section`
  margin-top: 40px;
`;

const StyledDashboardCardsRow = styled(Row)`
  gap: 20px;
`;

const StyledCardDetailsLink = styled(Link)`
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

export const Dashboard = () => {
  const { t } = useTranslation();
  const whitelabel = useWhitelabel();
  return (
    <>
      <PageHeader title="Dashboard">
        <FullScreenButton />
      </PageHeader>
      <ContentWrapper>
        <Row>
          <Row jc="flex-start">
            <Select label="Date" value="a1" options={{ a1: "Month", b1: "Day", c1: t("all") }} />
            <Box ml={1}>
              <Select label="Location" value="a1" options={{ a1: "Month", b1: "Day", c1: t("all") }} />
            </Box>
          </Row>
          {whitelabel.billingSection === true && <DashboardBillingCard />}
        </Row>
        <StyledSection>
          <Typography typographyType="h3" as="h3">
            {t("common:dashboard.api-usage")}
          </Typography>
          <StyledDashboardCardsRow>
            <DashboardCard title="Used bookings">
              <Row jc="space-between">
                <Typography typographyType="h1" displayType="contents">
                  964
                </Typography>
                <StyledCardDetailsLink to={ROUTES.bookings}>View</StyledCardDetailsLink>
              </Row>
            </DashboardCard>
            <DashboardCard title="Confirmed">
              <Row jc="space-between">
                <Typography typographyType="h1" displayType="contents">
                  948
                </Typography>
                <DashboardCardDetailsLink to={ROUTES.bookings}>View</DashboardCardDetailsLink>
              </Row>
            </DashboardCard>
          </StyledDashboardCardsRow>
          <StyledDashboardCardsRow>
            <DashboardCard title="Rescheduled bookings">
              <Row jc="space-between">
                <Typography typographyType="h1" displayType="contents">
                  12
                </Typography>
                <DashboardCardDetailsLink to={ROUTES.bookings}>View</DashboardCardDetailsLink>
              </Row>
            </DashboardCard>
            <DashboardCard title="Canceled">
              <Row jc="space-between">
                <Typography typographyType="h1" displayType="contents">
                  4
                </Typography>
                <DashboardCardDetailsLink to={ROUTES.bookings}>View</DashboardCardDetailsLink>
              </Row>
            </DashboardCard>
          </StyledDashboardCardsRow>
        </StyledSection>
      </ContentWrapper>
    </>
  );
};
