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
import { ServiceDayRangeStrategyCreateRangeVariables } from "features/services/api/mutations/models";
import { useUpdateServiceDayRangeStrategy } from "features/services/hooks/useUpdateServiceDayRangeStrategy";
import { ServiceDayRangeStrategy } from "features/services/model/serviceSlotStrategie";
import { useTranslation } from "react-i18next";
import { IconX } from "@tabler/icons";
import { AddDayRangeScheduleForm } from "../Forms";

interface StrategyEditModalProps {
  strategy: ServiceDayRangeStrategy;
  open: boolean;
  onClose: () => void;
}

export const DayRangeStrategyEditModal = ({ strategy, open, onClose }: StrategyEditModalProps) => {
  const { t } = useTranslation();
  const { mutation } = useUpdateServiceDayRangeStrategy();

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
        <AddDayRangeScheduleForm
          onSubmit={(values: ServiceDayRangeStrategyCreateRangeVariables) => {
            mutation({ strategyId: strategy.strategyId, ...values });
            onClose();
          }}
          strategy={strategy}
        >
          {actions}
        </AddDayRangeScheduleForm>
      </BaseModal>
    </>
  );
};
