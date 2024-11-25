import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SpacesQueryResult, SpacesQueryVariables } from "../api/models";
import { SPACES } from "../api/queries/spaces";
import { Space } from "../model/space";
import { spacesDictionaryAtom } from "../state/spacesDictionaryAtom";

export const useSpacesDictionary = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useTimeriseQuery<SpacesQueryResult, SpacesQueryVariables>({
    query: SPACES,
    loader: "SPACES",
    variables: { query: "", projectId: selectedProject ?? "" },
    skip: !selectedProject,
    trigger: "SPACES",
  });

  const setSpaces = useSetRecoilState(spacesDictionaryAtom);

  useEffect(() => {
    const spacesData: Record<string, Space> | undefined = data?.spaces.reduce((acc, item) => {
      return { ...acc, [item.spaceId]: { ...item } };
    }, {});
    setSpaces(spacesData);
  }, [data, setSpaces]);
};
