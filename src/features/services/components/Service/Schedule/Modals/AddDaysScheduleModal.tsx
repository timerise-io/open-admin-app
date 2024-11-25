import React, { useState } from "react";
import { Button } from "components/Button";
import { ContextButton } from "components/ContextButton";
import { IconButton } from "components/IconButton";
import { Typography } from "components/Typography";
import BaseModal, { ActionButtonsBaseWrapper, ActionRowBase } from "components/modals/BaseModal";
import ProjectTimezone from "features/project/components/ProjectTimezone";
import { useCreateServiceRangeStrategy } from "features/services/hooks/useCreateServiceRangeStrategy";
import { useServiceRangeStrategies } from "features/services/hooks/useServiceRangeStrategies";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IconX } from "@tabler/icons";
import { AddDaysScheduleForm } from "../Forms";

const ContentWrapper = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0px 20px;
  border-radius: 4px;
`;

const SubTitle = styled(Typography)`
  padding: 0 20px 20px 20px;
`;

interface AddDaysScheduleModalProps {
  open?: boolean;
}

export const AddDaysScheduleModal = ({ open = false }: AddDaysScheduleModalProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  useServiceRangeStrategies(id!);

  const [isOpen, setIsOpen] = useState(false);
  const { mutation } = useCreateServiceRangeStrategy();

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
          <SubTitle typographyType="body" as="div">
            {t("services.service-type")}: <strong>{t("services.days-view-short")}</strong>
          </SubTitle>
        </ContentWrapper>
        <AddDaysScheduleForm
          onSubmit={(values) => {
            mutation(values);
            setIsOpen(false);
          }}
        >
          {actionRow}
        </AddDaysScheduleForm>
      </BaseModal>
    </>
  );
};
