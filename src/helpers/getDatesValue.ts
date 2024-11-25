import { DisplayType } from "features/services/api/mutations/models";
import { Service } from "features/services/model/service";

type GetDatesValue = ({
  dateTimeFrom,
  dateTimeTo,
  format,
  viewConfig,
}: {
  dateTimeFrom: string;
  dateTimeTo: string;
  format: (date: string, format: string) => string;
  viewConfig: Service["viewConfig"];
}) => string;

const getDaysDatesValue: GetDatesValue = ({ dateTimeFrom, format }) => {
  return format(dateTimeFrom, "E d MMM yyyy, H:mm");
};

const getCalendarDatesValue: GetDatesValue = ({ dateTimeFrom, dateTimeTo, format }) => {
  const formattedDateFrom = format(dateTimeFrom, "E d MMM yyyy");

  const formattedDateTo = format(dateTimeTo, "E d MMM yyyy");

  const hasSameDay = formattedDateFrom === formattedDateTo;

  if (hasSameDay) {
    return `${formattedDateFrom}`;
  } else {
    return `${formattedDateFrom} - ${formattedDateTo}`;
  }
};

const getEventDatesValue: GetDatesValue = ({ dateTimeFrom, dateTimeTo, format, viewConfig }) => {
  const showTime = viewConfig?.list?.showTime;

  const formattedDateFrom = format(dateTimeFrom, "E d MMM yyyy");
  const formattedDateTo = format(dateTimeTo, "E d MMM yyyy");
  const formattedHourFrom = format(dateTimeFrom, "H:mm");
  const formattedHourTo = format(dateTimeTo, "H:mm");

  const hasSameDay = formattedDateFrom === formattedDateTo;

  if (hasSameDay && showTime) {
    return `${formattedDateFrom}, ${formattedHourFrom} - ${formattedHourTo}`;
  } else if (hasSameDay && !showTime) {
    return `${formattedDateFrom}`;
  } else if (!hasSameDay && !showTime) {
    return `${formattedDateFrom} - ${formattedDateTo}`;
  }

  return `${formattedDateFrom}, ${formattedHourFrom} - ${formattedDateTo}, ${formattedHourTo}`;
};

export const getDatesValue: GetDatesValue = ({ dateTimeFrom, dateTimeTo, format, viewConfig }) => {
  const displayType = viewConfig?.displayType;
  const sharedParams = {
    dateTimeFrom,
    dateTimeTo,
    format,
    viewConfig,
  };

  if (displayType === DisplayType.DAYS) {
    return getDaysDatesValue(sharedParams);
  } else if (displayType === DisplayType.CALENDAR || displayType === DisplayType.PREORDER) {
    return getCalendarDatesValue(sharedParams);
  } else if (displayType === DisplayType.LIST) {
    return getEventDatesValue(sharedParams);
  }

  return "";
};
