import { add, endOfDay, endOfMonth, endOfWeek, format, startOfDay, startOfMonth, startOfWeek, sub } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { BOOKING_DATE_RANGE, BookingsDateRange } from "../../model/dateRange";

export const getDateRange = (range: BookingsDateRange, timezone: string) => {
  const nowInLocalTimeZone = new Date();
  const now = utcToZonedTime(nowInLocalTimeZone, timezone);

  const formatDate = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm:ss");

  const getRangeBase = (options: Record<string, Record<string, number>>) => {
    if (options.subtract) {
      return sub(now, options.subtract);
    } else {
      return add(now, options.add);
    }
  };

  switch (range) {
    case BOOKING_DATE_RANGE.TOMORROW: {
      const rangeBase = getRangeBase({ add: { days: 1 } });

      return {
        dateTimeFrom: formatDate(startOfDay(rangeBase)),
        dateTimeTo: formatDate(endOfDay(rangeBase)),
      };
    }
    case BOOKING_DATE_RANGE.THIS_WEEK: {
      return {
        dateTimeFrom: formatDate(startOfWeek(now)),
        dateTimeTo: formatDate(endOfWeek(now)),
      };
    }
    case BOOKING_DATE_RANGE.NEXT_WEEK: {
      const rangeBase = getRangeBase({ add: { weeks: 1 } });

      return {
        dateTimeFrom: formatDate(startOfWeek(rangeBase)),
        dateTimeTo: formatDate(endOfWeek(rangeBase)),
      };
    }
    case BOOKING_DATE_RANGE.THIS_MONTH: {
      return {
        dateTimeFrom: formatDate(startOfMonth(now)),
        dateTimeTo: formatDate(endOfMonth(now)),
      };
    }
    case BOOKING_DATE_RANGE.NEXT_MONTH: {
      const rangeBase = getRangeBase({ add: { months: 1 } });

      return {
        dateTimeFrom: formatDate(startOfMonth(rangeBase)),
        dateTimeTo: formatDate(endOfMonth(rangeBase)),
      };
    }
    case BOOKING_DATE_RANGE["90_DAYS_FROM_NOW"]:
    case BOOKING_DATE_RANGE["180_DAYS_FROM_NOW"]: {
      const daysToAdd = range === BOOKING_DATE_RANGE["90_DAYS_FROM_NOW"] ? 90 : 180;
      const rangeBase = getRangeBase({ add: { days: daysToAdd } });

      return {
        dateTimeFrom: formatDate(startOfDay(now)),
        dateTimeTo: formatDate(endOfDay(rangeBase)),
      };
    }
    case BOOKING_DATE_RANGE.LAST_30_DAYS:
    case BOOKING_DATE_RANGE.LAST_90_DAYS: {
      const daysToSubtract = range === BOOKING_DATE_RANGE.LAST_30_DAYS ? 30 : 90;
      const rangeBase = getRangeBase({ subtract: { days: daysToSubtract } });

      return {
        dateTimeFrom: formatDate(startOfDay(rangeBase)),
        dateTimeTo: formatDate(endOfDay(now)),
      };
    }
    default: {
      return {
        dateTimeFrom: formatDate(startOfDay(now)),
        dateTimeTo: formatDate(endOfDay(now)),
      };
    }
  }
};
