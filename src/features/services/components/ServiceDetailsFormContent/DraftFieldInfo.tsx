import React from "react";
import { Typography } from "components/Typography";
import { useTranslation } from "react-i18next";

const DraftFieldInfo = () => {
  const { t } = useTranslation();
  return (
    <Typography typographyType="label" as="span">
      {t("services.draft-field-info")}
    </Typography>
  );
};

export default DraftFieldInfo;
