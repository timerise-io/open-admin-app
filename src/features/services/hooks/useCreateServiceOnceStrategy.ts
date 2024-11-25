import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { SERVICE_ONCE_STRATEGY_CREATE } from "../api/mutations/createServiceOnceStrategy";
import { ServiceOnceStrategyCreateRangeResult, ServiceOnceStrategyCreateRangeVariables } from "../api/mutations/models";
import { ServiceOnceStrategy } from "../model/serviceSlotStrategie";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useCreateServiceOnceStrategy = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceOnceStrategyCreateRangeResult,
    ServiceOnceStrategyCreateRangeVariables
  >({
    mutation: SERVICE_ONCE_STRATEGY_CREATE,
    loader: "CREATE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceOnceStrategyCreate) {
      setStrategies([...strategies, { ...data.serviceOnceStrategyCreate } as ServiceOnceStrategy]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { mutation, data };
};
