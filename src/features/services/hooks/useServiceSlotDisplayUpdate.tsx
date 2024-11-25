import { useEffect } from "react";
import { useDefaultMutationOptions } from "features/api/hooks/useDefaultMutationOptions";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { useToast } from "features/toast/hooks/useToast";
import { useSetRecoilState } from "recoil";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import {
  UpdateServiceSlotUpdateMutationResult,
  UpdateServiceSlotUpdateMutationVariables,
} from "../api/mutations/models";
import { UPDATE_SLOT_DISPLAY } from "../api/mutations/updateSlotDisplay";

export const useServiceSlotDisplayUpdate = () => {
  const setApiState = useSetRecoilState(apiStatusAtom("UPDATE_SLOT_DISPLAY"));
  const showToast = useToast();

  const queryOptions = useDefaultMutationOptions<UpdateServiceSlotUpdateMutationVariables>();
  const [createServiceMutation, { data, loading, error }] = useMutation<
    UpdateServiceSlotUpdateMutationResult,
    UpdateServiceSlotUpdateMutationVariables
  >(UPDATE_SLOT_DISPLAY);

  useEffect(() => {
    if (data && !loading && !error && data.serviceUpdate) {
      setApiState({ state: "ERROR" });
    }
  }, [data, error, loading, setApiState]);

  useEffect(() => {
    if (loading) return;

    if (error) {
      showToast({ variant: "ERROR", type: "data-save", date: 0 });
    } else if (data) {
      showToast({ variant: "SUCCESS", type: "data-save", date: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return {
    mutation: (variables: UpdateServiceSlotUpdateMutationVariables) => {
      createServiceMutation({ ...queryOptions, variables: { ...variables } });
    },
    data,
  };
};
