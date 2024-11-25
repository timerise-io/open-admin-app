import { gql } from "@apollo/client";

export interface LocationSlotsDeleteMutationVariables {
  projectId: string;
  locationId: string;
  slotId: string;
}

export const DELETE_LOCATION_SLOT = gql`
  mutation LocationSlotDelete($projectId: ID!, $locationId: ID!, $slotId: ID!) {
    locationSlotDelete(projectId: $projectId, locationId: $locationId, slotId: $slotId)
  }
`;
