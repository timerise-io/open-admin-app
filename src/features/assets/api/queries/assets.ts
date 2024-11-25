import { gql } from "@apollo/client";

export const ASSETS = gql`
  query getAssets($projectId: ID!, $query: String!, $locationId: ID) {
    assets(projectId: $projectId, query: $query, locationId: $locationId) {
      projectId
      assetId
      shortId
      title
      description
      quantity
      location {
        projectId
        locationId
        title
        description
        address
      }
      media {
        url
        title
      }
    }
  }
`;
