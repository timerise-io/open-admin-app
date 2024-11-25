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
import { useProjectUpdate } from "features/project/hooks/useProjectUpdate";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconX } from "@tabler/icons";
import { LabelForm } from "./LabelForm";

const StyledActionRowBase = styled(ActionRowBase)`
  justify-content: flex-end;
`;

export const AddLabelModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { mutation } = useProjectUpdate();

  return (
    <>
      <ContextButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t("settings.add-label")}
      </ContextButton>
      <BaseModal open={isOpen} customWidth={380}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">{t("settings.add-label")}</Typography>
            <IconButton onClick={() => setIsOpen(false)} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
        </BaseModalUpperContentWrapper>
        <LabelForm
          onSubmit={(values) => {
            mutation(values);
            setIsOpen(false);
          }}
        >
          <StyledActionRowBase>
            <ActionButtonsBaseWrapper>
              <Button buttonType="secondary" type="button" fillWidth={false} onClick={() => setIsOpen(false)}>
                {t("discard")}
              </Button>
              <Button buttonType="primary" fillWidth={false} type="submit">
                {t("add")}
              </Button>
            </ActionButtonsBaseWrapper>
          </StyledActionRowBase>
        </LabelForm>
      </BaseModal>
    </>
  );
};
