import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { requestTriggerAtom } from "helpers/state/requestTriggerAtom";
import { useSetRecoilState } from "recoil";
import { ServiceStrategyMigrateResult, ServiceStrategyMigrateVariables } from "../api/mutations/models";
import { SERVICE_STRATEGY_MIGRATE } from "../api/mutations/serviceStrategyMigrate";

export const useServiceStrategyMigrate = () => {
  const setTrigger = useSetRecoilState(requestTriggerAtom("AVAILABILITIES"));
  const { mutation, data, error, loading } = useTimeriseMutation<
    ServiceStrategyMigrateResult,
    ServiceStrategyMigrateVariables
  >({
    mutation: SERVICE_STRATEGY_MIGRATE,
    loader: "CREATE_SERVICE_STRATEGY",
  });

  useEffect(() => {
    if (!error && !loading && data?.serviceStrategyMigrate === "ok") {
      setTrigger(new Date().getTime());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { mutation, data };
};
