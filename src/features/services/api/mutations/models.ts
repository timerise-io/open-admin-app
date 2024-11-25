import { ServiceViewConfig } from "features/services/model/service";
import {
  DaysOfWeek,
  DiscontinueStrategy,
  Months,
  ServiceDayRangeStrategy,
  ServiceOnceStrategy,
  ServiceRangeStrategy,
  ServiceSlotStrategy,
  Slot,
  SlotType,
} from "features/services/model/serviceSlotStrategie";
import {
  ServiceDayRangeStrategyFields,
  ServiceDaysStrategyFields,
  ServiceOnceStrategyFields,
} from "features/services/model/strategies";
import { MediaItem } from "models/mediaItem";

export enum DisplayType {
  DAYS = "DAYS",
  CALENDAR = "CALENDAR",
  LIST = "LIST",
  PREORDER = "PREORDER",
}

export enum DisplayTypeSelect {
  DAYS_SINGLE = "DAYS_SINGLE",
  DAYS_MULTI = "DAYS_MULTI",
  CALENDAR_SINGLE = "CALENDAR_SINGLE",
  CALENDAR_MULTI = "CALENDAR_MULTI",
  CALENDAR_RANGE = "CALENDAR_RANGE",
  LIST_SINGLE = "LIST_SINGLE",
  LIST_MULTI = "LIST_MULTI",
  PREORDER = "PREORDER",
}

export interface ViewConfig {
  displayType: DisplayType | string;
  days?: {
    duration: boolean;
    quantity: boolean;
    multiSelect: boolean;
    minSelect?: number;
    maxSelect?: number;
  };
  calendar?: {
    quantity: boolean;
    rangeSelect: boolean;
    minRange?: string;
    maxRange?: string;
    multiSelect: boolean;
    minSelect?: number;
    maxSelect?: number;
  };
  list?: {
    duration: boolean;
    quantity: boolean;
    showTime: boolean;
    multiSelect: boolean;
    minSelect?: number;
    maxSelect?: number;
  };
  preorder?: {
    duration: boolean;
    quantity: boolean;
    showDate: boolean;
    showTime: boolean;
  };
}

export interface CreateServiceMutationVariables {
  projectId: string;
  spaces: Array<string>;
  locations: Array<string>;
  hosts: Array<string>;
  assets: Array<string>;
  title: string;
  description?: string;
  instructions?: string;
  currency: string;
  price: number;
  media?: Array<MediaItem>;
  viewConfig: ViewConfig;
  labels?: Array<string>;
}
export interface CreateServiceMutationResult {
  serviceCreate: {
    serviceId: string;
  };
}

export interface UpdateServiceSlotUpdateMutationVariables {
  projectId: string;
  serviceId: string;
  viewConfig: ServiceViewConfig;
}

export interface UpdateServiceSlotUpdateMutationResult {
  serviceUpdate: {
    serviceId: string;
  };
}

export interface ServiceSlotStrategyCreateResult {
  serviceSlotStrategyCreate: ServiceSlotStrategy;
}

export interface ServiceSlotStrategyCreateBaseVariables {
  serviceId: string;
  projectId: string;
  slotType: SlotType;
  slotQuantity: number;
  slotDuration: string;
}

export type ServiceSlotStrategyCreateRangeVariables = {
  strategyType: "RANGE";
  discontinueStrategy: DiscontinueStrategy;
  daysOfWeek: Array<DaysOfWeek>;
  timeFrom: string;
  timeTo: string;
  slotInterval: string;
  startDateTime: Date;
} & ServiceSlotStrategyCreateBaseVariables;

export type ServiceSlotStrategyCreateOnceVariables = {
  strategyType: "ONCE";
  slotDateTime: Date;
} & ServiceSlotStrategyCreateBaseVariables;

export type ServiceSlotStrategyCreateVariables =
  | ServiceSlotStrategyCreateRangeVariables
  | ServiceSlotStrategyCreateOnceVariables;

export interface ServiceSlotStrategyDeleteVariables {
  projectId: string;
  serviceId: string;
  strategyId: string;
}

export interface ServiceRangeStrategyDeleteVariables {
  projectId: string;
  serviceId: string;
  strategyId: string;
}

export interface ServiceDayRangeStrategyDeleteVariables {
  projectId: string;
  serviceId: string;
  strategyId: string;
}

export interface ServiceOnceStrategyDeleteVariables {
  projectId: string;
  serviceId: string;
  strategyId: string;
}

export interface ServiceSlotStrategyUpdateResult {
  serviceSlotStrategyUpdate: ServiceSlotStrategy;
}

export interface ServiceRangeStrategyUpdateResult {
  serviceRangeStrategyUpdate: ServiceRangeStrategy;
}

export interface ServiceDayRangeStrategyUpdateResult {
  serviceDayRangeStrategyUpdate: ServiceDayRangeStrategy;
}

export interface ServiceOnceStrategyUpdateResult {
  serviceOnceStrategyUpdate: ServiceOnceStrategy;
}

export type ServiceSlotStrategyUpdateRangeVariables = {
  strategyId: string;
} & ServiceSlotStrategyCreateRangeVariables;

export type ServiceRangeStrategyUpdateVariables = {
  strategyId: string;
} & ServiceDaysStrategyCreateRangeVariables;

export type ServiceDayRangeStrategyUpdateVariables = {
  strategyId: string;
} & ServiceDayRangeStrategyCreateRangeVariables;

export type ServiceOnceStrategyUpdateVariables = {
  strategyId: string;
} & ServiceOnceStrategyCreateRangeVariables;

export type ServiceSlotStrategyUpdateOnceVariables = {
  strategyId: string;
} & ServiceSlotStrategyCreateOnceVariables;

export type ServiceSlotStrategyUpdateVariables =
  | ServiceSlotStrategyUpdateRangeVariables
  | ServiceSlotStrategyUpdateOnceVariables;

export interface CreateSlotVariables {
  projectId: string;
  serviceId: string;
  quantity: number;
  dateTimeFrom: Date;
  dateTimeTo: Date;
  slotType: SlotType;
}

export interface CreateSlotResult {
  serviceSlotCreate: Slot;
}

export interface ServiceSlotDeleteVariables {
  projectId: string;
  serviceId: string;
  slotId: string;
}

export type ServiceDaysStrategyCreateRangeVariables = {
  projectId: string;
  serviceId: string;
  start: {
    dateTime?: Date;
    time: string;
    timeOffset?: string | null;
  };
  end: {
    dateTime?: Date;
    time: string;
    timePeriod: string;
  };
  daysOfWeek: Array<DaysOfWeek>;
  months: Array<Months>;
  slotQuantity: number;
  slotDuration: string;
  slotInterval: string;
  labels: Array<string>;
};

export interface ServiceDaysStrategyCreateRangeResult {
  serviceRangeStrategyCreate: ServiceDaysStrategyFields;
}

export type ServiceDayRangeStrategyCreateRangeVariables = {
  projectId: string;
  serviceId: string;
  start: {
    dateTime?: Date;
    time: string;
    timeOffset?: string;
  };
  end: {
    dateTime?: Date | string;
    time: string;
    timePeriod: string;
  };
  slotQuantity: number;
  daysOfWeek: Array<DaysOfWeek>;
  months: Array<Months>;
  labels: Array<string>;
};

export interface ServiceDayRangeStrategyCreateRangeResult {
  serviceDayRangeStrategyCreate: ServiceDayRangeStrategyFields;
}

export type ServiceOnceStrategyCreateRangeVariables = {
  projectId: string;
  serviceId: string;
  start: Date;
  end: Date;
  slotQuantity: number;
  labels: Array<string>;
};

export interface ServiceOnceStrategyCreateRangeResult {
  serviceOnceStrategyCreate: ServiceOnceStrategyFields;
}

export interface ServiceStrategyMigrateVariables {
  projectId: string;
  serviceId: string;
}

export interface ServiceStrategyMigrateResult {
  serviceStrategyMigrate: string;
}
