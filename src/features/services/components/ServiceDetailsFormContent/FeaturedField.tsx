import React from "react";
import BoolField from "components/forms/BoolField";
import { Box } from "components/layout/Box";
import { useTranslation } from "react-i18next";
import OnlyServiceListInfo from "./OnlyServiceListInfo";

const FeaturedField = () => {
  const { t } = useTranslation();
  return (
    <div style={{ marginBottom: "20px" }}>
      <BoolField name="featured" label={t("services.featured-field")} />
      <Box ml={3} mt={1}>
        <OnlyServiceListInfo />
      </Box>
    </div>
  );
};

export default FeaturedField;
