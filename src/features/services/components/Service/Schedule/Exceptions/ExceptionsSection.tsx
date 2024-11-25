import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { useTranslation } from "react-i18next";
import AddExceptionModal from "./AddExceptionModal";
import ExceptionsList from "./ExceptionsList";

const ExceptionsSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography typographyType="h3" as="h3">
        {t("exceptions")}
      </Typography>
      <Card>
        <Column ai="flex-start" gap="20px">
          <Typography typographyType="body" as="span">
            {t("add-exceptions-to-availaiblity")}
          </Typography>
          <AddExceptionModal />
          <ExceptionsList />
        </Column>
      </Card>
    </>
  );
};

export default ExceptionsSection;
