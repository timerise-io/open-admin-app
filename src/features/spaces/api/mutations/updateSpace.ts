import { Space } from "features/spaces/model/space";
import { gql } from "@apollo/client";

export interface UpdateSpaceMutationVariables {
  projectId: string;
  spaceId: string;
  provider?: string;
  url?: string;
  title?: string;
  instructions?: string;
}

export interface UpdateSpaceMutationResult {
  spaceUpdate: Space;
}

export const UPDATE_SPACE = gql`
  mutation SpaceUpdate($projectId: ID!, $spaceId: ID!, $url: URL, $title: String, $instructions: String) {
    spaceUpdate(projectId: $projectId, spaceId: $spaceId, url: $url, title: $title, instructions: $instructions) {
      projectId
      spaceId
      shortId
      provider
      url
      title
      instructions
    }
  }
`;
