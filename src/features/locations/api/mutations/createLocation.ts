import { Location } from "features/locations/model/location";
import { MediaItem } from "models/mediaItem";
import { gql } from "@apollo/client";

export interface LocationCreateMutationVariables {
  projectId: string;
  title: string;
  description?: string;
  media?: Array<MediaItem>;
  address?: string;
}

export interface LocationCreateMutationResult {
  locationCreate: Location;
}

export const CREATE_LOCATION = gql`
  mutation LocationCreate(
    $projectId: ID!
    $title: NonEmptyString!
    $description: String
    $address: String
    $media: [MediaInput]
  ) {
    locationCreate(projectId: $projectId, title: $title, description: $description, address: $address, media: $media) {
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
