import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { SERVICE_RANGE_STRATEGY_CREATE } from "../api/mutations/createServiceRangeStrategy";
import { ServiceDaysStrategyCreateRangeResult, ServiceDaysStrategyCreateRangeVariables } from "../api/mutations/models";
import { ServiceRangeStrategy } from "../model/serviceSlotStrategie";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useCreateServiceRangeStrategy = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceDaysStrategyCreateRangeResult,
    ServiceDaysStrategyCreateRangeVariables
  >({
    mutation: SERVICE_RANGE_STRATEGY_CREATE,
    loader: "CREATE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceRangeStrategyCreate) {
      setStrategies([...strategies, { ...data.serviceRangeStrategyCreate } as ServiceRangeStrategy]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { mutation, data };
};
