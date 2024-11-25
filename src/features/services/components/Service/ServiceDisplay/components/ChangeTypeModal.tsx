import React from "react";
import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import FormSelect from "components/forms/FormSelect";
import { Row } from "components/layout/Row";
import BaseModal, {
  ActionRow,
  BaseModalControlsWrapper,
  BaseModalHeaderWrapper,
  BaseModalUpperContentWrapper,
} from "components/modals/BaseModal";
import { DisplayType } from "features/services/api/mutations/models";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconAlertCircle, IconX } from "@tabler/icons";

const InfoWrapper = styled.div`
  margin-top: 20px;
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

interface ChangeTypeModalProps {
  open: boolean;
  onClose: () => void;
  displayType: string;
  onConfirm: () => void;
}

export const ChangeTypeModal = ({ open, onClose, displayType, onConfirm }: ChangeTypeModalProps) => {
  const { t } = useTranslation();
  return (
    <>
      <BaseModal open={open} customWidth={600}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">{t("services.change-service-type")}</Typography>
            <IconButton onClick={() => onClose()} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
          <BaseModalControlsWrapper>
            <Typography typographyType="body">{t("services.change-service-info")}</Typography>
            <Row ai="end" gap="8px" mt={2}>
              <FormSelect
                label={t("services.new-service-type")}
                name="viewConfig.displayType"
                value={displayType}
                options={{
                  [DisplayType.DAYS as string]: t("services.days-view"),
                  [DisplayType.CALENDAR as string]: t("services.calendar-view"),
                  [DisplayType.LIST as string]: t("services.event-view"),
                  [DisplayType.PREORDER as string]: t("services.preorder-view"),
                }}
              />
            </Row>
            <InfoWrapper>
              <IconAlertCircle className="icon" size={20} />
              <Typography typographyType="body" as="span">
                {t("services.change-service-warning")}
              </Typography>
            </InfoWrapper>
          </BaseModalControlsWrapper>
        </BaseModalUpperContentWrapper>

        <ActionRow>
          <Button buttonType="secondary" type="button" fillWidth={false} onClick={() => onClose()}>
            {t("discard")}
          </Button>
          <Button
            buttonType="danger"
            fillWidth={false}
            type="button"
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            {t("change-now")}
          </Button>
        </ActionRow>
      </BaseModal>
    </>
  );
};
