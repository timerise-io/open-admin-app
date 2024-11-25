import { tokenSelector } from "features/auth/state/tokenSelector";
import { useRecoilValue } from "recoil";
import { OperationVariables } from "@apollo/client";
import { QueryHookOptions } from "@apollo/client/react/types/types";

export const useDefaultQueryOptions = <V extends OperationVariables>(): QueryHookOptions<any, V> => {
  const token = useRecoilValue(tokenSelector);

  return {
    fetchPolicy: "no-cache",
    context: {
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "x-api-client-name": "admin-app",
      },
    },
  };
};
