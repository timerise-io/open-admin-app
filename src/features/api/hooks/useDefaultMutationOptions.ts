import { tokenSelector } from "features/auth/state/tokenSelector";
import { useRecoilValue } from "recoil";
import { MutationHookOptions } from "@apollo/client/react/types/types";

export const useDefaultMutationOptions = <V>(): MutationHookOptions<any, V> => {
  const token = useRecoilValue(tokenSelector);

  return {
    context: {
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "x-api-client-name": "admin-app",
      },
    },
  };
};
