import { Booking } from "features/bookings/model/booking";

export interface BookingsQueryVariables {
  projectId: string;
  query: string;
  serviceId?: string;
  locationId?: string;
  status?: string;
  assetId?: string;
  hostId?: string;
  dateTimeFrom?: string;
  dateTimeTo?: string;
}

export interface BookingsQueryResult {
  bookings: Array<Booking>;
}

export interface BookingQueryVariables {
  bookingId: string;
}

export interface BookingQueryResult {
  booking: Booking;
}
