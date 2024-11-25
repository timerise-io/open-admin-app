import { gql } from "@apollo/client";

export const CREATE_SERVICE = gql`
  mutation ServiceCreate(
    $projectId: ID!
    $spaces: [ID]
    $locations: [ID]
    $hosts: [ID]
    $assets: [ID]
    $title: NonEmptyString
    $description: String
    $instructions: String
    $currency: Currency
    $price: NonNegativeFloat
    $media: [MediaInput]
    $viewConfig: ServiceViewConfigInput!
    $labels: [NonEmptyString]
  ) {
    serviceCreate(
      projectId: $projectId
      spaces: $spaces
      locations: $locations
      hosts: $hosts
      assets: $assets
      title: $title
      description: $description
      instructions: $instructions
      currency: $currency
      price: $price
      media: $media
      viewConfig: $viewConfig
      labels: $labels
    ) {
      serviceId
    }
  }
`;
