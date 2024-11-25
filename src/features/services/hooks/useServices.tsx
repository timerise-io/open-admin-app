import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ServicesQueryResult, ServicesQueryVariables } from "../api/queries/models";
import { SERVICES } from "../api/queries/services";
import { Service } from "../model/service";
import { servicesAtom } from "../state/servicesAtom";
import { servicesFilterSelector } from "../state/servicesFilterAtom";

export const useServices = () => {
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const filters = useRecoilValue(servicesFilterSelector);
  const { data } = useTimeriseQuery<ServicesQueryResult, ServicesQueryVariables>({
    query: SERVICES,
    loader: "SERVICES",
    variables: {
      projectId: selectedProject ?? "",
      query: filters.text,
      ...{
        locationId: filters.locationId,
        assetId: filters.assetId,
        hostId: filters.hostId,
        spaceId: filters.spaceId,
        label: filters.label,
      },
    },
    skip: !selectedProject,
    trigger: "SERVICES",
  });

  const setServices = useSetRecoilState(servicesAtom);

  useEffect(() => {
    const servicesData: Record<string, Service> | undefined = data?.services.reduce((acc, item) => {
      item.title = item.draft ? "[DRAFT] " + item.title : item.title;
      return { ...acc, [item.serviceId]: { ...item } };
    }, {});
    setServices(servicesData);
  }, [data, setServices]);
};
