// import { useQuery } from "@apollo/client";
// import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { useEffect } from "react";
import { useTimeriseQuery } from "features/api/hooks/useTimeriseQuery";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import _ from "lodash";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ServiceQueryResult, ServiceQueryVariables } from "../api/queries/models";
import { SERVICE } from "../api/queries/service";
import { Service } from "../model/service";
import { selectedServiceAtom } from "../state/selectedServiceAtom";

export const useService = (serviceId: string) => {
  const [selectedProject, setSelectedProject] = useRecoilState(selectedProjectAtom);
  const { data } = useTimeriseQuery<ServiceQueryResult, ServiceQueryVariables>({
    query: SERVICE,
    variables: { serviceId },
    skip: serviceId === "",
    loader: "SERVICE",
    trigger: "SERVICE",
  });

  const setSelectedService = useSetRecoilState(selectedServiceAtom);

  useEffect(() => {
    const servicesData: Service | undefined = data?.service && {
      ...data.service,
    };

    if (servicesData?.formFields.length) {
      servicesData.formFields = _.filter(servicesData.formFields, (item) => {
        return !!item.fieldType;
      });
    }

    //fix - workaround for api migration
    if (servicesData?.viewConfig.days === null) {
      servicesData.viewConfig.days = {
        duration: false,
        quantity: false,
        multiSelect: false,
      };
    }

    if (servicesData !== undefined && servicesData.project.projectId !== selectedProject) {
      setSelectedProject(servicesData.project.projectId);
    }

    setSelectedService(servicesData);

    return () => {
      setSelectedService(undefined);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setSelectedService]);
};
