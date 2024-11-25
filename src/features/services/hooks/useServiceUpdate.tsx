import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useToast } from "features/toast/hooks/useToast";
import { useRecoilState } from "recoil";
import {
  UPDATE_SERVICE,
  UpdateServiceMutationResult,
  UpdateServiceMutationVariables,
} from "../api/mutations/updateService";
import { Service } from "../model/service";
import { selectedServiceAtom } from "../state/selectedServiceAtom";

export const useServiceUpdate = () => {
  const showToast = useToast();
  const [service, setService] = useRecoilState(selectedServiceAtom);

  const {
    mutation: createServiceMutation,
    data,
    loading,
    error,
  } = useTimeriseMutation<UpdateServiceMutationResult, UpdateServiceMutationVariables>({
    mutation: UPDATE_SERVICE,
    loader: "UPDATE_SERVICE",
    trigger: "SERVICES",
  });

  useEffect(() => {
    if (loading) return;

    if (!error && !loading && data?.serviceUpdate.serviceId) {
      setService({ ...service, ...(data.serviceUpdate as Service) });
    }

    if (error) {
      showToast({ variant: "ERROR", type: "data-save", date: 0 });
    } else if (data) {
      showToast({ variant: "SUCCESS", type: "data-save", date: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, loading]);

  return {
    mutation: (variables: UpdateServiceMutationVariables) => {
      createServiceMutation(variables);
    },
    data,
  };
};
