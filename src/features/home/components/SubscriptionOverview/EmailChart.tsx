import React from "react";
import { Typography } from "components/Typography";
import { format } from "date-fns";
import { subscriptionChartSelector } from "features/home/model/subscriptionChartSelector";
import { TFunction, useTranslation } from "react-i18next";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 240px;
  width: 438px;
  max-height: 240px;
  max-width: 438px;
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
  height: 240px;
  width: 438px;
  max-height: 240px;
  max-width: 438px;

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

  & > ul {
    margin: 0;
    display: flex;
    gap: 15px;
  }

  & > ul > li {
    all: unset;
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    color: #333333;

    .item-new,
    .item-accepted,
    .item-canceled {
      width: 13px;
      height: 13px;
      border-width: 1px;
      border-style: solid;
    }

    .item-new {
      background: #f5f9ff;
      border-color: #3a80f8;
    }
    .item-accepted {
      background: #f5fbf6;
      border-color: #34a853;
    }
    .item-canceled {
      background: #fef6f5;
      border-color: #ea4335;
    }
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
              {t("common:dashboard.emails-sent")} {item.value}
            </div>
          );
        })}
      </TooltipWrapper>
    );
  }

  return null;
};

const EmailChart = () => {
  const { t } = useTranslation();
  const adminDashboardData = useRecoilValue(subscriptionChartSelector);

  return (
    <Wrapper>
      <Typography typographyType="label" as="span">
        {t("common:dashboard.emails-notifications")}
      </Typography>
      <StyledCard>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={adminDashboardData}>
            <XAxis dataKey="dateTime" height={20} />
            <YAxis dataKey="EMAIL_SENT" width={20} allowDecimals={false} />
            <Tooltip content={renderTooltip} />
            <Line type="monotone" dataKey="EMAIL_SENT" stroke="#3a80f8" strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </StyledCard>
    </Wrapper>
  );
};

export default EmailChart;
