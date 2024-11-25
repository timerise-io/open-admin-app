import { gql } from "@apollo/client";

export const LOCATIONS = gql`
  query getLocations($projectId: ID!, $query: String!) {
    locations(projectId: $projectId, query: $query) {
      projectId
      locationId
      shortId
      title
      description
      address
      media {
        url
        title
      }
    }
  }
`;
