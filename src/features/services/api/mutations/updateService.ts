import { TaxBehavior } from "features/services/model/service";
import { MediaItem } from "models/mediaItem";
import { gql } from "@apollo/client";
import { ViewConfig } from "./models";

export interface UpdateServiceMutationVariables {
  projectId: string;
  serviceId: string;
  locations?: Array<string>;
  spaces?: Array<string>;
  hosts?: Array<string>;
  assets?: Array<string>;
  title?: string;
  description?: string;
  instructions?: string;
  currency?: string;
  price?: number;
  taxRate?: number;
  taxBehavior?: TaxBehavior;
  media?: Array<MediaItem>;
  formFields?: Array<any>;
  paymentProviders?: Array<string>;
  stripeTaxId?: string;
  featured?: boolean;
  draft?: boolean;
  shortDescription?: string;
  durationInfo?: string;
  labels?: Array<string>;
  viewConfig?: ViewConfig;
}

export interface UpdateServiceMutationResult {
  serviceUpdate: {
    serviceId: string;
  };
}

export const UPDATE_SERVICE = gql`
  mutation ServiceUpdate(
    $projectId: ID!
    $serviceId: ID!
    $spaces: [ID]
    $locations: [ID]
    $hosts: [ID]
    $assets: [ID]
    $title: NonEmptyString
    $description: String
    $instructions: String
    $currency: Currency
    $price: NonNegativeFloat
    $taxRate: NonNegativeFloat
    $taxBehavior: TaxBehavior
    $media: [MediaInput]
    $formFields: JSON
    $paymentProviders: [PaymentProvider]
    $stripeTaxId: String
    $featured: Boolean
    $draft: Boolean
    $shortDescription: String
    $durationInfo: String
    $labels: [NonEmptyString]
    $viewConfig: ServiceViewConfigInput
  ) {
    serviceUpdate(
      projectId: $projectId
      serviceId: $serviceId
      spaces: $spaces
      locations: $locations
      hosts: $hosts
      assets: $assets
      title: $title
      description: $description
      instructions: $instructions
      currency: $currency
      price: $price
      taxRate: $taxRate
      taxBehavior: $taxBehavior
      media: $media
      formFields: $formFields
      paymentProviders: $paymentProviders
      stripeTaxId: $stripeTaxId
      featured: $featured
      draft: $draft
      shortDescription: $shortDescription
      durationInfo: $durationInfo
      labels: $labels
      viewConfig: $viewConfig
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
