import React from "react";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { HostDashboardRanges } from "features/home/model/hostDashboard";
import { hostDashboardAtom } from "features/home/state/hostDashboardAtom";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import BookingsDashboardCard from "./BookingsDashboardCard";
import TodayBookingsChart from "./TodayBookingsChart";

const CARDS_ORDER: Array<HostDashboardRanges> = ["today", "todayUpcoming", "tomorrow", "weekUpcoming"];

const MyBookings = () => {
  const hostDashboard = useRecoilValue(hostDashboardAtom);
  const { t } = useTranslation();
  return (
    <>
      <Box mb={2.5}>
        <Typography typographyType="h2" as="h2">
          {t("common:dashboard.my-bookings")}
        </Typography>
      </Box>
      <Row gap="20px" jc="flex-start">
        {CARDS_ORDER.map((item) => {
          return (
            <BookingsDashboardCard
              key={`bookings-dashboard-card-${item}`}
              range={item}
              count={hostDashboard[item].length}
            />
          );
        })}
      </Row>
      <TodayBookingsChart />
    </>
  );
};

export default MyBookings;
