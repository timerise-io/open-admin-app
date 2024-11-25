import { useEffect, useState } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { DELETE_SERVICE_SLOT } from "../api/mutations/deleteServiceSlot";
import { ServiceSlotDeleteVariables } from "../api/mutations/models";
import { selectedServiceExceptionsAtom } from "../state/selectedServiceExceptionsAtom";

export const useDeleteServiceSlot = () => {
  const [slotId, setSlotId] = useState("");

  const { mutation, data, error, loading } = useTimeriseMutation<any, ServiceSlotDeleteVariables>({
    mutation: DELETE_SERVICE_SLOT,
    loader: "DELETE_SERVICE_SLOT",
  });

  const [exceptions, setExceptions] = useRecoilState(selectedServiceExceptionsAtom);

  useEffect(() => {
    if (!error && !loading && slotId) {
      const newData = exceptions.filter((item) => item.slotId !== slotId);

      setExceptions([...newData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading]);

  return {
    mutation: (values: ServiceSlotDeleteVariables) => {
      setSlotId(values.slotId);
      mutation(values);
    },
    data,
  };
};
