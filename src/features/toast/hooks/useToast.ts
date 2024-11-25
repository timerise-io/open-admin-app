import { ToastAtomProps, toastAtom } from "features/toast/state/toastAtom";
import { useRecoilState } from "recoil";

export const useToast = () => {
  const [currentToast, setCurrentToast] = useRecoilState(toastAtom);

  const showToast = (newToast: ToastAtomProps) => {
    setCurrentToast([
      ...currentToast,
      {
        ...newToast,
        date: new Date().getTime(),
      },
    ]);
  };

  return showToast;
};
