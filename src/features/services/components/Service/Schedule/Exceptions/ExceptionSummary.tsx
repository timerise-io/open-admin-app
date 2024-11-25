import React from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Slot } from "features/services/model/serviceSlotStrategie";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";

interface ExceptionSummaryProps {
  slot: Slot;
}

const ExceptionSummary = ({ slot }: ExceptionSummaryProps) => {
  const { format } = useTimezoneFormat();

  return (
    <Column ai="flex-start">
      <Typography typographyType="body" as="span">
        {format(slot.dateTimeFrom, "EEEE d MMMM yyyy")}
      </Typography>
      <Typography typographyType="body" as="span">
        {format(slot.dateTimeFrom, "H:mm")}
        {" - "}
        {format(slot.dateTimeTo, "H:mm")}
      </Typography>
    </Column>
  );
};

export default ExceptionSummary;
