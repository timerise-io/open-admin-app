import React, { useEffect } from "react";
import HeaderLogo from "components/HeaderLogo";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { authUserAtom } from "features/auth/state/authUserAtom";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { LogInForm } from "./LogInForm";
import LogInProviders from "./LogInProviders";

const LogInWrapper = styled(Column)`
  min-height: 100vh;
  ${({ theme }) => {
    return css`
      background-color: ${theme.colorSchemas.background.primary.color};
    `;
  }}
`;

const LogInFormWrapper = styled.div`
  flex-grow: 1;
`;

const TopRow = styled(Row)`
  padding: 28px;
`;

export const LogIn = () => {
  const { state } = useRecoilValue(authUserAtom);
  const navigate = useNavigate();
  const whitelabel = useWhitelabel();

  useEffect(() => {
    if (state === "logged") {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return state !== "logged" ? (
    <LogInWrapper ai="stretch">
      <TopRow jc="center">
        <HeaderLogo />
      </TopRow>
      <LogInFormWrapper>
        <LogInForm />
        {whitelabel.showAuthProviders && <LogInProviders />}
      </LogInFormWrapper>
    </LogInWrapper>
  ) : null;
};
