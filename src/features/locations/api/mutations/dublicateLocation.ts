import { gql } from "@apollo/client";

export interface DuplicateLocationMutationVariables {
  projectId: string;
  locationId: string;
}
export interface DuplicateLocationMutationResult {
  locationDuplicate: {
    locationId: string;
  };
}

export const LOCATION_DUPLICATE = gql`
  mutation LocationDuplicate($projectId: ID!, $locationId: ID!) {
    locationDuplicate(projectId: $projectId, locationId: $locationId) {
      locationId
    }
  }
`;
