import { gql } from "@apollo/client";

export const DELETE_SERVICE_SLOT = gql`
  mutation ServiceSlotDelete($projectId: ID!, $serviceId: ID!, $slotId: ID!) {
    serviceSlotDelete(projectId: $projectId, serviceId: $serviceId, slotId: $slotId)
  }
`;
