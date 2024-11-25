import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { LOCATION } from "../api/location";
import { LocationQueryResult, LocationQueryVariables } from "../api/models";
import { Location } from "../model/location";
import { selectedLocationAtom } from "../state/selectedLocationsAtom";

export const useLocation = (locationId: string) => {
  const setApiState = useSetRecoilState(apiStatusAtom("GET_LOCATIONS"));
  const queryOptions = useDefaultQueryOptions<LocationQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data, loading } = useQuery<LocationQueryResult, LocationQueryVariables>(LOCATION, {
    ...queryOptions,
    variables: { locationId: locationId, projectId: selectedProject ?? "" },
    skip: !selectedProject,
  });
  const setLocation = useSetRecoilState(selectedLocationAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const location: Location | undefined = data?.location;
    setLocation(location);
  }, [data, setLocation]);
};
