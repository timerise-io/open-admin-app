import { Asset } from "features/assets/models/asset";
import { MediaItem } from "models/mediaItem";
import { gql } from "@apollo/client";

export interface AssetCreateMutationVariables {
  projectId: string;
  locationId: string | null;
  title: string;
  description: string;
  quantity: number;
  media: Array<MediaItem>;
}

export interface AssetCreateMutationResult {
  assetCreate: Asset;
}

export const CREATE_ASSET = gql`
  mutation AssetCreate(
    $projectId: ID!
    $locationId: ID
    $title: NonEmptyString
    $description: String
    $quantity: NonNegativeInt
    $media: [MediaInput]
  ) {
    assetCreate(
      projectId: $projectId
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
      media {
        url
        title
      }
      description
      quantity
    }
  }
`;
