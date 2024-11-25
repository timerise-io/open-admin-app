export enum BOOKING_DATE_RANGE {
  TODAY = "TODAY",
  TOMORROW = "TOMORROW",
  THIS_WEEK = "THIS_WEEK",
  NEXT_WEEK = "NEXT_WEEK",
  THIS_MONTH = "THIS_MONTH",
  NEXT_MONTH = "NEXT_MONTH",
  "90_DAYS_FROM_NOW" = "90_DAYS_FROM_NOW",
  "180_DAYS_FROM_NOW" = "180_DAYS_FROM_NOW",
  LAST_30_DAYS = "LAST_30_DAYS",
  LAST_90_DAYS = "LAST_90_DAYS",
}

export const BookingsDateRangeArray: Array<BookingsDateRange> = Object.values(BOOKING_DATE_RANGE);

export type BookingsDateRange = keyof typeof BOOKING_DATE_RANGE;
