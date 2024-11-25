import { gql } from "@apollo/client";

export const SPACE = gql`
  query getSpace($projectId: ID!, $spaceId: ID!) {
    space(projectId: $projectId, spaceId: $spaceId) {
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
