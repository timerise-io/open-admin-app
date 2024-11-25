import React from "react";
import { ContextButton } from "components/ContextButton";
import { Typography } from "components/Typography";
import { Box } from "components/layout/Box";
import { useCopiedToast } from "helpers/hooks/useCopiedToast";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => {
    return css`
      .text {
        flex: 1;
        display: block;
        padding: 8px 12px;
        border-radius: ${theme.borderRadius};
        background-color: ${theme.colorSchemas.background.primary.color};
        margin-top: 0;
        margin-bottom: 0;
        min-width: 75px;
        text-align: center;
      }
    `;
  }}
`;

const StyledButton = styled(ContextButton)`
  width: 100%;
  justify-content: center;
`;

interface CopyShortIdButtonProps {
  shortId: string;
  className?: string;
  showValue?: boolean;
}

export const CopyShortIdButton: React.FC<CopyShortIdButtonProps> = ({ shortId, className = "", showValue = true }) => {
  const showCopiedToast = useCopiedToast();
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      {showValue && (
        <>
          <Typography typographyType="body" displayType="contents" className="text">
            {shortId}
          </Typography>
          <Box mr={1}></Box>
        </>
      )}
      <StyledButton
        className={className}
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(shortId);
          showCopiedToast();
        }}
        type="button"
      >
        {t("common:copy")}
      </StyledButton>
    </StyledWrapper>
  );
};
