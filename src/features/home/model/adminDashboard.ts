export interface SubscriptionDashboardDay {
  SMS_SENT: number;
  EMAIL_SENT: number;
  BOOKING_CREATED: number;
  dateTime: string;
}

export type SubscriptionDashboard = Array<SubscriptionDashboardDay>;

export interface ProjectBookingsDashboardDay {
  BOOKING_BOOKED_ACCEPTED: number;
  BOOKING_BOOKED_CANCELED: number;
  dateTime: string;
}

export interface ProjectBookingsDashboardDayChartData extends ProjectBookingsDashboardDay {
  dayName: string;
}

export type ProjectBookingsDashboard = Array<ProjectBookingsDashboardDay>;

export interface ProjectBookingsDashboardChartData {
  chartData: Array<ProjectBookingsDashboardDay>;
}

export interface AdminDashboard {
  subscriptionReports: SubscriptionDashboard;
  projectBookings: ProjectBookingsDashboard;
}
