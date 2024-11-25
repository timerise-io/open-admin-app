import { ServiceDayRangeStrategyFields, ServiceDaysStrategyFields, ServiceOnceStrategyFields } from "./strategies";

export const DaysOfWeekOrder: Record<DaysOfWeek, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

export type DaysOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
export type Months =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER";

export type SlotType = "AVAILABLE" | "UNAVAILABLE" | "EXCEPTION";
export type StrategyType = "RANGE" | "ONCE";

export interface Slot {
  slotId: string;
  slotType: SlotType;
  quantity: number;
  dateTimeFrom: string;
  dateTimeTo: string;
  duration: string;
}

export interface ServiceSlotStrategyMandatoryFields {
  strategyId: string;
  serviceId: string;
  projectId: string;
  slotType: SlotType;
  slotQuantity: number;
  slotDuration: string;
  startDateTime?: string;
}

export type ServiceSlotStrategyRangeFields = ServiceSlotStrategyMandatoryFields & {
  strategyType: "RANGE";
  timeFrom: string;
  timeTo: string;
  daysOfWeek: Array<DaysOfWeek>;
  slotInterval: string;
  discontinueStrategy: DiscontinueStrategy;
};

export type ServiceSlotStrategyOnceFields = ServiceSlotStrategyMandatoryFields & {
  strategyType: "ONCE";
  slotDateTime: string;
  slotInterval?: string;
};

export type ServiceSlotStrategy = ServiceSlotStrategyRangeFields | ServiceSlotStrategyOnceFields;

export interface ServiceStrategyMandatoryFields {
  strategyId: string;
}

export type ServiceRangeStrategy = ServiceStrategyMandatoryFields & ServiceDaysStrategyFields;

export type ServiceDayRangeStrategy = ServiceStrategyMandatoryFields & ServiceDayRangeStrategyFields;

export type ServiceOnceStrategy = ServiceStrategyMandatoryFields & ServiceOnceStrategyFields;

export interface DiscontinueStrategy {
  discontinueType: "ENDDATE";
  endDateTime: Date;
  futurePeriod: string;
}
