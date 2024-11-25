import React, { useState } from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { Slot } from "features/services/model/serviceSlotStrategie";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ExceptionDeleteModal from "./ExceptionDeleteModal";
import ExceptionSummary from "./ExceptionSummary";

const ExceptionsItemWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  padding: 10px 10px 10px 12px;
`;

const ItemAction = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
`;

interface ExceptionsListItemProps {
  slot: Slot;
  onDeleteConfirm: (slotId: string) => void;
  disabled?: boolean;
}

const ExceptionsListItem = ({ slot, onDeleteConfirm, disabled = false }: ExceptionsListItemProps) => {
  const { t } = useTranslation();
  const [isDeleteModalOpen, setIsDeletedModalOpen] = useState(false);

  return (
    <>
      <ExceptionsItemWrapper>
        <Row ai="flex-start">
          <ExceptionSummary slot={slot} />
          <Row gap="10px">
            {!disabled && (
              <ItemAction
                type="button"
                onClick={() => {
                  setIsDeletedModalOpen(true);
                }}
              >
                <Typography typographyType="label" as="span" weight="700" color="error">
                  {t("delete")}
                </Typography>
              </ItemAction>
            )}
          </Row>
        </Row>
      </ExceptionsItemWrapper>
      <ExceptionDeleteModal
        slot={slot}
        open={isDeleteModalOpen}
        onClose={() => setIsDeletedModalOpen(false)}
        onConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default ExceptionsListItem;
