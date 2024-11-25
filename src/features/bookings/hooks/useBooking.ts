import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { BOOKING } from "../api/queries/booking";
import { BookingQueryResult, BookingQueryVariables } from "../api/queries/models";
import { Booking, EmptyBooking } from "../model/booking";
import { selectedBookingAtom } from "../state/selectedBookingAtom";

export const useBooking = (bookingId: string) => {
  const queryOptions = useDefaultQueryOptions<BookingQueryVariables>();
  const [selectedProject, setSelectedProject] = useRecoilState(selectedProjectAtom);
  const { data } = useQuery<BookingQueryResult, BookingQueryVariables>(BOOKING, {
    ...queryOptions,
    variables: {
      bookingId,
    },
    skip: bookingId === "",
  });
  const setBooking = useSetRecoilState(selectedBookingAtom);

  useEffect(() => {
    const bookingData: Booking | undefined = data?.booking && {
      ...EmptyBooking,
      ...Object.fromEntries(Object.entries(data.booking ?? {}).filter(([_, v]) => v != null)),
    };

    //fix booking/service/locations api migration
    if (bookingData?.service.locations === null) {
      bookingData.service.locations = [{ title: "" }];
    }

    if (bookingData !== undefined) {
      setBooking(bookingData);
      if (bookingData.project.projectId !== selectedProject) {
        setSelectedProject(bookingData.project.projectId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedProject, setBooking, setSelectedProject]);

  useEffect(() => {
    return () => setBooking(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
