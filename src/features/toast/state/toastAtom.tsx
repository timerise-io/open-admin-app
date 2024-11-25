import { atom } from "recoil";

export type ToastAtomProps =
  | {
      variant: "SUCCESS" | "ERROR";
      type: "copied";
      date: number;
    }
  | {
      variant: "SUCCESS" | "ERROR";
      type: "project-changed";
      date: number;
      projectName: string;
    }
  | {
      variant: "ERROR";
      type: "file-upload";
      date: number;
    }
  | {
      variant: "SUCCESS";
      type: "booking-canceled";
      date: number;
    }
  | {
      variant: "SUCCESS";
      type: "booking-rejected";
      date: number;
    }
  | {
      variant: "SUCCESS";
      type: "booking-accepted";
      date: number;
    }
  | {
      variant: "SUCCESS" | "ERROR";
      type: "data-save";
      date: number;
    }
  | {
      variant: "SUCCESS" | "ERROR";
      type: "team-member-deleted";
      date: number;
    }
  | {
      variant: "SUCCESS" | "ERROR";
      type: "booking-note-updated";
      date: number;
    };

export const toastAtom = atom<Array<ToastAtomProps>>({
  key: "toastAtom",
  default: [],
});
