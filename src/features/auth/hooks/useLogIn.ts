import { useEffect } from "react";
import { firebaseAnalytics, firebaseAuth } from "firebase-config/connection";
import { logEvent } from "firebase/analytics";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useMutation } from "@apollo/client/react/hooks/useMutation";
import { signInWithCustomToken } from "@firebase/auth";
import { LOG_IN } from "../api/mutations/login";
import { LogInMutationResult, LogInMutationVariables } from "../api/mutations/models";
import { apiStatusAtom } from "../api/state/apiStatusAtom";

export const useLogIn = () => {
  const navigate = useNavigate();

  const setSpiState = useSetRecoilState(apiStatusAtom("LOGIN"));

  const [logInMutation, { data, loading, error }] = useMutation<LogInMutationResult, LogInMutationVariables>(LOG_IN);

  useEffect(() => {
    if (data && !loading && !error && data.login) {
      signInWithCustomToken(firebaseAuth, data.login).then(() => {
        navigate("/bookings");
        logEvent(firebaseAnalytics, "login");
        setSpiState({ state: "SUCCESS" });
      });
    } else if (!loading && !!error) {
      setSpiState({ state: "ERROR" });
    }
  }, [data, loading, error, navigate, setSpiState]);

  return logInMutation;
};
