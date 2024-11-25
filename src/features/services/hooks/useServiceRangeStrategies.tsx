import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { requestTriggerAtom } from "helpers/state/requestTriggerAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { RangeServiceStrategiesQueryResult, RangeServiceStrategiesQueryVariables } from "../api/queries/models";
import { SERVICE_RANGE_STRATEGIES } from "../api/queries/serviceRangeStrategies";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useServiceRangeStrategies = (serviceId: string) => {
  const refetchTrigger = useRecoilValue(requestTriggerAtom("AVAILABILITIES"));
  const setApiState = useSetRecoilState(apiStatusAtom("GET_STRATEGIES"));
  const queryOptions = useDefaultQueryOptions<RangeServiceStrategiesQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data, loading, refetch } = useQuery<RangeServiceStrategiesQueryResult, RangeServiceStrategiesQueryVariables>(
    SERVICE_RANGE_STRATEGIES,
    {
      ...queryOptions,
      variables: { serviceId, projectId: selectedProject ?? "" },
      skip: serviceId === "" || selectedProject === undefined,
    },
  );
  const setSelectedStrategies = useSetRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    const newData = data?.serviceRangeStrategies && [...data.serviceRangeStrategies];

    setSelectedStrategies(newData ?? []);

    return () => {
      setSelectedStrategies([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setSelectedStrategies]);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    refetch();
  }, [refetchTrigger, refetch]);
};
