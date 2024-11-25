import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Slot } from "features/services/model/serviceSlotStrategie";
import { useTranslation } from "react-i18next";
import AddExceptionModal from "./AddExceptionModal";
import { CreateExceptionSlotValues } from "./ExceptionForm";
import ExceptionsList from "./ExceptionsList";

interface ExceptionsSectionProps {
  title?: string;
  slots: Array<Slot>;
  onDeleteConfirm: (slotId: string) => void;
  onCreateException: (values: CreateExceptionSlotValues) => void;
  disabled?: boolean;
}

const ExceptionsSection = ({ slots, onDeleteConfirm, onCreateException, disabled = false }: ExceptionsSectionProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Typography typographyType="h3" as="h3">
        {t("common:exceptions")}
      </Typography>
      <Card>
        <Column ai="flex-start" gap="20px">
          <Typography typographyType="body" as="span">
            {disabled ? t("common:exceptions-to-availaiblity") : t("common:add-exceptions-to-availaiblity")}
          </Typography>
          {!disabled && <AddExceptionModal onSubmit={onCreateException} />}
          <ExceptionsList slots={slots} onDeleteConfirm={onDeleteConfirm} disabled={disabled} />
        </Column>
      </Card>
    </>
  );
};

export default ExceptionsSection;
