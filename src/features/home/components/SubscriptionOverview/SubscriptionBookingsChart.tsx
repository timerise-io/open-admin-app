import React from "react";
import { Typography } from "components/Typography";
import { format } from "date-fns";
import { subscriptionChartSelector } from "features/home/model/subscriptionChartSelector";
import { TFunction, useTranslation } from "react-i18next";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 345px;
  width: 896px;
  max-height: 345px;
  max-width: 896px;
  margin-top: 20px;
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
  padding: 20px 20px 25px 20px;
  height: 345px;
  width: 896px;
  max-height: 345px;
  max-width: 896px;

  .recharts-text {
    font-size: 13px;
  }
  .recharts-tooltip-wrapper {
    outline: 0;
  }
`;

const TooltipWrapper = styled.div`
  width: 100%;
  background: #fff;
  padding: 10px;
  border: 1px solid #f6f6f6;
  box-shadow: 0px 1px 2px rgb(0 0 0 / 8%);
  border-radius: 4px;
  outline: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  .label {
    margin-bottom: 8px;
  }

  .label,
  .tooltip-item {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #333333;
  }

  .tooltip-item {
  }
`;

const renderTooltip = ({
  active,
  payload,
  label,
  t,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
  t?: TFunction<"translation", undefined>;
}) => {
  if (active && payload && payload.length && t) {
    return (
      <TooltipWrapper>
        <span className="label">{`${payload[0].payload.dateTime}.${format(new Date(), "MM.yyyy")}`}</span>
        {payload.map((item: any) => {
          return (
            <div key={`tooltip-item-$${item.dataKey}`} className="tooltip-item">
              {t("common:dashboard.bookings-left")} {item.value}
            </div>
          );
        })}
      </TooltipWrapper>
    );
  }

  return null;
};

const SubscriptionBookingChart = () => {
  const { t } = useTranslation();
  const adminDashboardData = useRecoilValue(subscriptionChartSelector);
  const today = new Date().getDate();
  const data = adminDashboardData.map((item, index) => {
    return {
      ...item,
      BOOKING_CREATED: index >= today ? null : item.BOOKING_CREATED,
    };
  });

  return (
    <Wrapper>
      <Typography typographyType="label" as="span">
        {t("common:dashboard.bookings-usage")}
      </Typography>
      <StyledCard>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis dataKey="dateTime" height={20} interval={0} />
            <YAxis dataKey="BOOKING_CREATED" width={50} allowDecimals={false} />
            <Tooltip content={renderTooltip} />
            <Area type="monotone" dataKey="BOOKING_CREATED" stroke="#3a80f8" fill="#3a80f8" />
          </AreaChart>
        </ResponsiveContainer>
      </StyledCard>
    </Wrapper>
  );
};

export default SubscriptionBookingChart;
