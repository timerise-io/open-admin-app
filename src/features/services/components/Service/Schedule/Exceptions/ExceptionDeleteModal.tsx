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
import { useDeleteServiceSlot } from "features/services/hooks/useDeleteServiceSlot";
import { Slot } from "features/services/model/serviceSlotStrategie";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { IconX } from "@tabler/icons";
import ExceptionSummary from "./ExceptionSummary";

interface ExceptionDeleteModalProps {
  slot: Slot;
  open: boolean;
  onClose: () => void;
}

const ExceptionDeleteModal = ({ slot, open, onClose }: ExceptionDeleteModalProps) => {
  const { t } = useTranslation();
  const { mutation } = useDeleteServiceSlot();
  const service = useRecoilValue(selectedServiceAtom);

  return (
    <>
      <BaseModal open={open} customWidth={400}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">Delete exception</Typography>
            <IconButton onClick={() => onClose()} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
          <BaseModalControlsWrapper>
            <Typography typographyType="body">
              Are you sure you want to <strong>delete</strong> this exception?
            </Typography>
            <ExceptionSummary slot={slot} />
          </BaseModalControlsWrapper>
        </BaseModalUpperContentWrapper>

        <ActionRow>
          <Button buttonType="secondary" type="button" fillWidth={false} onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            buttonType="danger"
            fillWidth={false}
            type="button"
            onClick={() => {
              if (service)
                mutation({
                  projectId: service?.project.projectId,
                  serviceId: service.serviceId,
                  slotId: slot.slotId,
                });
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
