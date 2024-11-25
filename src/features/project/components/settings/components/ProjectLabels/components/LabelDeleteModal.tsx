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
import { useProjectUpdate } from "features/project/hooks/useProjectUpdate";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { Trans, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { IconX } from "@tabler/icons";
import { LabelDeleteWarning } from "./LabelDeleteWarning";

interface LabelDeleteModalProps {
  label: string;
  labels: string[];
  open: boolean;
  onClose: () => void;
}

export const LabelDeleteModal = ({ label, labels, open, onClose }: LabelDeleteModalProps) => {
  const { t } = useTranslation();
  const { mutation } = useProjectUpdate();
  const project = useRecoilValue(selectedProjectSelector);

  return (
    <>
      <BaseModal open={open} customWidth={600}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">{t("settings.delete-label")}</Typography>
            <IconButton onClick={() => onClose()} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
          <BaseModalControlsWrapper>
            <Typography typographyType="body">
              <Trans i18nKey="settings.delete-label-info" components={{ strong: <strong /> }} values={{ label }} />
            </Typography>
            <LabelDeleteWarning />
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
              if (project)
                mutation({
                  projectId: project.projectId,
                  labels: labels.filter((l) => l !== label),
                });
              onClose();
            }}
          >
            {t("settings.delete-label")}
          </Button>
        </ActionRow>
      </BaseModal>
    </>
  );
};
