import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { CURRENT_USER } from "../api/queries/currentUser";
import { CurrentUserResult, CurrentUserVariables } from "../api/queries/models";
import { currentUserAtom } from "../state/currentUserAtom";

export const useCurrentUser = () => {
  const queryOptions = useDefaultQueryOptions<CurrentUserVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useQuery<CurrentUserResult, CurrentUserVariables>(CURRENT_USER, {
    ...queryOptions,
    variables: { projectId: selectedProject ?? "" },
    skip: selectedProject === undefined,
  });

  const setCurrentUser = useSetRecoilState(currentUserAtom);

  useEffect(() => {
    if (data !== undefined && data.me) {
      setCurrentUser({ ...data.me, photoUrl: data.me.photoUrl ?? "" });
    }
  }, [data, setCurrentUser]);
};
