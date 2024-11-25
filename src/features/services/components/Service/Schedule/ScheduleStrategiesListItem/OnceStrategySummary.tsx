import React, { useMemo } from "react";
import { Typography } from "components/Typography";
import { ServiceOnceStrategy } from "features/services/model/serviceSlotStrategie";
import { ServiceOnceStrategyFields } from "features/services/model/strategies";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { useTranslation } from "react-i18next";

const RangeStrategy = ({ strategy }: { strategy: ServiceOnceStrategyFields }) => {
  const { format: formatProjectOffset } = useTimezoneFormat();
  const isAllDays = useMemo(() => {
    return strategy && formatProjectOffset(strategy.end, "H:mm") === "23:59";
  }, [strategy, formatProjectOffset]);
  const dateFormat = isAllDays ? "d MMM yyyy" : "d MMM yyyy H:mm";
  const startDateTime = strategy.start && formatProjectOffset(strategy.start.toString(), dateFormat);
  const endDateTime = strategy.end && formatProjectOffset(strategy.end.toString(), dateFormat);

  return (
    <>
      <Typography typographyType="body" as="div" weight="700">
        {`${startDateTime} - ${endDateTime}`}
      </Typography>
    </>
  );
};

export interface StrategySummaryProps {
  strategy: ServiceOnceStrategy;
}

export const OnceStrategySummary = ({ strategy }: StrategySummaryProps) => {
  const { t } = useTranslation();
  const quantityRow = (
    <Typography typographyType="body" as="span">
      {`${strategy.slotQuantity} ${t("services.bookings-per-event")}`}
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
