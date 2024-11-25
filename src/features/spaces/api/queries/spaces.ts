import { gql } from "@apollo/client";

export const SPACES = gql`
  query getSpaces($projectId: ID!, $query: String!) {
    spaces(projectId: $projectId, query: $query) {
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
