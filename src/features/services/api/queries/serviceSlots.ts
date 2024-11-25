import { gql } from "@apollo/client";

export const SERVICE_SLOTS = gql`
  query Slots($serviceId: ID!, $slotType: SlotType!) {
    service(serviceId: $serviceId) {
      slots(slotType: $slotType) {
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
