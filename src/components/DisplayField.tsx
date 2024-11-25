import React, { PropsWithChildren } from "react";
import { toastAtom } from "features/toast/state/toastAtom";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { ContextButton } from "./ContextButton";
import { Typography } from "./Typography";
import { Row } from "./layout/Row";

const Wrapper = styled.div<{ disableBottomMargin: boolean }>`
  width: 100%;
  ${({ disableBottomMargin }) => {
    return css`
      margin-bottom: ${disableBottomMargin ? 0 : 24}px;
    `;
  }}
`;

const StyledRow = styled(Row)<{ smallPadding: boolean; customFieldToCopy?: boolean; wordBreak?: boolean }>`
  align-items: flex-end;
  width: 100%;
  margin-top: 4px;
  gap: 8px;
  ${({ theme, smallPadding, customFieldToCopy, wordBreak }) => {
    return css`
      flex-wrap: ${customFieldToCopy ? "wrap" : "unset"};
      .text {
        flex: 1;
        display: block;
        padding: ${smallPadding ? "4px" : "8px 12px"};
        border-radius: ${theme.borderRadius};
        background-color: ${theme.colorSchemas.background.primary.color};
        margin-top: 4px;
        margin-bottom: 0;
        word-break: ${wordBreak ? "break-all" : "unset"};
      }
    `;
  }}
`;

const StyledFlexSeparator = styled.div`
  flex-basis: 100%;
  height: 0;
`;

const StyledCustomFieldToCopy = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #999999;
  position: relative;
  top: -12px;
`;

const StyledContextButton = styled(ContextButton)`
  align-self: center;
  margin-top: 3px;
`;

interface DisplayFieldProps {
  label?: string;
  text?: string;
  showCopyButton?: boolean;
  showCustomButton?: boolean;
  showSecondCustomButton?: boolean;
  customButtonText?: string;
  secondCustomButtonText?: string;
  onClick?: Function;
  onClickSecond?: Function;
  smallPadding?: boolean;
  disableBottomMargin?: boolean;
  className?: string;
  customCopyButtonText?: string;
  customFieldToCopy?: string;
  ctx?: string;
  isBold?: boolean;
  wordBreak?: boolean;
}

export const DisplayField: React.FC<PropsWithChildren<DisplayFieldProps>> = ({
  label,
  text,
  showCopyButton,
  showCustomButton,
  showSecondCustomButton,
  customButtonText,
  secondCustomButtonText,
  onClick,
  onClickSecond,
  children,
  smallPadding,
  disableBottomMargin = false,
  className = "",
  customCopyButtonText,
  customFieldToCopy,
  ctx = "",
  isBold = false,
  wordBreak = false,
}) => {
  const [currentToast, setCurrentToast] = useRecoilState(toastAtom);
  const { t } = useTranslation();

  return (
    <Wrapper disableBottomMargin={disableBottomMargin} className={className}>
      {label && (
        <Typography typographyType="label" as="span" data-ctx={ctx}>
          {label}
        </Typography>
      )}
      <StyledRow smallPadding={!!smallPadding} customFieldToCopy={!!customFieldToCopy} wordBreak={!!wordBreak}>
        <Typography
          typographyType="body"
          displayType="contents"
          className="text display-field-custom-text-style"
          weight={isBold ? "700" : null}
        >
          {text || "-"}
        </Typography>
        {children}

        {showSecondCustomButton && (
          <ContextButton onClick={() => onClickSecond && onClickSecond()} type="button">
            {secondCustomButtonText}
          </ContextButton>
        )}

        {showCopyButton && (
          <StyledContextButton
            onClick={() => {
              text && navigator.clipboard.writeText(customFieldToCopy ?? text);
              setCurrentToast([
                ...currentToast,
                {
                  variant: "SUCCESS",
                  type: "copied",
                  date: new Date().getTime(),
                },
              ]);
            }}
            type="button"
          >
            {customCopyButtonText ?? t("common:copy")}
          </StyledContextButton>
        )}

        {showCustomButton && (
          <ContextButton onClick={() => onClick && onClick()} type="button">
            {customButtonText}
          </ContextButton>
        )}

        {customFieldToCopy && (
          <>
            <StyledFlexSeparator />
            <StyledCustomFieldToCopy>{customFieldToCopy}</StyledCustomFieldToCopy>
          </>
        )}
      </StyledRow>
    </Wrapper>
  );
};
