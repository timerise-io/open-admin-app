import React from "react";
import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import BaseModal, {
  ActionRow,
  BaseModalControlsWrapper,
  BaseModalHeaderWrapper,
  BaseModalUpperContentWrapper,
} from "components/modals/BaseModal";
import { Slot } from "features/services/model/serviceSlotStrategie";
import { useTranslation } from "react-i18next";
import { IconX } from "@tabler/icons";
import ExceptionSummary from "./ExceptionSummary";

interface ExceptionDeleteModalProps {
  slot: Slot;
  open: boolean;
  onClose: () => void;
  onConfirm: (slotId: string) => void;
}

const ExceptionDeleteModal = ({ slot, open, onClose, onConfirm }: ExceptionDeleteModalProps) => {
  const { t } = useTranslation();
  return (
    <>
      <BaseModal open={open} customWidth={400}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">{t("delete-exception")}</Typography>
            <IconButton onClick={() => onClose()} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
          <BaseModalControlsWrapper>
            <Typography typographyType="body">{t("delete-exception-info")}</Typography>
            <ExceptionSummary slot={slot} />
          </BaseModalControlsWrapper>
        </BaseModalUpperContentWrapper>

        <ActionRow>
          <Button buttonType="secondary" type="button" fillWidth={false} onClick={() => onClose()}>
            {t("cancel")}
          </Button>
          <Button
            buttonType="danger"
            fillWidth={false}
            type="button"
            onClick={() => {
              onConfirm(slot.slotId);
              onClose();
            }}
          >
            {t("delete-exception")}
          </Button>
        </ActionRow>
      </BaseModal>
    </>
  );
};

export default ExceptionDeleteModal;
