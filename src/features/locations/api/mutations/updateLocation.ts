import { Location, WorkingDays } from "features/locations/model/location";
import { MediaItem } from "models/mediaItem";
import { gql } from "@apollo/client";

export interface UpdateLocationMutationVariables {
  projectId: string;
  locationId: string;
  title: string;
  workingDays?: WorkingDays;
  description?: string;
  address: string;
  media?: Array<MediaItem>;
}

export interface UpdateLocationMutationResult {
  locationUpdate: Location;
}

export const UPDATE_LOCATION = gql`
  mutation LocationUpdate(
    $projectId: ID!
    $locationId: ID!
    $title: NonEmptyString
    $workingDays: WorkingDaysInput
    $description: String
    $address: String
    $media: [MediaInput]
  ) {
    locationUpdate(
      projectId: $projectId
      locationId: $locationId
      title: $title
      workingDays: $workingDays
      description: $description
      address: $address
      media: $media
    ) {
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
