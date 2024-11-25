import { authUserAtom } from "features/auth/state/authUserAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { selector } from "recoil";

const SHOW_BILLING = !!+(process.env.REACT_APP_SHOW_BILLING ?? 0);

export const isTopBarBillingDisplayed = selector({
  key: `isTopBarBillingDisplayed`,
  get: ({ get }) => {
    const selectedProject = get(selectedProjectSelector);
    const authUser = get(authUserAtom);

    return (
      SHOW_BILLING &&
      (selectedProject?.bookingsLimit === null || selectedProject?.bookingsLimit === 0) &&
      authUser.state === "logged"
    );
  },
});
