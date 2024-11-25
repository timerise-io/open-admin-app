import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { ServiceSlotStrategyUpdateResult, ServiceSlotStrategyUpdateVariables } from "../api/mutations/models";
import { SERVICE_SLOT_STRATEGY_UPDATE } from "../api/mutations/updateServiceStrategy";
import { selectedStrategiesAtom } from "../state/selectedStrategiesAtom";

export const useUpdateServiceSlotsStrategy = () => {
  // const [strategyId, setStrategyId] = useState("");

  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceSlotStrategyUpdateResult,
    ServiceSlotStrategyUpdateVariables
  >({
    mutation: SERVICE_SLOT_STRATEGY_UPDATE,
    loader: "UPDATE_SERVICE_STRATEGY",
  });

  const [strategies, setStrategies] = useRecoilState(selectedStrategiesAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceSlotStrategyUpdate.strategyId) {
      const newStrategies = strategies.map((item) =>
        item.strategyId !== data.serviceSlotStrategyUpdate.strategyId ? item : { ...data.serviceSlotStrategyUpdate },
      );

      setStrategies([...newStrategies]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: ServiceSlotStrategyUpdateVariables) => {
      // setStrategyId(values.strategyId);
      mutation(values);
    },
    data,
  };
};
