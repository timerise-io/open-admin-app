import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SpacesQueryResult, SpacesQueryVariables } from "../api/models";
import { SPACES } from "../api/queries/spaces";
import { Space } from "../model/space";
import { spacesAtom } from "../state/spacesAtom";
import { spacesFilterSelector } from "../state/spacesFilterAtom";

export const useSpaces = () => {
  const filters = useRecoilValue(spacesFilterSelector);
  const setApiState = useSetRecoilState(apiStatusAtom("GET_SPACES"));
  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data, loading } = useTimeriseQuery<SpacesQueryResult, SpacesQueryVariables>({
    query: SPACES,
    loader: "SPACES",
    variables: { query: filters.text, projectId: selectedProject ?? "" },
    skip: !selectedProject,
    trigger: "SPACES",
  });

  const setSpaces = useSetRecoilState(spacesAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const spacesData: Record<string, Space> | undefined = data?.spaces.reduce((acc, item) => {
      return { ...acc, [item.spaceId]: { ...item } };
    }, {});
    setSpaces(spacesData);
  }, [data, setSpaces]);
};
