import { DaysOfWeek, Months } from "./serviceSlotStrategie";

export type StrategyStartType = "DATE" | "DATE_TIME" | "TIME_PERIOD";

export type StrategyStartInput = {
  dateTime: string;
  time: string;
  timeOffset: string;
};

export type StrategyEndInput = {
  dateTime: string;
  time: string;
  timePeriod: string;
};

export type StrategyPeriodicityTendency =
  | "FIRST"
  | "SECOND"
  | "THIRD"
  | "FOURTH"
  | "FIFTH"
  | "PENULTIMATE"
  | "LAST"
  | "ALL";

export type ServiceDaysStrategyFields = {
  projectId: string;
  serviceId: string;
  startDateTime: Date;
  start: {
    dateTime: Date;
    time: string;
    timeOffset: string;
  };
  endDateTime: Date;
  end: {
    dateTime: Date;
    time: string;
    timePeriod: string;
  };
  endTimePeriod: string;
  daysOfWeek: Array<DaysOfWeek>;
  months: Array<Months>;
  slotQuantity: number;
  slotDuration: string;
  slotInterval: string;
  labels: Array<string>;
  startType: string;
  endType: string;
};

export type ServiceDayRangeStrategyFields = {
  projectId: string;
  serviceId: string;
  startDateTime: Date;
  start: {
    dateTime: Date;
    time: string;
    timeOffset: string;
  };
  endDateTime: Date;
  end: {
    dateTime: Date;
    time: string;
    timePeriod: string;
  };
  endTimePeriod: string;
  slotQuantity: number;
  daysOfWeek: Array<DaysOfWeek>;
  months: Array<Months>;
  labels: Array<string>;
  startType: string;
  endType: string;
};

export type ServiceOnceStrategyFields = {
  projectId: string;
  serviceId: string;
  start: string;
  end: string;
  slotQuantity: number;
  labels: Array<string>;
  startTime: string;
  endTime: string;
  allDay: boolean;
};
