import { Asset } from "features/assets/models/asset";
import { MediaItem } from "models/mediaItem";
import { gql } from "@apollo/client";

export interface AssetMutationVariables {
  projectId: string;
  assetId: string;
  locationId: string | null;
  title: string;
  description: string;
  quantity: number;
  media: Array<MediaItem>;
}

export interface AssetMutationResult {
  assetUpdate: Asset;
}

export const UPDATE_ASSET = gql`
  mutation AssetUpdate(
    $projectId: ID!
    $assetId: ID!
    $locationId: ID
    $title: NonEmptyString
    $description: String
    $quantity: NonNegativeInt
    $media: [MediaInput]
  ) {
    assetUpdate(
      projectId: $projectId
      assetId: $assetId
      locationId: $locationId
      title: $title
      description: $description
      quantity: $quantity
      media: $media
    ) {
      projectId
      assetId
      shortId
      title
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
      description
      quantity
      media {
        url
        title
      }
    }
  }
`;
