import React from "react";
import HeaderLogo from "components/HeaderLogo";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const ForgotPasswordWrapper = styled(Column)`
  min-height: 100vh;
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.primary.color};
    `;
  }}
`;

const ForgotPasswordFormWrapper = styled.div`
  flex-grow: 1;
`;

const TopRow = styled(Row)`
  padding: 28px;
`;

const SignInLink = styled(Link)`
  top: 0;
  right: 0;
  color: #333333;
  margin: auto;
`;

export const ForgotPassword = () => {
  const { t } = useTranslation();
  return (
    <ForgotPasswordWrapper ai="stretch">
      <TopRow jc="center">
        <HeaderLogo />
      </TopRow>
      <ForgotPasswordFormWrapper>
        <ForgotPasswordForm />
        <Column mt={2.5}>
          <SignInLink to={ROUTES.signIn}>
            <Typography typographyType="body" as="span">
              {t("back-to-log-in")}
            </Typography>
          </SignInLink>
        </Column>
      </ForgotPasswordFormWrapper>
    </ForgotPasswordWrapper>
  );
};
