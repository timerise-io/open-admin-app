import React from "react";
import DeleteModalInfo from "components/DeleteModalInfo";
import { Typography } from "components/Typography";
import DestructiveButton from "components/buttons/DestructiveButton";
import { ROUTES } from "constans/routes";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useTeamMemberDelete } from "features/team/hooks/useTeamMemberDelete";
import { selectedTeamMemberAtom } from "features/team/state/selectedTeamMember";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export const DeleteTeamMemberButton = () => {
  const { t } = useTranslation();
  const selectedProject = useRecoilValue(selectedProjectSelector);
  const selectedTeamMember = useRecoilValue(selectedTeamMemberAtom);
  const navigate = useNavigate();
  const { mutation } = useTeamMemberDelete({
    successCallback: () => {
      navigate(ROUTES.team, { replace: true });
    },
  });

  return (
    <DestructiveButton
      buttonText={t("team.delete-user")}
      modalTitle={t("team.delete-team-member")}
      onDestruction={() => {
        if (selectedProject === undefined || selectedTeamMember === undefined) return;

        mutation({
          projectId: selectedProject.projectId,
          userId: selectedTeamMember?.userId,
        });
      }}
      customWidth={600}
    >
      <Typography typographyType="body" as="span">
        {t("team.delete-team-member-info")} <b>{selectedTeamMember?.fullName}</b>?
      </Typography>
      <DeleteModalInfo text={t("team.delete-team-member-warning")}></DeleteModalInfo>
    </DestructiveButton>
  );
};
