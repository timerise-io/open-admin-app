import React, { useEffect, useMemo, useState } from "react";
import { Button } from "components/Button";
import { DisplayField } from "components/DisplayField";
import { IconButton } from "components/IconButton";
import Radio from "components/Radio";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { FullPageOverlayLoader } from "components/loaders/FullPageOverlayLoader";
import BaseModal, {
  ActionRow,
  BaseModalControlsWrapper,
  BaseModalHeaderWrapper,
  BaseModalUpperContentWrapper,
} from "components/modals/BaseModal";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { useTeamMemberUpdate } from "features/team/hooks/useTeamMemberUpdate";
import { User } from "features/team/models/user";
import { selectedTeamMemberAtom } from "features/team/state/selectedTeamMember";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IconAlertCircle, IconX } from "@tabler/icons";
import { TeamMemberRole } from "../../TeamMemberInvite/TeamMemberInviteFormContent";
import { hasPermissionsToChangeRole, hasPermissionsToGrantAndRevokeRoles } from "./helpers";

const InfoWrapper = styled.div`
  margin-top: 26px;
  margin-bottom: 20px;
  background: #fef6f5;
  border: 1px solid #ea4335;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  gap: 8px;

  & > .icon {
    color: #ea4335;
  }
`;

interface ChangeRoleModalProps {
  callback: (user: User) => void;
}

export const ChangeRoleModal = ({ callback }: ChangeRoleModalProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const teamMember = useRecoilValue(selectedTeamMemberAtom)!;
  const currentUser = useRecoilValue(currentUserAtom)!;
  const currentRole = teamMember.role;
  const isCurrentUser = currentUser?.userId === teamMember.userId;
  const [newRole, setNewRole] = useState(currentRole);
  const { mutation, data, loading, error } = useTeamMemberUpdate();

  const hasPermissionsToChangeRoles = useMemo(() => {
    return (
      !isCurrentUser &&
      hasPermissionsToChangeRole({ currentUserRole: currentUser.role, currentTeamMemberRole: currentRole })
    );
  }, [currentUser.role, currentRole, isCurrentUser]);

  const onClose = () => setOpen(false);

  const onConfirm = () => {
    mutation({
      userId: teamMember.userId,
      projectId: teamMember.projectId,
      role: newRole,
    });
  };

  useEffect(() => {
    if (!error && !loading && data?.teamMemberUpdate.userId) {
      callback({ ...teamMember, role: newRole });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return (
    <>
      {loading && <FullPageOverlayLoader />}
      <DisplayField
        label={t("role")}
        text={currentRole[0] + currentRole.substring(1).toLowerCase()}
        customButtonText={t("change")}
        showCustomButton={hasPermissionsToChangeRoles}
        onClick={() => setOpen(true)}
      />
      <BaseModal open={open} customWidth={600}>
        <BaseModalUpperContentWrapper>
          <BaseModalHeaderWrapper>
            <Typography typographyType="h3">{t("team.change-role")}</Typography>
            <IconButton onClick={() => onClose()} type="button">
              <IconX />
            </IconButton>
          </BaseModalHeaderWrapper>
          <BaseModalControlsWrapper>
            <Typography typographyType="body">
              {t("team.change-role-info")} <b>{teamMember.fullName}</b>
            </Typography>
            {hasPermissionsToGrantAndRevokeRoles({
              currentUserRole: currentUser.role,
              targetRole: TeamMemberRole.OWNER,
            }) && (
              <Row ai="end" mb={1}>
                <Radio
                  label={`${t("roles.Owner")} ${
                    currentRole === TeamMemberRole.OWNER ? `(${t("team.current-role")})` : ""
                  }`}
                  checked={newRole === TeamMemberRole.OWNER}
                  onClick={() => setNewRole(TeamMemberRole.OWNER)}
                />
              </Row>
            )}
            {hasPermissionsToGrantAndRevokeRoles({
              currentUserRole: currentUser.role,
              targetRole: TeamMemberRole.ADMIN,
            }) && (
              <Row ai="end" mb={1}>
                <Radio
                  label={`${t("roles.Admin")} ${
                    currentRole === TeamMemberRole.ADMIN ? `(${t("team.current-role")})` : ""
                  }`}
                  checked={newRole === TeamMemberRole.ADMIN}
                  onClick={() => setNewRole(TeamMemberRole.ADMIN)}
                />
              </Row>
            )}
            {hasPermissionsToGrantAndRevokeRoles({
              currentUserRole: currentUser.role,
              targetRole: TeamMemberRole.MANAGER,
            }) && (
              <Row ai="end" mb={1}>
                <Radio
                  label={`${t("roles.Manager")} ${
                    currentRole === TeamMemberRole.MANAGER ? `(${t("team.current-role")})` : ""
                  }`}
                  checked={newRole === TeamMemberRole.MANAGER}
                  onClick={() => setNewRole(TeamMemberRole.MANAGER)}
                />
              </Row>
            )}
            {hasPermissionsToGrantAndRevokeRoles({
              currentUserRole: currentUser.role,
              targetRole: TeamMemberRole.STAFF,
            }) && (
              <Row ai="end" mb={1}>
                <Radio
                  label={`${t("roles.Staff")} ${
                    currentRole === TeamMemberRole.STAFF ? `(${t("team.current-role")})` : ""
                  }`}
                  checked={newRole === TeamMemberRole.STAFF}
                  onClick={() => setNewRole(TeamMemberRole.STAFF)}
                />
              </Row>
            )}
            <InfoWrapper>
              <IconAlertCircle className="icon" size={20} />
              <Typography typographyType="body" as="span">
                {t("team.change-role-warning")}
              </Typography>
            </InfoWrapper>
          </BaseModalControlsWrapper>
        </BaseModalUpperContentWrapper>

        <ActionRow>
          <Button buttonType="secondary" type="button" fillWidth={false} onClick={() => onClose()}>
            {t("cancel")}
          </Button>
          <Button
            buttonType="danger"
            fillWidth={false}
            type="button"
            onClick={() => {
              onClose();
              onConfirm();
            }}
            disabled={newRole === null || newRole === currentRole}
          >
            {t("team.change-role")}
          </Button>
        </ActionRow>
      </BaseModal>
    </>
  );
};
