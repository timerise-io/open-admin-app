import { gql } from "@apollo/client";

export const UPDATE_SLOT_DISPLAY = gql`
  mutation ServiceSlotDisplayUpdate($projectId: ID!, $serviceId: ID!, $viewConfig: ServiceViewConfigInput) {
    serviceUpdate(projectId: $projectId, serviceId: $serviceId, viewConfig: $viewConfig) {
      serviceId
    }
  }
`;
