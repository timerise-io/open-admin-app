import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { ServiceSlotQueryResult, ServiceSlotsQueryVariables } from "../api/queries/models";
import { SERVICE_SLOTS } from "../api/queries/serviceSlots";
import { selectedServiceExceptionsAtom } from "../state/selectedServiceExceptionsAtom";

export const useServiceExceptions = (serviceId: string) => {
  const queryOptions = useDefaultQueryOptions<ServiceSlotsQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useQuery<ServiceSlotQueryResult, ServiceSlotsQueryVariables>(SERVICE_SLOTS, {
    ...queryOptions,
    variables: { serviceId, slotType: "EXCEPTION" },
    skip: serviceId === "" || selectedProject === undefined,
  });

  const setServiceExceptions = useSetRecoilState(selectedServiceExceptionsAtom);

  useEffect(() => {
    const newData = data?.service.slots && [...data.service.slots];

    setServiceExceptions(newData ?? []);

    return () => {
      setServiceExceptions([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setServiceExceptions]);
};
