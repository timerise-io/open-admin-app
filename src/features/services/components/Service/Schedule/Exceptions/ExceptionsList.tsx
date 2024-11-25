import React, { useState } from "react";
import { ContextButton } from "components/ContextButton";
import { selectedServiceExceptionsAtom } from "features/services/state/selectedServiceExceptionsAtom";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
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

const ExceptionsList = () => {
  const { t } = useTranslation();
  const INITIAL_EXCEPTIONS_LIMIT = 10;
  const [limit, setLimit] = useState(INITIAL_EXCEPTIONS_LIMIT);
  const exceptions = useRecoilValue(selectedServiceExceptionsAtom);

  return (
    <Wrapper showSeparator={exceptions.length > 0}>
      {exceptions.slice(0, limit === INITIAL_EXCEPTIONS_LIMIT ? limit : exceptions.length).map((slot) => {
        return <ExceptionsListItem key={slot.slotId} slot={slot} />;
      })}
      {exceptions.length > limit && limit === INITIAL_EXCEPTIONS_LIMIT && (
        <StyledContextButton
          onClick={() => {
            setLimit(exceptions.length);
          }}
        >
          {t("show-more")}
        </StyledContextButton>
      )}
    </Wrapper>
  );
};

export default ExceptionsList;
