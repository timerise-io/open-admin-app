import { useEffect, useState } from "react";
import { useAcceptInvitation } from "features/project/hooks/useAcceptInvitation";
import { useRejectInvitation } from "features/project/hooks/useRejectInvitation";
import { Project } from "features/project/model/project";

export const useProjectInvite = (switchProject: (project: Project) => void) => {
  const [projectInvite, setProjectInvite] = useState<Project | null>(null);

  const { mutation: acceptMutation, data: acceptData, variables: acceptVariables } = useAcceptInvitation();

  const { mutation: declineMutation, data: declineData, variables: rejectVariables } = useRejectInvitation();

  useEffect(() => {
    if (
      acceptData?.teamMemberInvitationAccept === "ok" &&
      projectInvite !== null &&
      acceptVariables !== null &&
      acceptVariables.projectId === projectInvite.projectId
    ) {
      switchProject(projectInvite);
      setProjectInvite(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptData, projectInvite, acceptVariables]);

  useEffect(() => {
    if (
      declineData?.teamMemberInvitationReject === "ok" &&
      projectInvite !== null &&
      rejectVariables !== null &&
      rejectVariables.projectId === projectInvite.projectId
    ) {
      setProjectInvite(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [declineData, projectInvite, rejectVariables]);

  return {
    projectInvite,
    setProjectInvite,
    acceptInvitation: () => {
      projectInvite && acceptMutation({ projectId: projectInvite.projectId });
    },
    declineInvitation: () => {
      projectInvite && declineMutation({ projectId: projectInvite.projectId });
    },
    acceptData,
    declineData,
    acceptVariables,
    rejectVariables,
  };
};
