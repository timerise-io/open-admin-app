import { gql } from "@apollo/client";

export const BOOKINGS = gql`
  query getBookings(
    $projectId: ID!
    $query: String!
    $serviceId: ID
    $locationId: ID
    $hostId: ID
    $assetId: ID
    $status: BookingStatus
    $dateTimeFrom: DateTime
    $dateTimeTo: DateTime
  ) {
    bookings(
      projectId: $projectId
      query: $query
      serviceId: $serviceId
      locationId: $locationId
      assetId: $assetId
      hostId: $hostId
      status: $status
      dateTimeFrom: $dateTimeFrom
      dateTimeTo: $dateTimeTo
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
        theme
      }
      service {
        viewConfig {
          displayType
        }
        serviceId
        title
        locations {
          title
        }
        hosts {
          fullName
          userId
        }
        price
        currency
        assets {
          assetId
          title
        }
        spaces {
          spaceId
          title
          url
          instructions
          shortId
          provider
          projectId
        }
      }
      bookingId
      shortId
      status
      dateTimeFrom
      dateTimeTo
      formFields
    }
  }
`;
