import { Project } from "features/project/model/project";
import { DisplayType } from "features/services/api/mutations/models";
import { Slot } from "features/services/model/serviceSlotStrategie";
import { Space } from "features/spaces/model/space";

export const BookingStatusArray = ["NEW", "CONFIRMED", "ACCEPTED", "CANCELED", "REJECTED"];

export type BookingStatus = "NEW" | "CONFIRMED" | "ACCEPTED" | "CANCELED" | "REJECTED";

export type PaymentStatus = "NEW" | "PROCESSING" | "SUCCEEDED" | "CANCELED";

export interface BaseBooking {
  project: Project;
  service: {
    serviceId: string;
    title: string;
    hosts: Array<{ fullName: string; userId: string }>;
    locations: Array<{
      title: string;
    }>;
    price: number | null;
    currency: string;
    assets: Array<{ title: string; assetId: string }> | null;
    spaces: Array<Space>;
    viewConfig: {
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
    };
  };
  bookingId: string;
  shortId: string;
  status: BookingStatus;
  dateTimeFrom: string;
  dateTimeTo: string;
  phoneNumber: string;
  emailAddress: string;
  fullName: string;
  comment: string;
  createdAt: string;
  note: string;
  locations: Array<{
    title: string;
  }>;
  statusLog: Array<{
    event: string;
    params: Record<string, any>;
    labels: Array<string>;
    createdAt: string;
  }>;
  slots: Array<Slot>;
}

export type Booking = BaseBooking & {
  formFields: Record<string, any>;
  formFieldsLabels: Array<Record<string, any>>;
  paymentStatus: PaymentStatus | null;
};

export const EmptyBooking: Booking = {
  project: {
    projectId: "",
    title: "",
    logoUrl: "",
    textColor: "",
    linkColor: "",
    buttonTextColor: "",
    buttonBackgroundColor: "",
    labels: [],
    theme: "LIGHT",
    bookingsLimit: null,
    organizationId: "",
    subscriptionPlan: {
      title: "",
      bookingsLimit: 0,
    },
    emailConfig: {
      senderName: "",
      senderEmail: "",
    },
    smsConfig: {
      senderName: "",
    },
    stripeConfig: null,
    adyenConfig: null,
  },
  service: {
    serviceId: "",
    title: "",
    hosts: [],
    price: 0,
    currency: "",
    locations: [
      {
        title: "",
      },
    ],
    assets: null,
    spaces: [],
    viewConfig: {
      displayType: "DAYS",
    },
  },
  bookingId: "",
  status: "NEW",
  dateTimeFrom: "",
  dateTimeTo: "",
  phoneNumber: "",
  emailAddress: "",
  fullName: "",
  comment: "",
  shortId: "",
  createdAt: "",
  formFields: {},
  formFieldsLabels: [],
  paymentStatus: null,
  note: "",
  locations: [
    {
      title: "",
    },
  ],
  statusLog: [],
  slots: [],
};
