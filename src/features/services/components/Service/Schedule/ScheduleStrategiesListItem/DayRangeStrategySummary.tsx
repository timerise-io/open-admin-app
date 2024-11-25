import React from "react";
import { Typography } from "components/Typography";
import { ServiceDayRangeStrategy } from "features/services/model/serviceSlotStrategie";
import { ServiceDayRangeStrategyFields } from "features/services/model/strategies";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { useTranslation } from "react-i18next";
import { getDays } from "./helpers";

const RangeStrategy = ({ strategy }: { strategy: ServiceDayRangeStrategyFields }) => {
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
    </>
  );
};

export interface StrategySummaryProps {
  strategy: ServiceDayRangeStrategy;
}

export const DayRangeStrategySummary = ({ strategy }: StrategySummaryProps) => {
  const { t } = useTranslation();
  const quantityRow = (
    <Typography typographyType="body" as="span">
      {`${strategy.slotQuantity} ${t("services.bookings-per-slot")}`}
    </Typography>
  );

  const strategyData = <RangeStrategy strategy={strategy} />;

  return (
    <>
      {strategyData}
      {quantityRow}
    </>
  );
};
