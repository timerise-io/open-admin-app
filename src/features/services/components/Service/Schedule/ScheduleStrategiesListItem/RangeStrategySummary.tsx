import React from "react";
import { Typography } from "components/Typography";
import { ServiceRangeStrategy } from "features/services/model/serviceSlotStrategie";
import { ServiceDaysStrategyFields } from "features/services/model/strategies";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { parse, toSeconds } from "iso8601-duration";
import { useTranslation } from "react-i18next";
import { getBreakTime, getDays, getDurationSummaryText } from "./helpers";

const RangeStrategy = ({ strategy }: { strategy: ServiceDaysStrategyFields }) => {
  const { t } = useTranslation();
  const { format: formatProjectOffset } = useTimezoneFormat();
  const now = new Date();
  const startDateTime = strategy.start.dateTime
    ? formatProjectOffset(strategy.start.dateTime.toString(), "d MMM yyyy")
    : formatProjectOffset(now.toISOString(), "d MMM yyyy");
  const endDateTime = strategy.end.dateTime
    ? formatProjectOffset(strategy.end.dateTime.toString(), "d MMM yyyy")
    : t("services.never");

  return (
    <>
      <Typography typographyType="body" as="div" weight="700">
        {`${startDateTime} - ${endDateTime}`}
      </Typography>
      <Typography typographyType="body" as="span">
        {getDays(strategy.daysOfWeek)}
      </Typography>
      <Typography typographyType="body" as="span">
        {strategy.start.time}
        {/* {format(new Date(`1900-01-01T${("00" + strategy.start.time).slice(-5)}`), "H:mm")} */}
        {" - "}
        {strategy.end.time}
        {/* {format(new Date(`1900-01-01T${("00" + strategy.end.time).slice(-5)}`), "H:mm")} */}
      </Typography>
    </>
  );
};

export interface StrategySummaryProps {
  strategy: ServiceRangeStrategy;
}

export const RangeStrategySummary = ({ strategy }: StrategySummaryProps) => {
  const { t } = useTranslation();
  const duration = strategy.slotDuration && (toSeconds(parse(strategy.slotDuration)) / 60).toFixed(0);
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

  const strategyData = <RangeStrategy strategy={strategy} />;

  return (
    <>
      {strategyData}
      {durationRow}
    </>
  );
};
