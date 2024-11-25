import { useEffect } from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { useBilling } from "features/billing/hooks/useBilling";
import { useDemoAccount } from "features/billing/hooks/useDemoAccount";
import { topBarAtom } from "features/billing/state/topBarAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import PriceTableModal from "features/toast/components/PriceTableModal";
import { Trans, useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IconAlertTriangle, IconInfoCircle } from "@tabler/icons";

const Wrapper = styled.div<{ isAlert?: boolean }>`
  height: 36px;
  background-color: ${({ isAlert }) => (isAlert ? "#c83a2d" : "#FFCF70")};
  color: ${({ isAlert }) => (isAlert ? "#ffffff" : "#333")};
  width: 100%;
  display: grid;
  place-items: center;
  min-height: 36px;
`;

const StyledNav = styled(NavLink)<{ isAlert?: boolean }>`
  all: unset;
  cursor: pointer;
  font-weight: 700;
  color: ${({ isAlert }) => (isAlert ? "#fff" : "#333")};
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledSeparator = styled.span`
  margin: 0 2px;
`;

export const DemoAccountBar: React.FC = () => {
  const { t } = useTranslation();
  useBilling();
  const { isTopBarDisplayed, isAlert, bookingsLimit } = useDemoAccount();
  const project = useRecoilValue(selectedProjectSelector);
  const setTopBarLoaded = useSetRecoilState(topBarAtom);

  useEffect(() => {
    setTopBarLoaded(new Date().getTime());

    return () => {
      setTopBarLoaded(undefined);
    };
  }, [project, isTopBarDisplayed, setTopBarLoaded]);

  if (!isTopBarDisplayed || project === undefined) return null;

  return (
    <Wrapper isAlert={isAlert}>
      <Row gap="8px">
        {isAlert ? <IconAlertTriangle size={20} /> : <IconInfoCircle size={20} />}
        <Typography typographyType="body" color="inherit" as="span">
          {isAlert ? (
            <Trans i18nKey="billings.demo-alert" components={{ strong: <strong /> }} />
          ) : (
            <Trans i18nKey="billings.demo-warning" components={{ strong: <strong /> }} values={{ bookingsLimit }} />
          )}
        </Typography>
        <StyledNav to={""} isAlert={isAlert}>
          <PriceTableModal isAlert={isAlert} />
        </StyledNav>

        {isAlert && (
          <>
            <StyledSeparator>|</StyledSeparator>
            <StyledNav to={""} isAlert={isAlert} onClick={() => window.Intercom("showNewMessage")}>
              {t("billings.contact-us")}
            </StyledNav>
          </>
        )}
      </Row>
    </Wrapper>
  );
};
