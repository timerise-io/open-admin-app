import { useEffect } from "react";
import { useTimeriseMutation } from "features/api/hooks/useTimeriseMutation";
import { useRecoilState } from "recoil";
import { CREATE_SLOT } from "../api/mutations/createSlot";
import { CreateSlotResult, CreateSlotVariables } from "../api/mutations/models";
import { selectedServiceExceptionsAtom } from "../state/selectedServiceExceptionsAtom";

export const useCreateSlot = () => {
  const { mutation, data, error, loading } = useTimeriseMutation<CreateSlotResult, CreateSlotVariables>({
    mutation: CREATE_SLOT,
    loader: "CREATE_SERVICE_SLOT",
  });

  const [exceptions, setExceptions] = useRecoilState(selectedServiceExceptionsAtom);

  useEffect(() => {
    if (!error && !loading && data?.serviceSlotCreate) {
      setExceptions([...exceptions, { ...data.serviceSlotCreate }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { mutation, data };
};
