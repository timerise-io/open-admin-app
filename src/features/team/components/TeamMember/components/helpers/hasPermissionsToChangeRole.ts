import { Roles } from "features/auth/model/currentUser";
import { TeamMemberRole } from "features/team/components/TeamMemberInvite/TeamMemberInviteFormContent";

type HasPermissionsToChangeRole = ({
  currentUserRole,
  currentTeamMemberRole,
}: {
  currentUserRole: Roles;
  currentTeamMemberRole: Roles;
}) => boolean;

type HasPermissionsToGrantAndRevokeRoles = ({
  currentUserRole,
  targetRole,
}: {
  currentUserRole: Roles;
  targetRole: TeamMemberRole;
}) => boolean;

const rolePermissions = {
  OWNER: {
    canChangeRoles: true,
    canGrantAndRevokeRoles: true,
    cannotGrantOWNER: true,
    cannotRevokeOWNER: true,
    cannotGrantADMIN: false,
    cannotRevokeADMIN: false,
    cannotGrantAPIADMIN: false,
    cannotRevokeAPIADMIN: false,
    cannotGrantSUPERADMIN: true,
    cannotRevokeSUPERADMIN: true,
    cannotGrantMANAGER: false,
    cannotRevokeMANAGER: false,
    cannotGrantSTAFF: false,
    cannotRevokeSTAFF: false,
    cannotGrantUSER: false,
    cannotRevokeUSER: false,
  },
  ADMIN: {
    canChangeRoles: true,
    canGrantAndRevokeRoles: true,
    cannotGrantOWNER: true,
    cannotRevokeOWNER: true,
    cannotGrantADMIN: false,
    cannotRevokeADMIN: false,
    cannotGrantAPIADMIN: false,
    cannotRevokeAPIADMIN: false,
    cannotGrantSUPERADMIN: true,
    cannotRevokeSUPERADMIN: true,
    cannotGrantMANAGER: false,
    cannotRevokeMANAGER: false,
    cannotGrantSTAFF: false,
    cannotRevokeSTAFF: false,
    cannotGrantUSER: false,
    cannotRevokeUSER: false,
  },
  APIADMIN: {
    canChangeRoles: true,
    canGrantAndRevokeRoles: true,
    cannotGrantOWNER: true,
    cannotRevokeOWNER: true,
    cannotGrantADMIN: true,
    cannotRevokeADMIN: true,
    cannotGrantAPIADMIN: true,
    cannotRevokeAPIADMIN: true,
    cannotGrantSUPERADMIN: true,
    cannotRevokeSUPERADMIN: true,
    cannotGrantMANAGER: false,
    cannotRevokeMANAGER: false,
    cannotGrantSTAFF: false,
    cannotRevokeSTAFF: false,
    cannotGrantUSER: false,
    cannotRevokeUSER: false,
  },
  SUPERADMIN: {
    canChangeRoles: true,
    canGrantAndRevokeRoles: true,
    cannotGrantOWNER: true,
    cannotRevokeOWNER: true,
    cannotGrantADMIN: false,
    cannotRevokeADMIN: false,
    cannotGrantAPIADMIN: false,
    cannotRevokeAPIADMIN: false,
    cannotGrantSUPERADMIN: false,
    cannotRevokeSUPERADMIN: false,
    cannotGrantMANAGER: false,
    cannotRevokeMANAGER: false,
    cannotGrantSTAFF: false,
    cannotRevokeSTAFF: false,
    cannotGrantUSER: false,
    cannotRevokeUSER: false,
  },
  DEVELOPER: {
    canChangeRoles: true,
    canGrantAndRevokeRoles: true,
    cannotGrantOWNER: true,
    cannotRevokeOWNER: true,
    cannotGrantADMIN: false,
    cannotRevokeADMIN: false,
    cannotGrantAPIADMIN: false,
    cannotRevokeAPIADMIN: false,
    cannotGrantSUPERADMIN: true,
    cannotRevokeSUPERADMIN: true,
    cannotGrantMANAGER: false,
    cannotRevokeMANAGER: false,
    cannotGrantSTAFF: false,
    cannotRevokeSTAFF: false,
    cannotGrantUSER: false,
    cannotRevokeUSER: false,
  },
  MANAGER: {
    canChangeRoles: true,
    canGrantAndRevokeRoles: true,
    cannotGrantOWNER: true,
    cannotRevokeOWNER: true,
    cannotGrantADMIN: true,
    cannotRevokeADMIN: true,
    cannotGrantAPIADMIN: true,
    cannotRevokeAPIADMIN: true,
    cannotGrantSUPERADMIN: true,
    cannotRevokeSUPERADMIN: true,
    cannotGrantMANAGER: false,
    cannotRevokeMANAGER: false,
    cannotGrantSTAFF: false,
    cannotRevokeSTAFF: false,
    cannotGrantUSER: false,
    cannotRevokeUSER: false,
  },
  STAFF: {
    canChangeRoles: false,
    canGrantAndRevokeRoles: false,
    cannotGrantOWNER: true,
    cannotRevokeOWNER: true,
    cannotGrantADMIN: true,
    cannotRevokeADMIN: true,
    cannotGrantAPIADMIN: true,
    cannotRevokeAPIADMIN: true,
    cannotGrantSUPERADMIN: true,
    cannotRevokeSUPERADMIN: true,
    cannotGrantMANAGER: true,
    cannotRevokeMANAGER: true,
    cannotGrantSTAFF: true,
    cannotRevokeSTAFF: true,
    cannotGrantUSER: true,
    cannotRevokeUSER: true,
  },
  USER: {
    canChangeRoles: false,
    canGrantAndRevokeRoles: false,
    cannotGrantOWNER: true,
    cannotRevokeOWNER: true,
    cannotGrantADMIN: true,
    cannotRevokeADMIN: true,
    cannotGrantAPIADMIN: true,
    cannotRevokeAPIADMIN: true,
    cannotGrantSUPERADMIN: true,
    cannotRevokeSUPERADMIN: true,
    cannotGrantMANAGER: true,
    cannotRevokeMANAGER: true,
    cannotGrantSTAFF: true,
    cannotRevokeSTAFF: true,
    cannotGrantUSER: true,
    cannotRevokeUSER: true,
  },
};

export const hasPermissionsToChangeRole: HasPermissionsToChangeRole = ({ currentUserRole, currentTeamMemberRole }) => {
  const permissions = rolePermissions[currentUserRole];

  if (!permissions) return false;

  return (
    permissions?.canChangeRoles &&
    !permissions[`cannotGrant${currentTeamMemberRole}`] &&
    !permissions[`cannotRevoke${currentTeamMemberRole}`]
  );
};

export const hasPermissionsToGrantAndRevokeRoles: HasPermissionsToGrantAndRevokeRoles = ({
  currentUserRole,
  targetRole,
}) => {
  const permissions = rolePermissions[currentUserRole];

  if (!permissions) return false;

  return (
    permissions?.canChangeRoles &&
    permissions.canGrantAndRevokeRoles &&
    !permissions[`cannotGrant${targetRole}`] &&
    !permissions[`cannotRevoke${targetRole}`]
  );
};
