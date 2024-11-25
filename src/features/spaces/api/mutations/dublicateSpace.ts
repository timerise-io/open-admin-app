import { gql } from "@apollo/client";

export interface DuplicateSpaceMutationVariables {
  projectId: string;
  spaceId: string;
}
export interface DuplicateSpaceMutationResult {
  spaceDuplicate: {
    spaceId: string;
  };
}

export const SPACE_DUPLICATE = gql`
  mutation SpaceDuplicate($projectId: ID!, $spaceId: ID!) {
    spaceDuplicate(projectId: $projectId, spaceId: $spaceId) {
      spaceId
    }
  }
`;
