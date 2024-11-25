import { gql } from "@apollo/client";

export const PROJECTS = gql`
  query {
    projects {
      projectId
      title
      logoUrl
      textColor
      linkColor
      buttonTextColor
      buttonBackgroundColor
      labels
      theme
      localTimeZone
      defaultLocale
      pendingTeamMemberInvite
      bookingsLimit
      organizationId
      subscriptionPlan {
        title
        bookingsLimit
      }
      emailConfig {
        senderName
        senderEmail
      }
      smsConfig {
        senderName
      }
      stripeConfig {
        pk
        isConfigured
      }
      adyenConfig {
        merchantAccount
        liveEndpointUrlPrefix
        isConfigured
      }
    }
  }
`;
