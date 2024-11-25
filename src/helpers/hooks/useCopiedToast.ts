import { toastAtom } from "features/toast/state/toastAtom";
import { useRecoilState } from "recoil";

export const useCopiedToast = () => {
  const [currentToast, setCurrentToast] = useRecoilState(toastAtom);

  const showCopiedToast = () => {
    setCurrentToast([
      ...currentToast,
      {
        variant: "SUCCESS",
        type: "copied",
        date: new Date().getTime(),
      },
    ]);
  };

  return showCopiedToast;
};
