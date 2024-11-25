import { Asset } from "features/assets/models/asset";
import { gql } from "@apollo/client";

export interface AssetQueryVariables {
  projectId: string;
  assetId: string;
}

export interface AssetQueryResult {
  asset: Asset;
}

export const ASSET = gql`
  query Asset($projectId: ID!, $assetId: ID!) {
    asset(projectId: $projectId, assetId: $assetId) {
      projectId
      assetId
      shortId
      title
      description
      quantity
      media {
        url
        title
      }
      location {
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
  }
`;
