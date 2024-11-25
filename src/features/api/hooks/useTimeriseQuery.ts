import { useEffect } from "react";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { DocumentNode } from "graphql";
import { ListType } from "helpers/models/ListType";
import { Loaders } from "helpers/models/Loaders";
import { requestTriggerAtom } from "helpers/state/requestTriggerAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { OperationVariables, useQuery } from "@apollo/client";
import { useDefaultQueryOptions } from "./useDefaultQueryOptions";

interface TimeriseQuery<T> {
  query: DocumentNode;
  loader: Loaders;
  variables: T;
  skip?: boolean;
  trigger?: ListType;
}

export const useTimeriseQuery = <TResult extends any, TVariables extends OperationVariables = OperationVariables>({
  query,
  loader,
  variables,
  skip,
  trigger,
}: TimeriseQuery<TVariables>) => {
  const triggerValue = useRecoilValue(requestTriggerAtom(trigger));

  const setApiState = useSetRecoilState(apiStatusAtom(loader));

  const queryOptions = useDefaultQueryOptions<TVariables>();
  const { data, loading, error, refetch } = useQuery<TResult, TVariables>(query, {
    ...queryOptions,
    variables,
    skip,
  });

  useEffect(() => {
    if (triggerValue > 0 && trigger && !loading) {
      refetch();
    }
  }, [trigger, loading, triggerValue, refetch]);

  useEffect(() => {
    if (data && !loading) {
      const keys = Object.values(data as any).filter(Boolean);
      if (keys.length > 0 || error) {
        setApiState({ state: "SUCCESS", isLoading: false });
      } else {
        setApiState({ state: "ERROR", isLoading: false });
      }
    } else {
      setApiState({ isLoading: true });
    }
  }, [data, error, loading, setApiState]);

  return {
    data,
    loading,
    error,
  };
};
