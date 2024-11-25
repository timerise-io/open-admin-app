import { useEffect } from "react";
import { firebaseAuth } from "firebase-config/connection";
import { useSetRecoilState } from "recoil";
import { authUserAtom } from "../state/authUserAtom";

export const useFirebaseAuth = () => {
  const setAuthUserAtom = useSetRecoilState(authUserAtom);

  useEffect(() => {
    const revokeAuthSubscription = firebaseAuth.onIdTokenChanged(
      async (next) => {
        if (next) {
          setAuthUserAtom({
            state: "logged",
            user: {
              name: next.displayName ?? "",
              email: next.email ?? "",
              token: await next.getIdToken(),
            },
          });
        } else {
          setAuthUserAtom({ state: "loggedOut" });
        }
      },
      (error) => {
        setAuthUserAtom({ state: "loggedOut" });
      },
    );

    return () => {
      revokeAuthSubscription();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
