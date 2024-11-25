import React, { useState } from "react";
import { Button } from "components/Button";
import { ContextButton } from "components/ContextButton";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import { ContextSelect } from "components/card/components/ContextSelect";
import BaseModal, { ActionButtonsBaseWrapper, ActionRowBase } from "components/modals/BaseModal";
import ProjectTimezone from "features/project/components/ProjectTimezone";
import { useCreateServiceSlotsStrategy } from "features/services/hooks/useCreateServiceSlotsStrategy";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IconX } from "@tabler/icons";
import OneTimeForm from "./OneTimeForm";
import RecurringForm from "./RecurringForm";

const ContentWrapper = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

const ControlsWrapper = styled.div`
  padding: 15px 20px 20px 20px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0px 20px;
  border-radius: 4px;
`;

interface AddScheduleModalProps {
  open?: boolean;
}

const AddScheduleModal = ({ open = false }: AddScheduleModalProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [strategyType, setStrategyType] = useState<"recurring" | "onetime">("recurring");
  const { mutation } = useCreateServiceSlotsStrategy();

  const actionRow = (
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
  );

  return (
    <>
      <ContextButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {t("add-availability")}
      </ContextButton>
      <BaseModal open={isOpen}>
        <ContentWrapper>
          <HeaderWrapper>
            <Typography typographyType="h3">{t("add-availability")}</Typography>
            <IconButton onClick={() => setIsOpen(false)} type="button">
              <IconX />
            </IconButton>
          </HeaderWrapper>
          <ControlsWrapper>
            <ContextSelect
              label={t("services.scheduling-strategy")}
              value={strategyType}
              options={{
                recurring: t("services.recurring-service"),
                onetime: t("services.one-time"),
              }}
              onChange={(value) => {
                if (value === "recurring" || value === "onetime") {
                  setStrategyType(value);
                }
              }}
            />
          </ControlsWrapper>
        </ContentWrapper>
        {strategyType === "recurring" ? (
          <RecurringForm
            onSubmit={(values) => {
              mutation(values);
              setIsOpen(false);
            }}
          >
            {actionRow}
          </RecurringForm>
        ) : (
          <OneTimeForm
            onSubmit={(values) => {
              mutation(values);
              setIsOpen(false);
            }}
          >
            {actionRow}
          </OneTimeForm>
        )}
      </BaseModal>
    </>
  );
};

export default AddScheduleModal;
