import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { useTranslation } from "react-i18next";
import { AddLabelModal, LabelsList } from "./components";

export const ProjectLabels = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography typographyType="h3" as="h3">
        {t("labels")}
      </Typography>
      <Card>
        <Column ai="flex-start" gap="20px">
          <Typography typographyType="body" as="span">
            {t("settings.add-label-info")}
          </Typography>
          <AddLabelModal />
          <LabelsList />
        </Column>
      </Card>
    </>
  );
};
