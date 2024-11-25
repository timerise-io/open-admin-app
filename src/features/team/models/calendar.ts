export interface Calendar {
  userId: string;
  calendarId: string;
  title: string;
  syncBookings: boolean;
  syncExceptions: boolean;
  isWritable: boolean;
}
