import { BookingStatus } from "features/bookings/model/booking";

export type HostDashboardRanges = "today" | "todayUpcoming" | "tomorrow" | "weekUpcoming" | "todayAll";

export type DashboardBooking = {
  bookingId: string;
  status: BookingStatus;
  dateTimeFrom: string;
};

export type HostDashboardBookings = Record<HostDashboardRanges, Array<DashboardBooking>>;
