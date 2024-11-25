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
import { useCreateSlot } from "features/services/hooks/useCreateSlot";
import { useTranslation } from "react-i18next";
import { IconX } from "@tabler/icons";
import ExceptionForm from "./ExceptionForm";

const AddExceptionModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { mutation } = useCreateSlot();

  return (
    <>
      <ContextButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t("add-exception")}
      </ContextButton>
      <BaseModal open={isOpen} customWidth={380}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">{t("add-exception")}</Typography>
            <IconButton onClick={() => setIsOpen(false)} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
        </BaseModalUpperContentWrapper>
        <ExceptionForm
          onSubmit={(values) => {
            mutation(values);
            setIsOpen(false);
          }}
        >
          <ActionRowBase>
            <ProjectTimezone />
            <ActionButtonsBaseWrapper>
              <Button buttonType="secondary" type="button" fillWidth={false} onClick={() => setIsOpen(false)}>
                {t("discard")}
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
