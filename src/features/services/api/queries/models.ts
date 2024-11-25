import { Service } from "features/services/model/service";
import {
  ServiceDayRangeStrategy,
  ServiceOnceStrategy,
  ServiceRangeStrategy,
  ServiceSlotStrategy,
  Slot,
  SlotType,
} from "features/services/model/serviceSlotStrategie";

export interface ServicesQueryVariables {
  projectId: string;
  query: string;
  spaceId?: string;
  locationId?: string;
  assetId?: string;
  hostId?: string;
  dradft?: boolean;
}

export interface ServicesQueryResult {
  services: Array<Service>;
}

export interface ServiceQueryVariables {
  serviceId: string;
}

export interface ServiceQueryResult {
  service: Service;
}

export interface SlotsServiceStrategiesQueryResult {
  serviceSlotsStrategies: Array<ServiceSlotStrategy>;
}

export interface RangeServiceStrategiesQueryResult {
  serviceRangeStrategies: Array<ServiceRangeStrategy>;
}

export interface DayRangeServiceStrategiesQueryResult {
  serviceDayRangeStrategies: Array<ServiceDayRangeStrategy>;
}

export interface OnceServiceStrategiesQueryResult {
  serviceOnceStrategies: Array<ServiceOnceStrategy>;
}

export interface SlotsServiceStrategiesQueryVariables {
  serviceId: string;
  projectId: string;
}

export interface ServiceSlotsQueryVariables {
  serviceId: string;
  slotType: SlotType;
}

export interface ServiceSlotQueryResult {
  service: {
    slots: Array<Slot>;
  };
}

export interface RangeServiceStrategiesQueryVariables {
  serviceId: string;
  projectId: string;
}

export interface DayRangeServiceStrategiesQueryVariables {
  serviceId: string;
  projectId: string;
}

export interface OnceServiceStrategiesQueryVariables {
  serviceId: string;
  projectId: string;
}
