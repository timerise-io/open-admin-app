import { useEffect } from "react";
import { firebaseAuth } from "firebase-config/connection";
import { User } from "firebase/auth";

type UseTokenExpirationCounter = ({
  setTokenExpired,
  user,
}: {
  setTokenExpired: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
}) => void;

export const useTokenExpirationCounter: UseTokenExpirationCounter = ({ setTokenExpired, user }) => {
  useEffect(() => {
    const handleAuthStateChanged = async () => {
      if (user) {
        try {
          const idTokenResult = await user.getIdTokenResult();
          const expirationTimeString = idTokenResult.expirationTime;
          const expirationTime = new Date(expirationTimeString).getTime();
          const currentTime = new Date().getTime();
          const expiresIn: number = expirationTime - currentTime;

          setTokenExpired(false);

          if (expiresIn > 0) {
            setTimeout(() => {
              setTokenExpired(true);
            }, expiresIn);
          } else {
            setTokenExpired(true);
          }
        } catch (error) {
          setTokenExpired(true);
        }
      } else {
        setTokenExpired(true);
      }
    };

    handleAuthStateChanged();

    const unsubscribe = firebaseAuth.onAuthStateChanged(handleAuthStateChanged);

    return () => {
      unsubscribe();
    };
  }, [setTokenExpired, user]);
};
