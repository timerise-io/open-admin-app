import React, { useState } from "react";
import { Button } from "components/Button";
import { ContextButton } from "components/ContextButton";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import BaseModal, {
  ActionButtonsBaseWrapper,
  ActionRowBase,
  BaseModalHeaderWrapper,
  BaseModalUpperContentWrapper,
} from "components/modals/BaseModal";
import ProjectTimezone from "features/project/components/ProjectTimezone";
import { useTranslation } from "react-i18next";
import { IconX } from "@tabler/icons";
import ExceptionForm, { CreateExceptionSlotValues } from "./ExceptionForm";

interface AddExceptionModalProps {
  onSubmit: (values: CreateExceptionSlotValues) => void;
}

const AddExceptionModal = ({ onSubmit }: AddExceptionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <ContextButton
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        {t("common:add-exception")}
      </ContextButton>
      <BaseModal open={isOpen} customWidth={380}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">{t("common:add-exception")}</Typography>
            <IconButton onClick={() => setIsOpen(false)} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
        </BaseModalUpperContentWrapper>
        <ExceptionForm
          onSubmit={(values) => {
            onSubmit(values);
            setIsOpen(false);
          }}
        >
          <ActionRowBase>
            <ProjectTimezone />
            <ActionButtonsBaseWrapper>
              <Button buttonType="secondary" type="button" fillWidth={false} onClick={() => setIsOpen(false)}>
                {t("cancel")}
              </Button>
              <Button buttonType="primary" fillWidth={false} type="submit">
                {t("add")}
              </Button>
            </ActionButtonsBaseWrapper>
          </ActionRowBase>
        </ExceptionForm>
      </BaseModal>
    </>
  );
};

export default AddExceptionModal;
