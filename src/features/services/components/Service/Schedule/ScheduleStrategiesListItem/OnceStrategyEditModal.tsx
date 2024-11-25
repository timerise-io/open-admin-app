import React from "react";
import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import BaseModal, {
  ActionButtonsBaseWrapper,
  ActionRowBase,
  BaseModalControlsWrapper,
  BaseModalHeaderWrapper,
  BaseModalUpperContentWrapper,
} from "components/modals/BaseModal";
import ProjectTimezone from "features/project/components/ProjectTimezone";
import { ServiceOnceStrategyCreateRangeVariables } from "features/services/api/mutations/models";
import { useUpdateServiceOnceStrategy } from "features/services/hooks/useUpdateServiceOnceStrategy";
import { ServiceOnceStrategy } from "features/services/model/serviceSlotStrategie";
import { useTranslation } from "react-i18next";
import { IconX } from "@tabler/icons";
import { AddOnceScheduleForm } from "../Forms";

interface StrategyEditModalProps {
  strategy: ServiceOnceStrategy;
  open: boolean;
  onClose: () => void;
}

export const OnceStrategyEditModal = ({ strategy, open, onClose }: StrategyEditModalProps) => {
  const { t } = useTranslation();
  const { mutation } = useUpdateServiceOnceStrategy();

  const actions = (
    <ActionRowBase>
      <ProjectTimezone />
      <ActionButtonsBaseWrapper>
        <Button buttonType="secondary" type="button" fillWidth={false} onClick={() => onClose()}>
          {t("cancel")}
        </Button>
        <Button buttonType="primary" fillWidth={false} type="submit">
          {t("save")}
        </Button>
      </ActionButtonsBaseWrapper>
    </ActionRowBase>
  );

  return (
    <>
      <BaseModal open={open}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">{t("edit-availability")}</Typography>
            <IconButton onClick={() => onClose()} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
          <BaseModalControlsWrapper></BaseModalControlsWrapper>
        </BaseModalUpperContentWrapper>
        <AddOnceScheduleForm
          onSubmit={(values: ServiceOnceStrategyCreateRangeVariables) => {
            mutation({ strategyId: strategy.strategyId, ...values });
            onClose();
          }}
          strategy={strategy}
        >
          {actions}
        </AddOnceScheduleForm>
      </BaseModal>
    </>
  );
};
