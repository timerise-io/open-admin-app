import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { CREATE_GHOST_USER, CreateGhostUserResult, CreateGhostUserVariables } from "../api/mutations/createGhostUser";

export const useCreateGhostUser = () => {
  const { mutation, data } = useTimeriseMutation<CreateGhostUserResult, CreateGhostUserVariables>({
    mutation: CREATE_GHOST_USER,
    loader: "CREATE_GHOST_USER",
    trigger: "TEAM_MEMBERS",
    successToast: { variant: "SUCCESS", type: "data-save", date: 0 },
    failToast: { variant: "ERROR", type: "data-save", date: 0 },
  });

  return {
    mutation: (values: CreateGhostUserVariables) => {
      mutation(values);
    },
    data,
  };
};
