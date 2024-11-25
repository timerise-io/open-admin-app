import { gql } from "@apollo/client";

export interface AssetSlotsDeleteMutationVariables {
  projectId: string;
  assetId: string;
  slotId: string;
}

export const DELETE_ASSET_SLOT = gql`
  mutation AssetSlotDelete($projectId: ID!, $assetId: ID!, $slotId: ID!) {
    assetSlotDelete(projectId: $projectId, assetId: $assetId, slotId: $slotId)
  }
`;
