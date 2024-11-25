import { gql } from "@apollo/client";

export interface DeleteSpaceMutationVariables {
  projectId: string;
  spaceId: string;
}

export const DELETE_SPACE = gql`
  mutation SpaceDelete($projectId: ID!, $spaceId: ID!) {
    spaceDelete(projectId: $projectId, spaceId: $spaceId)
  }
`;
