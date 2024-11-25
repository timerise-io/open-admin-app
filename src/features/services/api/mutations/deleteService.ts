import { gql } from "@apollo/client";

export interface DeleteServiceMutationVariables {
  projectId: string;
  serviceId: string;
}

export const DELETE_SERVICE = gql`
  mutation ServiceDelete($projectId: ID!, $serviceId: ID!) {
    serviceDelete(projectId: $projectId, serviceId: $serviceId)
  }
`;
