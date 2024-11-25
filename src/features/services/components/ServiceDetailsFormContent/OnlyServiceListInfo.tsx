import React from "react";
import { Typography } from "components/Typography";
import { useTranslation } from "react-i18next";

const OnlyServiceListInfo = () => {
  const { t } = useTranslation();
  return (
    <Typography typographyType="label" as="span">
      {t("services.featured-field-info")}
    </Typography>
  );
};

export default OnlyServiceListInfo;
