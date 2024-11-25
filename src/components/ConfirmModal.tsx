import React, { PropsWithChildren } from "react";
import { ButtonType } from "models/theme";
import styled from "styled-components";
import { IconX } from "@tabler/icons";
import { Button } from "./Button";
import { IconButton } from "./IconButton";
import { Typography } from "./Typography";
import BaseModal, { ActionButtonsBaseWrapper, ActionRow } from "./modals/BaseModal";

const ControlsWrapper = styled.div`
  padding: 15px 20px 20px 20px;
`;

const StyledButton = styled(Button)`
  white-space: nowrap;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0px 20px;
  border-radius: 4px;
`;

interface ConfirmModalProps {
  title: string;
  open?: boolean;
  abortText: string;
  confirmText: string;
  confirmButtonType: ButtonType;
  onClose?: Function;
  onAbort?: Function;
  onConfirm?: Function;
  customWidth?: number;
}

const ConfirmModal: React.FC<PropsWithChildren<ConfirmModalProps>> = ({
  title,
  open,
  abortText,
  confirmText,
  children,
  confirmButtonType,
  onClose,
  onAbort,
  onConfirm,
  customWidth,
}) => {
  return (
    <BaseModal open={open} customWidth={customWidth}>
      <HeaderWrapper>
        <Typography typographyType="h3">{title}</Typography>
        <IconButton onClick={() => onClose && onClose()}>
          <IconX />
        </IconButton>
      </HeaderWrapper>
      <ControlsWrapper>{children}</ControlsWrapper>
      <ActionRow>
        <ActionButtonsBaseWrapper>
          <StyledButton onClick={() => onAbort && onAbort()} buttonType="secondary">
            {abortText}
          </StyledButton>
          <StyledButton onClick={() => onConfirm && onConfirm()} buttonType={confirmButtonType}>
            {confirmText}
          </StyledButton>
        </ActionButtonsBaseWrapper>
      </ActionRow>
    </BaseModal>
  );
};

export default ConfirmModal;
