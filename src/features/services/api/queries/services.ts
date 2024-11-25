import { gql } from "@apollo/client";

export const SERVICES = gql`
  query getServices(
    $projectId: ID!
    $query: String!
    $spaceId: ID
    $locationId: ID
    $hostId: ID
    $assetId: ID
    $label: String
  ) {
    services(
      projectId: $projectId
      query: $query
      spaceId: $spaceId
      locationId: $locationId
      hostId: $hostId
      assetId: $assetId
      label: $label
    ) {
      project {
        projectId
        title
        logoUrl
        textColor
        linkColor
        buttonTextColor
        buttonBackgroundColor
        labels
      }
      serviceId
      title
      dateTimeFrom
      dateTimeTo
      description
      spaces {
        projectId
        spaceId
        provider
        url
        title
        instructions
      }
      locations {
        projectId
        locationId
        title
        description
      }
      currency
      price
      promoPrice
      taxRate
      taxBehavior
      qrUrl
      shortUrl
      media {
        url
        title
      }
      labels
      draft
      createdAt
      updatedAt
      instructions
      assets {
        projectId
        assetId
        title
        description
        location {
          projectId
          locationId
          title
          description
          address
        }
      }
      hosts {
        userId
        shortId
        role
        email
        phoneNumber
        fullName
        jobTitle
        photoUrl
      }
      shortId
    }
  }
`;
