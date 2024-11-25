import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import {
  UPDATE_PROJECT,
  UpdateProjectMutationResult,
  UpdateProjectMutationVariables,
} from "../api/mutations/updateProject";

type UseProjectUpdate = (withoutToast?: boolean) => {
  mutation: (variables: UpdateProjectMutationVariables) => void;
  data?: UpdateProjectMutationResult | null;
  loading: boolean;
  error: any;
};

export const useProjectUpdate: UseProjectUpdate = (withoutToast = false) => {
  const {
    mutation: updateProjectMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<UpdateProjectMutationResult, UpdateProjectMutationVariables>({
    mutation: UPDATE_PROJECT,
    loader: "UPDATE_PROJECT",
    trigger: "PROJECTS",
    successToast: withoutToast ? undefined : { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (variables: UpdateProjectMutationVariables) => {
      updateProjectMutation(variables);
    },
    data,
    loading,
    error,
  };
};
