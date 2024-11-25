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
import { useDeleteServiceRangeStrategy } from "features/services/hooks/useDeleteServiceRangeStrategy";
import { ServiceRangeStrategy } from "features/services/model/serviceSlotStrategie";
import styled from "styled-components";
import { IconAlertCircle, IconX } from "@tabler/icons";
import { RangeStrategySummary } from "./RangeStrategySummary";

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

const CancelBookingsInfo = () => {
  return (
    <CancelBookingsInfoWrapper>
      <IconAlertCircle className="icon" size={20} />
      <Typography typographyType="body" as="span">
        This action will delete all unbooked slots. Already booked slots won’t be canceled.
      </Typography>
    </CancelBookingsInfoWrapper>
  );
};

interface StrategyDeleteModalProps {
  strategy: ServiceRangeStrategy;
  open: boolean;
  onClose: () => void;
}

export const RangeStrategyDeleteModal = ({ strategy, open, onClose }: StrategyDeleteModalProps) => {
  const { mutation } = useDeleteServiceRangeStrategy();

  return (
    <>
      <BaseModal open={open} customWidth={600}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">Delete availability</Typography>
            <IconButton onClick={() => onClose()} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
          <BaseModalControlsWrapper>
            <Typography typographyType="body">
              Are you sure you want to <strong>delete</strong> this availability?
            </Typography>
            <RangeStrategySummary strategy={strategy} />
            <CancelBookingsInfo />
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
              mutation({
                projectId: strategy.projectId,
                serviceId: strategy.serviceId,
                strategyId: strategy.strategyId,
              });
              onClose();
            }}
          >
            Delete availability
          </Button>
        </ActionRow>
      </BaseModal>
    </>
  );
};
