import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import _ from "lodash";
import { useSetRecoilState } from "recoil";
import { ProjectsQueryVariables, ProjectsResult } from "../api/queries/models";
import { PROJECTS } from "../api/queries/projects";
import { projectsAtom } from "../state/projectsAtom";
import { selectedProjectAtom } from "../state/selectedProjectAtom";

export const useProjects = () => {
  const { data } = useTimeriseQuery<ProjectsResult, ProjectsQueryVariables>({
    query: PROJECTS,
    loader: "PROJECTS",
    variables: {},
    trigger: "PROJECTS",
  });

  const setProjects = useSetRecoilState(projectsAtom);
  const setSelectedProject = useSetRecoilState(selectedProjectAtom);

  useEffect(() => {
    if (data !== undefined) {
      if (data.projects.length > 0) {
        const selectedProjectId = localStorage.getItem("selectedProjectId");

        const projectsIds = Object.values(data.projects).map((item) => item.projectId);

        const isSelectedProjectIdExists =
          selectedProjectId !== null ? projectsIds.filter((item) => item === selectedProjectId).length > 0 : false;

        setSelectedProject(
          isSelectedProjectIdExists
            ? selectedProjectId ?? data.projects[0].projectId
            : _.find(data.projects, (item) => {
                return item.pendingTeamMemberInvite !== true;
              })?.projectId ?? data.projects[0].projectId,
        );
      }

      const projectsMap = data.projects.reduce((acc, item) => {
        return { ...acc, [item.projectId]: { ...item } };
      }, {});

      setProjects(projectsMap);
    }
  }, [data, setProjects, setSelectedProject]);
};
