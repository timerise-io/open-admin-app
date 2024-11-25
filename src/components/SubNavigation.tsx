import React from "react";
import { ROUTES } from "constans/routes";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { Typography } from "./Typography";
import { Column } from "./layout/Column";

const Wrapper = styled(Column)`
  height: 100%;
  min-width: 240px;
  align-items: flex-start;
  background-color: #ffffff;
  overflow: auto;
  border-left: 1px solid #e5e5e5;
`;

const HeaderWrapper = styled.div`
  height: 100px;
  padding: 32px;
  display: flex;
  align-items: center;
`;

const StyledNavigation = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 16px;

  .active {
    background-color: #f6f6f6;
  }
  .active::before {
    content: "";
    height: 100%;
    width: 4px;
    background-color: #333333;
    border-radius: 0 8px 8px 0;
    left: -16px;
    position: absolute;
  }
`;

const StyledLink = styled(NavLink)`
  all: unset;
  display: flex;
  margin: 2px 16px;
  border-radius: 4px;
  cursor: pointer;
  align-items: center;
  position: relative;
  padding-left: 16px;

  ${({ theme }) => {
    return css`
      &:hover {
        background-color: #f6f6f6;
      }
    `;
  }};
`;

const getNavItem = (
  item: {
    text: string;
    to: string;
  },
  index: number,
) => {
  return (
    <StyledLink key={`nav-item-${item.text}-${index}`} to={item.to}>
      <Typography typographyType="body">{item.text}</Typography>
    </StyledLink>
  );
};

export const SubNavigation = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  if (!pathname.match(/^\/setting/)) return null;

  const TOP_NAV_ITEMS = [
    {
      text: t("project"),
      to: ROUTES.projectSettings,
    },
    {
      text: t("booking-page"),
      to: ROUTES.bookingPageSettings,
    },
  ];

  return (
    <Wrapper>
      <HeaderWrapper>
        <Typography typographyType="h1" as="h1" displayType="contents">
          {t("settings.settings")}
        </Typography>
      </HeaderWrapper>

      <StyledNavigation>
        <div>{TOP_NAV_ITEMS.map(getNavItem)}</div>
      </StyledNavigation>
    </Wrapper>
  );
};
