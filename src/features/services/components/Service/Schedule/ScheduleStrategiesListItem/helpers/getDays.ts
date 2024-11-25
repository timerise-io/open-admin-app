import { DaysOfWeek, DaysOfWeekOrder } from "features/services/model/serviceSlotStrategie";

export const getDays = (days: Array<DaysOfWeek>) => {
  const result = days
    .slice()
    .sort((a, b) => {
      return DaysOfWeekOrder[a] - DaysOfWeekOrder[b];
    })
    .map((item) => {
      return item[0].toUpperCase() + item.substring(0, 3).substr(1).toLowerCase();
    })
    .join(", ");

  return result;
};
