import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { SpaceQueryResult, SpaceQueryVariables } from "../api/models";
import { SPACE } from "../api/queries/space";
import { Space } from "../model/space";
import { selectedSpaceAtom } from "../state/selectedSpaceAtom";

export const useSpace = (spaceId: string) => {
  const setApiState = useSetRecoilState(apiStatusAtom("GET_SPACES"));
  const queryOptions = useDefaultQueryOptions<SpaceQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data, loading } = useQuery<SpaceQueryResult, SpaceQueryVariables>(SPACE, {
    ...queryOptions,
    variables: { spaceId: spaceId, projectId: selectedProject ?? "" },
    skip: !selectedProject,
  });
  const setSpace = useSetRecoilState(selectedSpaceAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const space: Space | undefined = data?.space;
    setSpace(space);
  }, [data, setSpace]);
};
