import { gql } from "@apollo/client";

export interface DuplicateAssetMutationVariables {
  projectId: string;
  assetId: string;
}
export interface DuplicateAssetMutationResult {
  assetDuplicate: {
    assetId: string;
  };
}

export const ASSET_DUPLICATE = gql`
  mutation AssetDuplicate($projectId: ID!, $assetId: ID!) {
    assetDuplicate(projectId: $projectId, assetId: $assetId) {
      assetId
    }
  }
`;
