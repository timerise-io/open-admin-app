import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { BILLING_URL, BillingUrlQueryResult, BillingUrlQueryVariables } from "../api/queries/billingURL";
import { billingAtom } from "../state/billingAtom";

export const useBilling = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);

  const { data } = useTimeriseQuery<BillingUrlQueryResult, BillingUrlQueryVariables>({
    query: BILLING_URL,
    loader: "BILLING",
    variables: {},
    skip: !selectedProject,
  });

  const setBilling = useSetRecoilState(billingAtom);

  useEffect(() => {
    const billingUrl = data?.billingPortalLink;
    setBilling(billingUrl);
  }, [data, setBilling]);
};
