import React, { useState } from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { LabelDeleteModal } from "./LabelDeleteModal";

const LabelsItemWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 10px 10px 12px;
`;

const ItemAction = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
`;

interface LabelsListItemProps {
  label: string;
  labels: string[];
}

export const LabelListItem = ({ label, labels }: LabelsListItemProps) => {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeletedModalOpen] = useState(false);

  return (
    <>
      <LabelsItemWrapper>
        <Row ai="center">
          <Typography typographyType="body" as="span">
            {label}
          </Typography>
          <Row gap="10px">
            <ItemAction
              type="button"
              onClick={() => {
                setIsDeletedModalOpen(true);
              }}
            >
              <Typography typographyType="label" as="span" weight="700">
                {t("delete")}
              </Typography>
            </ItemAction>
          </Row>
        </Row>
      </LabelsItemWrapper>
      <LabelDeleteModal
        label={label}
        labels={labels}
        open={isDeleteModalOpen}
        onClose={() => setIsDeletedModalOpen(false)}
      />
    </>
  );
};
