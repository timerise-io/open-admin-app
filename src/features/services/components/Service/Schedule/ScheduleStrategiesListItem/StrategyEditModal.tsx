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
import { ServiceSlotStrategyCreateVariables } from "features/services/api/mutations/models";
import { useUpdateServiceSlotsStrategy } from "features/services/hooks/useUpdateServiceSlotsStrateg";
import { ServiceSlotStrategy } from "features/services/model/serviceSlotStrategie";
import { useTranslation } from "react-i18next";
import { IconX } from "@tabler/icons";
import OneTimeForm from "../OneTimeForm";
import RecurringForm from "../RecurringForm";

interface StrategyEditModalProps {
  strategy: ServiceSlotStrategy;
  open: boolean;
  onClose: () => void;
}

const StrategyEditModal = ({ strategy, open, onClose }: StrategyEditModalProps) => {
  const { t } = useTranslation();
  const { mutation } = useUpdateServiceSlotsStrategy();

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
        {strategy.strategyType === "RANGE" ? (
          <RecurringForm
            onSubmit={(values: ServiceSlotStrategyCreateVariables) => {
              mutation({ strategyId: strategy.strategyId, ...values });
              onClose();
            }}
            strategy={strategy}
          >
            {actions}
          </RecurringForm>
        ) : (
          <OneTimeForm
            onSubmit={(values) => {
              mutation({ strategyId: strategy.strategyId, ...values });
              onClose();
            }}
            strategy={strategy}
          >
            {actions}
          </OneTimeForm>
        )}
      </BaseModal>
    </>
  );
};

export default StrategyEditModal;
