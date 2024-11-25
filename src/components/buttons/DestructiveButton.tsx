import React, { PropsWithChildren, useState } from "react";
import { Button } from "components/Button";
import ConfirmModal from "components/ConfirmModal";
import { Box } from "components/layout/Box";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledButton = styled(Button)`
  white-space: nowrap;
`;

const StyledContextButton = styled(Button)`
  white-space: nowrap;

  background: unset;
  box-shadow: unset;
  font-weight: 400;
  display: flex;

  &:hover {
    background: #f6f6f6;
    box-shadow: unset;
  }
`;

interface DestructiveButtonProps {
  disabled?: boolean;
  buttonText: string;
  onDestruction: () => void;
  customWidth?: number;
  context?: boolean;
  modalTitle?: string;
}

const DestructiveButton: React.FC<PropsWithChildren<DestructiveButtonProps>> = ({
  disabled = false,
  buttonText,
  onDestruction,
  customWidth,
  children,
  context = false,
  modalTitle,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div>
      {context ? (
        <StyledContextButton
          buttonType="danger"
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
          disabled={disabled}
        >
          {buttonText}
        </StyledContextButton>
      ) : (
        <StyledButton
          buttonType="danger"
          type="button"
          onClick={() => {
            setIsModalOpen(true);
          }}
          disabled={disabled}
        >
          {buttonText}
        </StyledButton>
      )}
      <ConfirmModal
        open={isModalOpen}
        title={modalTitle ?? buttonText}
        confirmText={modalTitle ?? buttonText}
        confirmButtonType="danger"
        abortText={t("discard")}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onAbort={() => {
          setIsModalOpen(false);
        }}
        onConfirm={() => {
          onDestruction();
          setIsModalOpen(false);
        }}
        customWidth={customWidth}
      >
        <Box mt={1.75} mb={1.75}>
          {children}
        </Box>
      </ConfirmModal>
    </div>
  );
};

export default DestructiveButton;
