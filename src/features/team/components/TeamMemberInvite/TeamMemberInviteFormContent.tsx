import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import FormSelect from "components/forms/FormSelect";
import TextField from "components/forms/TextField";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

export enum TeamMemberRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  STAFF = "STAFF",
}

export interface TeamMemberInviteFormValues {
  role: TeamMemberRole;
  email: string;
}

const TeamMemberInviteFormContent = () => {
  const { t } = useTranslation();
  const teamMemberRoleMap: Record<TeamMemberRole, string> = {
    OWNER: t("roles.Owner"),
    ADMIN: t("roles.Admin"),
    MANAGER: t("roles.Manager"),
    STAFF: t("roles.Staff"),
  };
  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("common:details")}
      </StyledHeader>
      <Card>
        <FormSelect name="role" options={teamMemberRoleMap} label={t("role")} />
        <TextField name="email" label={t("email")} />
      </Card>
    </>
  );
};

export default TeamMemberInviteFormContent;
