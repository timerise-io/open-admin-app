import React, { useState } from "react";
import { ContextButton } from "components/ContextButton";
import { Slot } from "features/services/model/serviceSlotStrategie";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import ExceptionsListItem from "./ExceptionsListItem";

const Wrapper = styled.div<{ showSeparator: boolean }>`
  width: 100%;
  ${({ showSeparator }) => {
    const borderWidth = showSeparator ? 1 : 0;

    return css`
      border-top: ${borderWidth}px solid #d9d9d9;
    `;
  }}
`;

const StyledContextButton = styled(ContextButton)`
  margin: 20px 0 0;
`;

interface ExceptionsListProps {
  slots: Array<Slot>;
  onDeleteConfirm: (slotId: string) => void;
  disabled?: boolean;
}

const ExceptionsList = ({ slots, onDeleteConfirm, disabled = false }: ExceptionsListProps) => {
  const { t } = useTranslation();
  const INITIAL_EXCEPTIONS_LIMIT = 10;
  const [limit, setLimit] = useState(INITIAL_EXCEPTIONS_LIMIT);

  return (
    <Wrapper showSeparator={slots.length > 0}>
      {slots.slice(0, limit === INITIAL_EXCEPTIONS_LIMIT ? limit : slots.length).map((slot) => {
        return (
          <ExceptionsListItem key={slot.slotId} slot={slot} onDeleteConfirm={onDeleteConfirm} disabled={disabled} />
        );
      })}
      {slots.length > limit && limit === INITIAL_EXCEPTIONS_LIMIT && (
        <StyledContextButton
          onClick={() => {
            setLimit(slots.length);
          }}
        >
          {t("show-more")}
        </StyledContextButton>
      )}
    </Wrapper>
  );
};

export default ExceptionsList;
