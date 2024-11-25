import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ServicesQueryResult, ServicesQueryVariables } from "../api/queries/models";
import { SERVICES } from "../api/queries/services";
import { Service } from "../model/service";
import { servicesDictionaryAtom } from "../state/servicesDictionaryAtom";

export const useServicesDictionary = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const { data } = useTimeriseQuery<ServicesQueryResult, ServicesQueryVariables>({
    query: SERVICES,
    loader: "SERVICES",
    variables: { query: "", projectId: selectedProject ?? "" },
    skip: !selectedProject,
    trigger: "SERVICES",
  });
  const setServices = useSetRecoilState(servicesDictionaryAtom);

  useEffect(() => {
    const servicesData: Record<string, Service> | undefined = data?.services.reduce((acc, item) => {
      return { ...acc, [item.serviceId]: { ...item } };
    }, {});
    setServices(servicesData);
  }, [data, setServices]);
};
