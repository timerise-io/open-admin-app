import React from "react";
import { ItemListDataUserAvatar } from "components/ItemsList/ItemListDataUserAvatar";
import { ItemListTextData } from "components/ItemsList/ItemListTextData";
import { ItemsList } from "components/ItemsList/ItemsList";
import { ItemsListRowWrapper } from "components/ItemsList/ItemsListRowWrapper";
import { StyledTableData, StyledTableDataFlex } from "components/ItemsList/StyledTableData";
import { Typography } from "components/Typography";
import { CopyShortIdButton } from "components/buttons/CopyShortIdButton";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { PageSubheader } from "components/layout/PageSubheader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { TeamMemberRole } from "features/team/components/TeamMemberInvite/TeamMemberInviteFormContent";
import { useTranslation } from "react-i18next";
import { generatePath } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Invitation, invitationStatusMap } from "../models/invitation";
import { User } from "../models/user";
import { invitationsAtom } from "../state/invitationsAtom";
import { teamAtom } from "../state/teamAtom";
import AddTeamMember from "./AddTeamMember";

const BadgeWrapper = styled.div`
  background: #eaeaea;
  border-radius: 20px;
  width: fit-content;
  padding: 4px 8px;
`;

export const Team = () => {
  const { t } = useTranslation();
  const { isLoading } = useRecoilValue(apiStatusAtom("GET_TEAM"));
  const team = useRecoilValue(teamAtom);
  const invitations = useRecoilValue(invitationsAtom);
  const user = useRecoilValue(currentUserAtom);

  if (user?.role === TeamMemberRole.STAFF) {
    return null;
  }

  const teamArray = Object.values(team ?? {});
  const invitationsArray = Object.values(invitations ?? {});

  return (
    <>
      <PageHeader title={t("common:team.team")}>
        <Row gap="10px">
          <AddTeamMember />
        </Row>
      </PageHeader>
      <PageContent>
        <ItemsList
          noDataSubInfo={t("common:team.no-members")}
          disableNoDataInfo
          isLoading={isLoading}
          headers={[t("common:team.person"), t("common:team.position"), t("common:role"), t("common:short-id")]}
          columns="1fr 160px 120px 160px"
          items={teamArray}
          generator={(props, item: User) => {
            const role = item.role ? `${item.role.charAt(0)}${item.role.substring(1).toLowerCase()}` : "-";

            return (
              <ItemsListRowWrapper
                key={`asset-row-${item.userId}`}
                to={generatePath(ROUTES.teamMember, { id: item.userId })}
                {...props}
              >
                <ItemListDataUserAvatar text={item.fullName} src={item.photoUrl ?? ""} />
                <ItemListTextData w={10}>{item.jobTitle ?? "-"}</ItemListTextData>
                <StyledTableData w={15}>
                  <BadgeWrapper>
                    <Typography typographyType="body" as="span">
                      {role}
                    </Typography>
                  </BadgeWrapper>
                </StyledTableData>
                <StyledTableDataFlex w={15} paddingRight>
                  <CopyShortIdButton shortId={item.shortId} />
                </StyledTableDataFlex>
              </ItemsListRowWrapper>
            );
          }}
        />
      </PageContent>
      {invitationsArray.length > 0 && (
        <>
          <PageSubheader title={t("common:team.invitations")} />
          <PageContent>
            <ItemsList
              noDataSubInfo="The team has no new invitations."
              disableNoDataInfo
              isLoading={isLoading}
              headers={[t("common:email"), t("common:team.project-role"), t("common:status")]}
              columns="1fr 120px 140px"
              items={invitationsArray}
              generator={(props, item: Invitation) => {
                const role = item.role ? `${item.role.charAt(0)}${item.role.substring(1).toLowerCase()}` : "-";
                return (
                  <ItemsListRowWrapper key={`invites-row-${item.invitationId}`} {...props}>
                    <ItemListDataUserAvatar text={item.email} />
                    <StyledTableData w={15}>
                      <BadgeWrapper>
                        <Typography typographyType="body" as="span">
                          {role}
                        </Typography>
                      </BadgeWrapper>
                    </StyledTableData>
                    <StyledTableData w={15}>
                      <BadgeWrapper>
                        <Typography typographyType="body" as="span">
                          {invitationStatusMap[item.status]}
                        </Typography>
                      </BadgeWrapper>
                    </StyledTableData>
                  </ItemsListRowWrapper>
                );
              }}
            />
          </PageContent>
        </>
      )}
    </>
  );
};
