import { gql } from "@apollo/client";

export const SERVICE = gql`
  query getService($serviceId: ID!) {
    service(serviceId: $serviceId) {
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
        address
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
      viewConfig {
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
        displayType
        theme
      }
      formFields {
        ... on FormFieldSystemFullName {
          fieldId
          fieldType
          required
          label
          order
          width
          placeholder
        }
        ... on FormFieldSystemEmailAddress {
          fieldId
          fieldType
          required
          label
          order
          width
          placeholder
        }
        ... on FormFieldSystemPhoneNumber {
          fieldId
          fieldType
          required
          label
          order
          width
        }
        ... on FormFieldSystemMessage {
          fieldId
          fieldType
          required
          label
          order
          width
          height
          placeholder
        }
        ... on FormFieldSystemSlotQuantity {
          fieldId
          fieldType
          required
          label
          order
          width
          maxValue
        }
        ... on FormFieldSystemGuestsList {
          fieldId
          fieldType
          required
          label
          order
          minGuests
          maxGuests
        }
        ... on FormFieldSystemAllowlistCode {
          fieldId
          fieldType
          required
          label
          order
          width
          placeholder
        }
        ... on FormFieldSystemPromoCode {
          fieldId
          fieldType
          required
          label
          order
          width
          placeholder
        }
        ... on FormFieldText {
          fieldId
          fieldType
          label
          order
          required
          placeholder
          validationRegex
          width
        }
        ... on FormFieldNumber {
          fieldId
          fieldType
          label
          order
          required
          width
          minValue
          maxValue
        }
        ... on FormFieldCheckbox {
          fieldId
          fieldType
          label
          order
          required
          width
        }
        ... on FormFieldFileUpload {
          accept
          buttonText
          capture
          fieldId
          fieldType
          label
          multiple
          order
          required
        }
      }
      featured
      draft
      durationInfo
      paymentProviders
      stripeTaxId
      shortDescription
    }
  }
`;
