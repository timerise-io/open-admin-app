import { useEffect, useState } from "react";
import { authUserAtom } from "features/auth/state/authUserAtom";
import { SUBSCRIPTION_PLAN } from "features/project/enums";
import { useProjectQuery } from "features/project/hooks/useProjectQuery";
import { useProjectSubscription } from "features/project/hooks/useProjectSubscription";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useRecoilValue } from "recoil";

type UseDemoAccount = () => {
  isTopBarDisplayed: boolean;
  isAlert: boolean;
  bookingsLimit: number;
};

export const useDemoAccount: UseDemoAccount = () => {
  const authUser = useRecoilValue(authUserAtom);
  const selectedProjectId = useRecoilValue(selectedProjectSelector)?.projectId;
  const { data } = useProjectQuery(selectedProjectId!);
  const { subscription } = useProjectSubscription(selectedProjectId!);

  const [isTopBarDisplayed, setIsTopBarDisplayed] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [bookingsLimit, setBookingsLimit] = useState(0);

  useEffect(() => {
    if (!data || !data?.project) return;

    setIsTopBarDisplayed(
      data?.project?.subscriptionPlan?.title === SUBSCRIPTION_PLAN.DEMO && authUser.state === "logged",
    );
    setIsAlert(isTopBarDisplayed && data?.project?.bookingsLimit === 0);
    setBookingsLimit(data?.project?.bookingsLimit);
  }, [data, authUser.state, isTopBarDisplayed]);

  useEffect(() => {
    if (!subscription || !subscription?.project) return;

    setIsTopBarDisplayed(
      subscription?.project?.subscriptionPlan?.title === SUBSCRIPTION_PLAN.DEMO && authUser.state === "logged",
    );
    setIsAlert(isTopBarDisplayed && subscription?.project?.bookingsLimit === 0);
    setBookingsLimit(subscription?.project?.bookingsLimit);
  }, [subscription, authUser.state, isTopBarDisplayed]);

  return {
    isTopBarDisplayed,
    isAlert,
    bookingsLimit,
  };
};
