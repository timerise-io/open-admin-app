import React from "react";
import { Typography } from "components/Typography";
import { myTodayBookingChartSelector } from "features/home/model/myTodayBookingChartSelector";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ContentType } from "recharts/types/component/DefaultLegendContent";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
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
  width: 896px;
  height: 345px;

  .recharts-text {
    font-size: 13px;
  }
  .recharts-tooltip-wrapper {
    outline: 0;
  }
`;

const LegendWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

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
      background: #9cbffb;
      border-color: #3a80f8;
    }
    .item-accepted {
      background: #99d3a9;
      border-color: #34a853;
    }
    .item-canceled {
      background: #f4a19a;
      border-color: #ea4335;
    }
  }
`;

const renderLegend: ContentType = (props) => {
  const { payload } = props;
  return (
    <LegendWrapper>
      <ul>
        {payload?.map((entry, index) => (
          <li key={`item-${index}`}>
            <div className={`item-${entry.value}`} />
            {entry.value}
          </li>
        ))}
      </ul>
    </LegendWrapper>
  );
};

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
      background: #9cbffb;
      border-color: #3a80f8;
    }
    .item-accepted {
      background: #99d3a9;
      border-color: #34a853;
    }
    .item-canceled {
      background: #f4a19a;
      border-color: #ea4335;
    }
  }
`;

const renderTooltip = ({ active, payload, label }: { active?: boolean; payload?: any; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipWrapper>
        <span className="label">{`${payload[0].payload.hour}:00 - ${payload[0].payload.hour + 1}:00`}</span>
        {payload.map((item: any) => {
          return (
            <div key={`tooltip-item-$${item.dataKey}`} className="tooltip-item">
              {item.dataKey}: {item.value}
            </div>
          );
        })}
      </TooltipWrapper>
    );
  }

  return null;
};

const TodayBookingsChart = () => {
  const { t } = useTranslation();
  const values = useRecoilValue(myTodayBookingChartSelector);

  return (
    <Wrapper>
      <Typography typographyType="label" as="span">
        {t("common:dashboard.todays-summary")}
      </Typography>
      <StyledCard>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={values}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fill: "#333333" }} tickLine={{ stroke: "#333333" }} />
            <YAxis tick={{ fill: "#333333" }} tickLine={{ stroke: "#333333" }} allowDecimals={false} />
            <Tooltip cursor={{ fill: "#f6f6f6" }} content={renderTooltip} />
            <Legend content={renderLegend} />
            <Bar dataKey="accepted" stackId="a" fill="#99D3A9" stroke="#34A853" />
            <Bar dataKey="new" stackId="a" fill="#9CBFFB" stroke="#3A80F8" />
            <Bar dataKey="canceled" fill="#F4A19A" stroke="#EA4335" />
          </BarChart>
        </ResponsiveContainer>
      </StyledCard>
    </Wrapper>
  );
};

export default TodayBookingsChart;
