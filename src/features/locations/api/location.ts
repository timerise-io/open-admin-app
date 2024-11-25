import { gql } from "@apollo/client";

export const LOCATION = gql`
  query getLocation($projectId: ID!, $locationId: ID!) {
    location(projectId: $projectId, locationId: $locationId) {
      projectId
      locationId
      shortId
      title
      workingDays {
        MONDAY {
          timeFrom
          timeTo
        }
        TUESDAY {
          timeFrom
          timeTo
        }
        WEDNESDAY {
          timeFrom
          timeTo
        }
        THURSDAY {
          timeFrom
          timeTo
        }
        FRIDAY {
          timeFrom
          timeTo
        }
        SATURDAY {
          timeFrom
          timeTo
        }
        SUNDAY {
          timeFrom
          timeTo
        }
      }
      description
      address
      media {
        url
        title
      }
    }
  }
`;
