import { useDefaultQueryOptions } from "features/api/hooks/useDefaultQueryOptions";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useRecoilValue } from "recoil";
import { useQuery } from "@apollo/client";
import { BOOKINGS } from "../api/queries/bookings";
import { BookingsQueryResult, BookingsQueryVariables } from "../api/queries/models";
import { BookingsFilters } from "../state/bookingsFilterAtom";
import { getDateRange } from "./helpers";

export type CustomBookingFilters = BookingsFilters & {
  dateTimeFrom?: string;
  dateTimeTo?: string;
};

export const useBookingsByFilter = (filters: CustomBookingFilters) => {
  const queryOptions = useDefaultQueryOptions<BookingsQueryVariables>();
  const selectedProject = useRecoilValue(selectedProjectAtom);
  const timezone = useRecoilValue(selectedProjectSelector)?.localTimeZone ?? "Europe/London";
  const { data, loading } = useQuery<BookingsQueryResult, BookingsQueryVariables>(BOOKINGS, {
    ...queryOptions,
    variables: {
      projectId: selectedProject ?? "",
      query: filters.text,
      ...{
        serviceId: filters.serviceId,
        locationId: filters.locationId,
        assetId: filters.assetId,
        hostId: filters.hostId,
        status: filters.status,
      },
      ...getDateRange(filters.date, timezone),
      ...(filters.dateTimeFrom &&
        filters.dateTimeTo && {
          dateTimeFrom: filters.dateTimeFrom,
          dateTimeTo: filters.dateTimeTo,
        }),
    },
    skip: selectedProject === undefined,
  });

  return { data, loading };
};
