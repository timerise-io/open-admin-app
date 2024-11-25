import React, { PropsWithChildren } from "react";
import { Button } from "components/Button";
import { Typography } from "components/Typography";
import { ButtonSpinner } from "components/loaders";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import styled, { css } from "styled-components";
import { IconArrowLeft } from "@tabler/icons";
import { Row } from "./Row";

const Wrapper = styled.header`
  height: 100px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 500;

  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.primary.color};
    `;
  }}
`;

const BackButton = styled.button`
  all: unset;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 20px;
  left: 136px;
  top: 34px;
  margin: 0 12px;
  background: #333333;
`;

const StyledLink = styled.a`
  all: unset;
  cursor: pointer;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 24px;

  text-decoration-line: underline;

  color: #333333;
`;

const StyledButton = styled(Button)`
  padding: 6px 8px;
  font-size: 11px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackButonClick?: () => void;
  knowledgeBaseUrl?: string;
  actions?: {
    label: string;
    action: () => void;
    loading?: boolean;
  }[];
}

export const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = ({
  showBackButton,
  title,
  onBackButonClick,
  knowledgeBaseUrl,
  children,
  actions,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Row>
        {showBackButton && (
          <BackButton
            type="button"
            onClick={() => {
              onBackButonClick ? onBackButonClick() : navigate(-1);
            }}
          >
            <IconArrowLeft size={24} />
          </BackButton>
        )}
        <Typography typographyType="h1" as="h1" displayType="contents">
          {title}
        </Typography>
        {actions && actions?.length > 0 && (
          <>
            <VerticalLine />
            <StyledButtonsWrapper>
              {actions.map(({ label, action, loading }, index) => (
                <StyledButton
                  key={index}
                  buttonType="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    !loading && action();
                  }}
                >
                  {loading && <ButtonSpinner />}
                  {label}
                </StyledButton>
              ))}
            </StyledButtonsWrapper>
          </>
        )}
        {knowledgeBaseUrl && (
          <>
            <VerticalLine />
            <StyledLink href={knowledgeBaseUrl} target="_blank" rel="noreferrer">
              {t("learn-more")}
            </StyledLink>
          </>
        )}
      </Row>
      <div>{children}</div>
    </Wrapper>
  );
};
