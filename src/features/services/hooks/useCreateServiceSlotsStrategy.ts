import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { SERVICE_SLOT_STRATEGY_CREATE } from "../api/mutations/createServiceStrategy";
import { ServiceSlotStrategyCreateResult, ServiceSlotStrategyCreateVariables } from "../api/mutations/models";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useCreateServiceSlotsStrategy = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceSlotStrategyCreateResult,
    ServiceSlotStrategyCreateVariables
  >({
    mutation: SERVICE_SLOT_STRATEGY_CREATE,
    loader: "CREATE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceSlotStrategyCreate) {
      setStrategies([...strategies, { ...data.serviceSlotStrategyCreate }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { mutation, data };
};
