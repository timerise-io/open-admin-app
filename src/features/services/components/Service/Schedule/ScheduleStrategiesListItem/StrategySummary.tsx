import React from "react";
import { Typography } from "components/Typography";
import { format } from "date-fns";
import {
  ServiceSlotStrategy,
  ServiceSlotStrategyOnceFields,
  ServiceSlotStrategyRangeFields,
} from "features/services/model/serviceSlotStrategie";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { parse, toSeconds } from "iso8601-duration";
import { useTranslation } from "react-i18next";
import { getBreakTime, getDays, getDurationSummaryText } from "./helpers";

const RangeStrategy = ({ strategy }: { strategy: ServiceSlotStrategyRangeFields }) => {
  const { format: formatProjectOffset } = useTimezoneFormat();
  const startDateTime = strategy.startDateTime && formatProjectOffset(strategy.startDateTime, "d MMM yyyy");
  const endDateTime = formatProjectOffset(strategy.discontinueStrategy.endDateTime.toString(), "d MMM yyyy");

  return (
    <>
      <Typography typographyType="body" as="div" weight="700">
        {`${startDateTime} - ${endDateTime}`}
      </Typography>
      <Typography typographyType="body" as="span">
        {getDays(strategy.daysOfWeek)}
      </Typography>
      <Typography typographyType="body" as="span">
        {format(new Date(`1900-01-01T${("00" + strategy.timeFrom).slice(-5)}`), "H:mm")}
        {" - "}
        {format(new Date(`1900-01-01T${("00" + strategy.timeTo).slice(-5)}`), "H:mm")}
      </Typography>
    </>
  );
};

const OnceStrategy = ({ strategy }: { strategy: ServiceSlotStrategyOnceFields }) => {
  const { format: formatProjectOffset } = useTimezoneFormat();

  return (
    <>
      <Typography typographyType="body" as="span" weight="700">
        {formatProjectOffset(strategy.slotDateTime, "d MMM yyyy")}
      </Typography>
      <Typography typographyType="body" as="span">
        {formatProjectOffset(strategy.slotDateTime, "EEEE")}
      </Typography>
      <Typography typographyType="body" as="span">
        {formatProjectOffset(strategy.slotDateTime, "H:mm")}
      </Typography>
    </>
  );
};

interface StrategySummaryProps {
  strategy: ServiceSlotStrategy;
}

const StrategySummary = ({ strategy }: StrategySummaryProps) => {
  const { t } = useTranslation();
  const duration = (toSeconds(parse(strategy.slotDuration)) / 60).toFixed(0);
  const breakTime = getBreakTime({ slotInterval: strategy.slotInterval, duration });
  const durationSummaryText = getDurationSummaryText({
    duration,
    breakTime,
    quantity: strategy.slotQuantity,
    t,
  });

  const durationRow = (
    <Typography typographyType="body" as="span">
      {durationSummaryText}
    </Typography>
  );

  const strategyData =
    strategy.strategyType === "RANGE" ? <RangeStrategy strategy={strategy} /> : <OnceStrategy strategy={strategy} />;

  return (
    <>
      {strategyData}
      {durationRow}
    </>
  );
};

export default StrategySummary;
