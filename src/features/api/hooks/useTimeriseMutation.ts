import { useEffect } from "react";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { useToast } from "features/toast/hooks/useToast";
import { ToastAtomProps } from "features/toast/state/toastAtom";
import { DocumentNode } from "graphql";
import { ListType } from "helpers/models/ListType";
import { Loaders } from "helpers/models/Loaders";
import { requestTriggerAtom } from "helpers/state/requestTriggerAtom";
import { textFilterAtom } from "helpers/state/textFilterAtom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { OperationVariables, useMutation } from "@apollo/client";
import { useDefaultMutationOptions } from "./useDefaultMutationOptions";

interface TimeriseMutation<TResult> {
  mutation: DocumentNode;
  loader: Loaders;
  trigger?: ListType;
  successToast?: ToastAtomProps;
  failToast?: ToastAtomProps;
  successCallback?: (values: TResult) => void;
}

export const useTimeriseMutation = <TResult extends any, TVariables = OperationVariables>({
  mutation,
  loader,
  trigger,
  successToast,
  failToast,
  successCallback,
}: TimeriseMutation<TResult>) => {
  const setApiState = useSetRecoilState(apiStatusAtom(loader));
  const setTrigger = useSetRecoilState(requestTriggerAtom(trigger));
  const resetText = useResetRecoilState(textFilterAtom(trigger));
  const showToast = useToast();

  const queryOptions = useDefaultMutationOptions<TVariables>();
  const [createServiceMutation, { data, loading, error }] = useMutation<TResult, TVariables>(mutation);

  useEffect(() => {
    if (data && !loading) {
      const keys = Object.values(data as any).filter(Boolean);

      if (keys.length > 0 || error) {
        setApiState({ state: "ERROR", isLoading: false });
      } else {
        setApiState({ state: "SUCCESS", isLoading: false });
      }

      if (trigger) {
        setTrigger(new Date().getTime());
        resetText();
      }
    } else if (loading) {
      setApiState({ isLoading: true });
    }
  }, [data, error, loading, setApiState, trigger, setTrigger, resetText]);

  useEffect(() => {
    if (loading) return;

    if (error && failToast) {
      showToast({ ...failToast });
    } else if (data && successToast) {
      showToast({ ...successToast });
    }

    if (data && successCallback) {
      successCallback(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return {
    mutation: (variables: TVariables) => {
      createServiceMutation({ ...queryOptions, variables: { ...variables } });
    },
    data,
    loading,
    error,
  };
};
