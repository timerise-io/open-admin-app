import { useState } from "react";
import { firebaseAuth } from "firebase-config/connection";
import { useSetRecoilState } from "recoil";
import { authUserAtom } from "../state/authUserAtom";
import { useTokenExpirationCounter } from "./useTokenExpirationCounter";

export const useRefreshToken = () => {
  const [tokenExpired, setTokenExpired] = useState(false);
  const setAuthUserAtom = useSetRecoilState(authUserAtom);

  const refreshExpirationTime = async () => {
    try {
      await firebaseAuth.currentUser?.getIdToken(true);
      setTokenExpired(false);

      const user = firebaseAuth.currentUser;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        setAuthUserAtom({
          state: "logged",
          user: {
            name: user.displayName ?? "",
            email: user.email ?? "",
            token: idTokenResult.token ?? "",
          },
        });
      }
    } catch (error) {
      setTokenExpired(true);
    }
  };

  useTokenExpirationCounter({ setTokenExpired, user: firebaseAuth.currentUser });

  return { tokenExpired, refreshExpirationTime };
};
