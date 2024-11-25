import React from "react";
import { Typography } from "components/Typography";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconAlertCircle } from "@tabler/icons";

const CancelBookingsInfoWrapper = styled.div`
  margin-top: 28px;
  margin-bottom: 20px;
  background: #fef6f5;
  border: 1px solid #ea4335;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 12px;
  height: 38px;
  display: flex;
  gap: 8px;

  & > .icon {
    color: #ea4335;
  }
`;

export const LabelDeleteWarning = () => {
  const { t } = useTranslation();

  return (
    <CancelBookingsInfoWrapper>
      <IconAlertCircle className="icon" size={20} />
      <Typography typographyType="body" as="span">
        {t("settings.delete-label-warning")}
      </Typography>
    </CancelBookingsInfoWrapper>
  );
};
