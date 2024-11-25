import React, { PropsWithChildren } from "react";
import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import { Form, Formik } from "formik";
import { ButtonType } from "models/theme";
import styled from "styled-components";
import { IconX } from "@tabler/icons";
import BaseModal, { ActionButtonsBaseWrapper, ActionRow } from "./BaseModal";

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

interface ConfirmModalProps<T> {
  title: string;
  open?: boolean;
  abortText: string;
  confirmText: string;
  confirmButtonType: ButtonType;
  onClose?: Function;
  onAbort?: Function;
  onConfirm?: Function;
  customWidth?: number;
  initialValues: T;
  onSubmit: (values: T) => void;
  validationSchema: any;
}

const ConfirmFormModal: React.FC<PropsWithChildren<ConfirmModalProps<any>>> = ({
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
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  return (
    <BaseModal open={open} customWidth={customWidth}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {({ values, resetForm }) => {
          return (
            <Form>
              <HeaderWrapper>
                <Typography typographyType="h3">{title}</Typography>
                <IconButton onClick={() => onClose && onClose()} type="button">
                  <IconX />
                </IconButton>
              </HeaderWrapper>
              <ControlsWrapper>{children}</ControlsWrapper>
              <ActionRow>
                <ActionButtonsBaseWrapper>
                  <StyledButton onClick={() => onAbort && onAbort()} buttonType="secondary" type="button">
                    {abortText}
                  </StyledButton>
                  <StyledButton buttonType={confirmButtonType} type="submit">
                    {confirmText}
                  </StyledButton>
                </ActionButtonsBaseWrapper>
              </ActionRow>
            </Form>
          );
        }}
      </Formik>
    </BaseModal>
  );
};

export default ConfirmFormModal;
