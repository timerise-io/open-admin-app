import { Asset } from "features/assets/models/asset";
import { Location } from "features/locations/model/location";
import { Project } from "features/project/model/project";
import { Space } from "features/spaces/model/space";
import { User } from "features/team/models/user";
import { MediaItem } from "models/mediaItem";
import { DisplayType } from "../api/mutations/models";
import { FormField } from "./formFields";

export interface ServiceViewConfig {
  // slot: {
  //   duration: boolean;
  //   quantity: boolean;
  // };
  theme: "LIGHT" | "DARK";
  displayType: DisplayType;
  days: {
    duration: boolean;
    quantity: boolean;
    multiSelect: boolean;
    minSelect?: number;
    maxSelect?: number;
  };
  calendar: {
    quantity: boolean;
    rangeSelect: boolean;
    minRange?: string;
    maxRange?: string;
    multiSelect: boolean;
    minSelect?: number;
    maxSelect?: number;
  };
  list: {
    duration: boolean;
    quantity: boolean;
    showTime: boolean;
    multiSelect: boolean;
    minSelect?: number;
    maxSelect?: number;
  };
  preorder: {
    duration: boolean;
    quantity: boolean;
    showDate: boolean;
    showTime: boolean;
  };
}

export interface ServiceFormConfig {
  emailAddress: {
    enabled: boolean;
    required: boolean;
    notifications: boolean;
    label: string;
    order: number;
    width: number;
    defaultValue: string;
  };
  phoneNumber: {
    enabled: boolean;
    required: boolean;
    notifications: boolean;
    label: string;
    order: number;
    width: number;
    defaultValue: string;
  };
  fullName: {
    enabled: boolean;
    required: boolean;
    label: string;
    order: number;
    width: number;
    defaultValue: string;
  };
  comment: {
    enabled: boolean;
    required: boolean;
    label: string;
    order: number;
    defaultValue: string;
  };
}

export type PaymentProvider = "OFFLINE" | "ADYEN" | "STRIPE";

export type TaxBehavior = "INCLUSIVE" | "EXCLUSIVE";

export interface ServiceBase {
  serviceId: string;
  shortId: string;
  title: string;
  dateTimeFrom: string;
  dateTimeTo: string;
  description: string;
  instructions: string;
  currency: string;
  price: number;
  promoPrice: number;
  taxRate: number;
  taxBehavior: TaxBehavior;
  qrUrl: string;
  shortUrl: string;
  media: Array<MediaItem>;
  labels: Array<string>;
  draft: boolean | null;
  createdAt: string;
  updatedAt: string;
  formConfig: ServiceFormConfig;
  viewConfig: ServiceViewConfig;
  formFields: Array<FormField>;
}

export interface Service extends ServiceBase {
  assets: Array<Asset>;
  project: Project;
  hosts: Array<User>;
  spaces: Array<Space> | null;
  locations: Array<Location> | null;
  featured: boolean | null;
  durationInfo: string | null;
  paymentProviders: Array<PaymentProvider> | null;
  stripeTaxId: string | null;
  shortDescription: string | null;
}
