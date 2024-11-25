import { useEffect } from "react";
import { useDefaultMutationOptions } from "features/api/hooks/useDefaultMutationOptions";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { useToast } from "features/toast/hooks/useToast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { UpdateThemeMutationResult, UpdateThemeMutationVariables } from "../api/mutations/models";
import { UPDATE_PROJECT } from "../api/mutations/updateTheme";
import { projectsAtom } from "../state/projectsAtom";

export const useUpdateProject = () => {
  const showToast = useToast();
  const [projects, setProjects] = useRecoilState(projectsAtom);
  const setSpiState = useSetRecoilState(apiStatusAtom("UPDATE_THEME"));

  const queryOptions = useDefaultMutationOptions<UpdateThemeMutationVariables>();
  const [updateThemeMutation, { data, loading, error }] = useMutation<
    UpdateThemeMutationResult,
    UpdateThemeMutationVariables
  >(UPDATE_PROJECT);

  useEffect(() => {
    const themeAfterUpdate = data?.projectUpdate.theme;
    const themeIsState = projects?.[data?.projectUpdate.projectId ?? ""]?.theme;
    const logoUrlAfterUpdate = data?.projectUpdate.logoUrl;
    const logoUrlIsState = projects?.[data?.projectUpdate.projectId ?? ""]?.logoUrl;

    if (themeAfterUpdate === themeIsState && logoUrlAfterUpdate === logoUrlIsState) return;

    if (data && !loading && !error && projects && data.projectUpdate) {
      showToast({
        variant: "SUCCESS",
        type: "data-save",
        date: new Date().getTime(),
      });
      setProjects({
        ...projects,
        [data.projectUpdate.projectId]: {
          ...projects[data.projectUpdate.projectId],
          theme: data.projectUpdate.theme,
          logoUrl: data.projectUpdate.logoUrl,
        },
      });
    } else if (data && !loading && !error && data.projectUpdate) {
      setSpiState({ state: "ERROR" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading, projects, setProjects, setSpiState]);

  return (variables: UpdateThemeMutationVariables) => {
    updateThemeMutation({ ...queryOptions, variables: { ...variables } });
  };
};
