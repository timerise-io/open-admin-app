import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { formatInTimezone, getDateInTimezone } from "helpers/timeFormat";
import { useRecoilValue } from "recoil";

export const useTimezoneFormat = () => {
  const project = useRecoilValue(selectedProjectSelector);

  const timezone = project?.localTimeZone ?? "Europe/London";

  const formatFunction = (isoDate: string, format: string) => {
    return formatInTimezone(isoDate, format, timezone);
  };

  const dateInTimezone = (isoDate: string) => {
    return getDateInTimezone(isoDate, timezone);
  };

  const dateInUTC = (isoDate: string) => {
    return getDateInTimezone(isoDate, timezone, -1);
  };

  return {
    format: formatFunction,
    timezone,
    getDateInTimezone: dateInTimezone,
    getDateInUTC: dateInUTC,
  };
};
