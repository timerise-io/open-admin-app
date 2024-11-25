import { useEffect, useMemo } from "react";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { projectsAtom } from "features/project/state/projectsAtom";
import _ from "lodash";
import useDimensions from "react-cool-dimensions";
import { useRecoilValue } from "recoil";
import { useProjectInvite } from "./useProjectInvite.hook";
import { useSwitchProject } from "./useSwitchProject.hook";

export const useProjectNavigation = () => {
  const { observe, height } = useDimensions();
  const { switchProject, selectedProjectId } = useSwitchProject();
  const projects = useRecoilValue(projectsAtom);
  const { projectInvite, setProjectInvite, acceptInvitation, declineInvitation, declineData, acceptData } =
    useProjectInvite(switchProject);

  const currentUser = useRecoilValue(currentUserAtom);

  const projectsList = useMemo(() => Object.values(projects ?? {}), [projects]);

  useEffect(() => {
    if (projectsList.length > 0 && _.every(projectsList, (item) => item.pendingTeamMemberInvite)) {
      setProjectInvite(projectsList[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectsList]);

  useEffect(() => {
    if (currentUser && selectedProjectId && projects && projects[selectedProjectId]) {
      const project = projects[selectedProjectId];

      window.analytics.identify(
        currentUser.userId,
        {
          projectId: project.projectId,
          name: currentUser.fullName,
          email: currentUser.email,
          projectTitle: project.title,
          projectDefaultLocale: project.defaultLocale ?? "",
          projectLocalTimeZone: project.localTimeZone ?? "",
          subscriptionTitle: project.subscriptionPlan.title,
        },
        {
          integrations: {
            Intercom: {
              user_hash: currentUser.intercomUserHash,
            },
          },
        },
      );
    }
  }, [projects, selectedProjectId, currentUser]);

  return {
    observe,
    height,
    switchProject,
    selectedProjectId,
    projects: projectsList,
    projectInvite,
    setProjectInvite,
    acceptInvitation,
    declineInvitation,
    declineData,
    acceptData,
  };
};
