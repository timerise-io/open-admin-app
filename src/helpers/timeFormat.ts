import format from "date-fns-tz/format";
import parseISO from "date-fns/parseISO";

export const getDateInTimezone = (isoDate: string, timeZone: string, factor: number = 1) => {
  const dateToFormat = parseISO(isoDate.split("Z")[0]);

  return dateToFormat;
};

export const formatInTimezone = (isoDate: string, dateFormat: string, timeZone: string) => {
  const dateToFormat = getDateInTimezone(isoDate, dateFormat);

  return format(dateToFormat, dateFormat, {
    timeZone: "UTC",
  });
};
