import React, { useEffect } from "react";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { NavLink } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IconInfoCircle } from "@tabler/icons";
import { isTopBarBillingDisplayed } from "../state/isTopBarBillingDisplayed";
import { topBarAtom } from "../state/topBarAtom";

const Wrapper = styled.div`
  height: 36px;
  background-color: #c83a2d;
  color: #ffffff;
  width: 100%;
  display: grid;
  place-items: center;
  min-height: 36px;
`;

const StyledNav = styled(NavLink)`
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

const BillingTopBar = () => {
  const isTopBarDisplayed = useRecoilValue(isTopBarBillingDisplayed);
  const project = useRecoilValue(selectedProjectSelector);
  const setTopBarLoaded = useSetRecoilState(topBarAtom);

  useEffect(() => {
    setTopBarLoaded(new Date().getTime());

    return () => {
      setTopBarLoaded(undefined);
    };
  }, [project, isTopBarDisplayed, setTopBarLoaded]);

  if (!isTopBarDisplayed || project === undefined) return null;

  const infoText =
    project.bookingsLimit === null
      ? "To unlock Bookings, complete your Billing details."
      : "You have reached the booking limit for your plan.";

  const linkText = project.bookingsLimit === null ? "Open Billing" : "Upgrade now";

  return (
    <Wrapper>
      <Row gap="8px">
        <IconInfoCircle size={20} />
        <Typography typographyType="body" color="inherit" as="span">
          {infoText}
        </Typography>
        <StyledNav to={ROUTES.billing}>{linkText}</StyledNav>
      </Row>
    </Wrapper>
  );
};

export default BillingTopBar;
