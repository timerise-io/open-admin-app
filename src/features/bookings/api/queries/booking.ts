import { gql } from "@apollo/client";

export const BOOKING = gql`
  query getBooking($bookingId: ID!) {
    booking(bookingId: $bookingId) {
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
          days {
            duration
            quantity
            multiSelect
            minSelect
            maxSelect
          }
          list {
            duration
            quantity
            showTime
            multiSelect
            minSelect
            maxSelect
          }
          calendar {
            quantity
            rangeSelect
            minRange
            maxRange
            multiSelect
            minSelect
            maxSelect
          }
          preorder {
            duration
            quantity
            showDate
            showTime
          }
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
      createdAt
      formFields
      formFieldsLabels {
        fieldId
        fieldType
        label
        order
      }
      paymentStatus
      note
      locations {
        title
      }
      statusLog {
        event
        params
        labels
        createdAt
      }
      slots {
        slotId
        slotType
        quantity
        dateTimeFrom
        dateTimeTo
        duration
      }
    }
  }
`;
