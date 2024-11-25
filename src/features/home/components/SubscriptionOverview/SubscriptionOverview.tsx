import React from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import EmailChart from "./EmailChart";
import SMSChart from "./SMSChart";
import SubscriptionBookingChart from "./SubscriptionBookingsChart";
import SubscriptionDashboardCard from "./SubscriptionDashboardCard";

const SubscriptionOverview = () => {
  const { t } = useTranslation();
  const project = useRecoilValue(selectedProjectSelector);

  if (!project) return null;

  const percents =
    project.bookingsLimit !== null
      ? Math.floor(((project.bookingsLimit ?? 0) / project.subscriptionPlan.bookingsLimit) * 100)
      : 0;

  return (
    <>
      <Box mb={2.5} mt={5}>
        <Typography typographyType="h2" as="h2">
          {t("common:dashboard.subscription-overview")}
        </Typography>
      </Box>
      <Row jc="flex-start" gap="20px">
        <SubscriptionDashboardCard label="Plan" text={project.subscriptionPlan.title} secondaryText="" />
        <SubscriptionDashboardCard
          label={t("common:dashboard.bookings-limit-per-month")}
          text={`${percents}%`}
          secondaryText={`${project.bookingsLimit ?? 0}/${project.subscriptionPlan.bookingsLimit}`}
        />
      </Row>
      <SubscriptionBookingChart />
      <Row jc="flex-start" gap="20px" mt={2.5} mb={5}>
        <EmailChart />
        <SMSChart />
      </Row>
    </>
  );
};

export default SubscriptionOverview;
