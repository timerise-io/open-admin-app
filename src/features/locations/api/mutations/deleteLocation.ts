import { gql } from "@apollo/client";

export interface DeleteLocationMutationVariables {
  projectId: string;
  locationId: string;
}

export const DELETE_LOCATION = gql`
  mutation LocationDelete($projectId: ID!, $locationId: ID!) {
    locationDelete(projectId: $projectId, locationId: $locationId)
  }
`;
