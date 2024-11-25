import { useEffect } from "react";
import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useQuery } from "@apollo/client";
import { BOOKINGS } from "../api/queries/bookings";
import { BookingsQueryResult, BookingsQueryVariables } from "../api/queries/models";
import { Booking, EmptyBooking } from "../model/booking";
import { bookingsArrayAtom, bookingsAtom } from "../state/bookingsAtom";
import { bookingsFilterSelector } from "../state/bookingsFilterAtom";
import { getDateRange } from "./helpers";

export const useBookings = () => {
  const setApiState = useSetRecoilState(apiStatusAtom("GET_BOOKINGS"));
  const filters = useRecoilValue(bookingsFilterSelector);
  const queryOptions = useDefaultQueryOptions<BookingsQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const timezone = useRecoilValue(selectedProjectSelector)?.localTimeZone ?? "Europe/London";

  const hasSearchText = filters?.text.length > 0;

  const { data, loading } = useQuery<BookingsQueryResult, BookingsQueryVariables>(BOOKINGS, {
    ...queryOptions,
    variables: {
      projectId: selectedProject ?? "",
      query: filters.text,
      ...(hasSearchText
        ? {}
        : {
            serviceId: filters.serviceId,
            locationId: filters.locationId,
            assetId: filters.assetId,
            hostId: filters.hostId,
            status: filters.status,
            ...getDateRange(filters.date, timezone),
          }),
    },
    skip: selectedProject === undefined,
  });
  const setBookings = useSetRecoilState(bookingsAtom);
  const setBookingsArray = useSetRecoilState(bookingsArrayAtom);

  useEffect(() => {
    setApiState({ isLoading: loading });
  }, [loading, setApiState]);

  useEffect(() => {
    const bookingsData: Record<string, Booking> | undefined = data?.bookings.reduce((acc, item) => {
      return {
        ...acc,
        [item.phoneNumber]: {
          ...EmptyBooking,
          ...Object.fromEntries(Object.entries(item).filter(([_, v]) => v != null)),
        },
      };
    }, {});

    setBookings(bookingsData);

    const bookingsArray = data?.bookings.map((item) => {
      return {
        ...EmptyBooking,
        ...Object.fromEntries(Object.entries(item).filter(([_, v]) => v != null)),
      };
    });

    bookingsArray?.sort((a, b) => {
      const dateA = new Date(a.dateTimeFrom);
      const dateB = new Date(b.dateTimeFrom);

      return dateA.getTime() - dateB.getTime();
    });

    setBookingsArray(bookingsArray);
  }, [data, setBookings, setBookingsArray]);
};
