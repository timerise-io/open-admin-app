import React, { useState } from "react";
import { Card } from "components/Card";
import { ContextButton } from "components/ContextButton";
import StyledInput from "components/StyledInput";
import StyledLabel from "components/StyledLabel";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { DisplayType, ViewConfig } from "features/services/api/mutations/models";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { ChangeTypeModal } from "./components";

interface ServiceDisplayViewProps {
  onConfirm: () => void;
}

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

const StyledContextButton = styled(ContextButton)`
  ${({ theme }) => {
    return css`
      color: ${theme.colors.error};
    `;
  }}
`;

const StyledDisplayTypeInput = styled(StyledInput)`
  width: 100%;
`;

export const ServiceDisplayView = ({ onConfirm }: ServiceDisplayViewProps) => {
  const { t } = useTranslation();
  const service = useRecoilValue(selectedServiceAtom);
  const [field, ,] = useField<ViewConfig>({ name: "viewConfig" });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!service || !service.viewConfig.displayType) return null;

  const displayTypeMap = {
    [DisplayType.DAYS as string]: t("services.days-view"),
    [DisplayType.CALENDAR as string]: t("services.calendar-view"),
    [DisplayType.LIST as string]: t("services.event-view"),
    [DisplayType.PREORDER as string]: t("services.preorder-view"),
  };

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("services.view")}
      </StyledHeader>
      <Card>
        <Typography typographyType="body" as="span">
          {t("services.view-info")}
        </Typography>
        <Row mt={2} ai="end" gap="8px">
          <StyledLabel>{t("services.current-view")}</StyledLabel>
        </Row>
        <Row ai="end" gap="8px">
          <StyledDisplayTypeInput value={displayTypeMap[field.value.displayType]} disabled />
          {/* <FormSelect
            label="Current view"
            name="viewConfig.displayType"
            value={field.value.displayType}
            options={{
              [DisplayType.DAYS as string]: "Days view",
              [DisplayType.CALENDAR as string]: "Calendar view",
              [DisplayType.LIST as string]: "Events view",
            }}
            disabled={isTypeSelectDisabled}
          /> */}
          <StyledContextButton
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            role="button"
          >
            {t("change")}
          </StyledContextButton>
        </Row>
      </Card>
      <ChangeTypeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        displayType={field.value.displayType}
        onConfirm={onConfirm}
      />
    </>
  );
};
