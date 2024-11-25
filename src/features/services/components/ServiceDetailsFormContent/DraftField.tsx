import React from "react";
import BoolField from "components/forms/BoolField";
import { Box } from "components/layout/Box";
import { useTranslation } from "react-i18next";
import DraftFieldInfo from "./DraftFieldInfo";

const DraftField = () => {
  const { t } = useTranslation();
  return (
    <div>
      <BoolField name="draft" label={t("services.draft-field")} />
      <Box ml={3} mt={1}>
        <DraftFieldInfo />
      </Box>
    </div>
  );
};

export default DraftField;
