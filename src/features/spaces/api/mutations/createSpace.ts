import { Space } from "features/spaces/model/space";
import { gql } from "@apollo/client";

export interface SpaceCreateMutationVariables {
  projectId: string;
  provider: string;
  url?: string;
  title?: string;
  instructions?: string;
}

export interface SpaceCreateMutationResult {
  spaceCreate: Space;
}

export const CREATE_SPACE = gql`
  mutation SpaceCreate($projectId: ID!, $provider: SpaceProvider!, $url: URL, $title: String, $instructions: String) {
    spaceCreate(projectId: $projectId, provider: $provider, url: $url, title: $title, instructions: $instructions) {
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
