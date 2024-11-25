import React from "react";
// import { Row } from "components/layout/Row";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { useTranslation } from "react-i18next";
// import BookingsDashboardCard from "../MyBookings/BookingsDashboardCard";
import ProjectBookingsChart from "./ProjectBookingsChart";

const ProjectBookings = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box mb={2.5} mt={5}>
        <Typography typographyType="h2" as="h2">
          {t("common:dashboard.project-bookings")}
        </Typography>
      </Box>
      {/* <Row gap="20px" jc="flex-start">
        <BookingsDashboardCard range="today" count={1} />
        <BookingsDashboardCard range="todayUpcoming" count={2} />
        <BookingsDashboardCard range="tomorrow" count={3} />
        <BookingsDashboardCard range="weekUpcoming" count={4} />
      </Row> */}
      <ProjectBookingsChart />
    </>
  );
};

export default ProjectBookings;
