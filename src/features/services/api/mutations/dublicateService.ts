import { gql } from "@apollo/client";

export interface DuplicateServiceMutationVariables {
  projectId: string;
  serviceId: string;
}
export interface DuplicateServiceMutationResult {
  serviceDuplicate: {
    serviceId: string;
  };
}

export const SERVICE_DUPLICATE = gql`
  mutation ServiceDuplicate($projectId: ID!, $serviceId: ID!) {
    serviceDuplicate(projectId: $projectId, serviceId: $serviceId) {
      serviceId
    }
  }
`;
