import React, { useEffect } from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useRefreshToken } from "features/auth/hooks/useRefreshToken";
import { authUserAtom } from "features/auth/state/authUserAtom";
import { topBarAtom } from "features/billing/state/topBarAtom";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IconInfoCircle } from "@tabler/icons";

const Wrapper = styled.div`
  height: 36px;
  background-color: #c83a2d;
  color: #ffffff;
  width: 100%;
  display: grid;
  place-items: center;
  min-height: 36px;
`;

const StyledNav = styled.a`
  all: unset;
  cursor: pointer;
  font-weight: 700;
  color: #ffffff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ExpirationTopBar = () => {
  const { tokenExpired, refreshExpirationTime } = useRefreshToken();
  const { t } = useTranslation();
  const state = useRecoilValue(authUserAtom).state;
  const setTopBarLoaded = useSetRecoilState(topBarAtom);

  useEffect(() => {
    setTopBarLoaded(new Date().getTime());

    return () => {
      setTopBarLoaded(undefined);
    };
  }, [state, tokenExpired, setTopBarLoaded]);

  if (!tokenExpired || state === "loggedOut") return null;

  return (
    <Wrapper>
      <Row gap="8px">
        <IconInfoCircle size={20} />
        <Typography typographyType="body" color="inherit" as="span">
          {t("session-expired")}
        </Typography>
        <StyledNav onClick={refreshExpirationTime}>{t("refresh")}</StyledNav>
      </Row>
    </Wrapper>
  );
};
