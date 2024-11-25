import React, { useMemo } from "react";
import { ROUTES } from "constans/routes";
import { ProfileMiniature } from "features/auth/components/ProfileMiniature";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import ProjectTimezone from "features/project/components/ProjectTimezone";
import { TeamMemberRole } from "features/team/components/TeamMemberInvite/TeamMemberInviteFormContent";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  IconBox,
  IconCalendarEvent,
  IconChartBubble,
  IconCreditCard,
  IconFriends,
  IconList,
  IconMap,
  IconSettings,
  IconSmartHome,
} from "@tabler/icons";
import HeaderLogo from "./HeaderLogo";
import { Typography } from "./Typography";
import { Column } from "./layout/Column";

const Wrapper = styled(Column)`
  height: 100%;
  min-width: 240px;
  align-items: flex-start;
  background-color: #ffffff;
`;

const Separator = styled.div`
  background: #d9d9d9;
  height: 1px;
  margin: 15px 16px 7px 16px;
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
  z-index: 900;

  & > svg {
    margin: 0 10px 0 16px;
  }

  &:hover {
    background-color: #f6f6f6;
  }
`;

const GetNavItem = (
  item: {
    forbiddenRoles?: string[];
    icon: JSX.Element;
    text: string;
    to: string;
    checkActive?: boolean;
  },
  index: number,
) => {
  const user = useRecoilValue(currentUserAtom);
  const location = useLocation();

  const isSubItemActive = useMemo(() => {
    return (
      location.pathname === ROUTES.communicationSettings ||
      location.pathname === ROUTES.bookingPageSettings ||
      location.pathname === ROUTES.settingsWidget
    );
  }, [location.pathname]);

  if (item.forbiddenRoles?.includes(user?.role ?? "")) {
    return null;
  }

  return (
    <StyledLink
      key={`nav-item-${item.text}-${index}`}
      to={item.to}
      className={item.checkActive && isSubItemActive ? "active" : ""}
    >
      {item.icon}
      <Typography typographyType="body">{item.text}</Typography>
    </StyledLink>
  );
};

export const MainNavigation = () => {
  const { t } = useTranslation();
  const whitelabel = useWhitelabel();
  const SHOW_BILLING = !!+(process.env.REACT_APP_SHOW_BILLING ?? 0) && whitelabel.billingSection === true;
  const TOP_NAV_ITEMS = [
    {
      icon: <IconSmartHome />,
      text: t("dashboard.home"),
      to: ROUTES.home,
    },
    {
      icon: <IconCalendarEvent />,
      text: t("bookings.bookings"),
      to: ROUTES.bookings,
    },
    {
      icon: <IconList />,
      text: t("services.services"),
      to: ROUTES.services,
    },
    {
      icon: <IconChartBubble />,
      text: t("spaces.spaces"),
      to: ROUTES.spaces,
    },
    {
      icon: <IconMap />,
      text: t("locations.locations"),
      to: ROUTES.locations,
    },
    {
      icon: <IconBox />,
      text: t("assets.assets"),
      to: ROUTES.assets,
    },
    {
      icon: <IconFriends />,
      text: t("team.team"),
      to: ROUTES.team,
      forbiddenRoles: [TeamMemberRole.STAFF],
    },
  ];

  const BOTTOM_NAV_ITEMS = [
    ...(SHOW_BILLING
      ? [
          {
            icon: <IconCreditCard />,
            text: t("billing"),
            to: ROUTES.billing,
            forbiddenRoles: [TeamMemberRole.STAFF],
          },
        ]
      : []),
    {
      icon: <IconSettings />,
      text: t("settings.settings"),
      to: ROUTES.projectSettings,
      forbiddenRoles: [TeamMemberRole.STAFF],
      checkActive: true,
    },
  ];

  return (
    <Wrapper>
      <HeaderLogo />
      <StyledNavigation>
        <div>{TOP_NAV_ITEMS.map(GetNavItem)}</div>
        <div>
          {BOTTOM_NAV_ITEMS.map(GetNavItem)}

          <ProfileMiniature />
          <Separator />
          <ProjectTimezone />
        </div>
      </StyledNavigation>
    </Wrapper>
  );
};
