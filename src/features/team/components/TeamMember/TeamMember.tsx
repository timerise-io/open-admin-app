import React, { useEffect, useState } from "react";
import Tabs, { TabProp } from "components/Tabs/Tabs";
import { ROUTES } from "constans/routes";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { currentUserPrivilegesSelector } from "features/auth/state/currentUserPrivilegesSelector";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Connections from "./Connections/Connections";
import GeneralInfo from "./GeneralInfo";

const SHOW_CONNECTION = !!+(process.env.REACT_APP_SHOW_CONNECTION ?? 0);

type TeamMemberProps = {
  id?: string;
};

const TeamMember: React.FC<TeamMemberProps> = ({ id }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const tabsItems: Array<TabProp> = [
    { id: "generalInfo", text: t("common:team.general-info") },
    { id: "connections", text: t("common:team.connections") },
  ];
  const [tabId, setTabId] = useState<string>(pathname === ROUTES.teamMeConnections ? "connections" : "generalInfo");
  const { canUseConnections } = useRecoilValue(currentUserPrivilegesSelector);
  const currentUserId = useRecoilValue(currentUserAtom)?.userId!;

  const memberId = id ?? currentUserId;

  const isCurrentUser = currentUserId === memberId;
  const showConnection = SHOW_CONNECTION && isCurrentUser && canUseConnections;

  const tabs = <Tabs items={tabsItems} onSelect={setTabId} selectedId={tabId} />;

  useEffect(() => {
    if (isCurrentUser) {
      navigate(tabId === "connections" ? ROUTES.teamMeConnections : ROUTES.teamMe);
    }
  }, [isCurrentUser, tabId, navigate]);

  return (
    <>
      {tabId === "generalInfo" && <GeneralInfo memberId={memberId}>{showConnection && tabs}</GeneralInfo>}
      {tabId === "connections" && <Connections memberId={memberId}>{showConnection && tabs}</Connections>}
    </>
  );
};

export default TeamMember;
