import { gql } from "@apollo/client";

export interface DeleteAssetMutationVariables {
  projectId: string;
  assetId: string;
}

export const DELETE_ASSET = gql`
  mutation AssetDelete($projectId: ID!, $assetId: ID!) {
    assetDelete(projectId: $projectId, assetId: $assetId)
  }
`;
