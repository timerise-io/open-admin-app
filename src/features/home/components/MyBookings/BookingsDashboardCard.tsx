import React from "react";
import { Typography } from "components/Typography";
import { HostDashboardRanges } from "features/home/model/hostDashboard";
import { TFunction, useTranslation } from "react-i18next";
import styled from "styled-components";

const Wrapper = styled.div`
  flex-grow: 1;
  max-width: 209px;
  /* cursor: pointer; */
`;

const StyledCard = styled.div`
  margin-top: 4px;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 23px 0 20px;
`;

const CountTypography = styled(Typography)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
`;

type RANGE_LABELS_TYPE = Record<HostDashboardRanges, (t: TFunction) => string>;

const RANGE_LABELS: RANGE_LABELS_TYPE = {
  today: (t) => t("common:dashboard.total-today"),
  todayUpcoming: (t) => t("common:dashboard.upcoming-today"),
  tomorrow: (t) => t("common:dashboard.upcoming-tomorrow"),
  weekUpcoming: (t) => t("common:dashboard.upcoming-this-week"),
  todayAll: (t) => t("common:dashboard.total-all"),
};

interface BookingsDashboardCardProps {
  range: HostDashboardRanges;
  count: number;
}

const BookingsDashboardCard: React.FC<BookingsDashboardCardProps> = ({ range, count }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Typography typographyType="label" as="span">
        {RANGE_LABELS[range](t)}
      </Typography>
      <StyledCard>
        <CountTypography typographyType="body" as="span">
          {count}
        </CountTypography>
        {/* <IconChevronRight size={23} /> */}
      </StyledCard>
    </Wrapper>
  );
};

export default BookingsDashboardCard;
