import React, { useMemo } from "react";
import { Select } from "components/Select";
import { Row } from "components/layout/Row";
import { assetsDictionaryAtom } from "features/assets/state/assetsDictionaryAtom";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { BookingStatus, BookingStatusArray } from "features/bookings/model/booking";
import { BOOKING_DATE_RANGE, BookingsDateRange, BookingsDateRangeArray } from "features/bookings/model/dateRange";
import { bookingsFilterSelector } from "features/bookings/state/bookingsFilterAtom";
import { locationsDictionaryAtom } from "features/locations/state/locationsDictionaryAtom";
import { servicesDictionaryAtom } from "features/services/state/servicesDictionaryAtom";
import { TeamMemberRole } from "features/team/components/TeamMemberInvite/TeamMemberInviteFormContent";
import { teamDictionaryAtom } from "features/team/state/teamDictionaryAtom";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

const FilterRow = styled(Row)`
  position: sticky;
  top: 100px;
  background-color: #f6f6f6;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 0 32px 12px 32px;
  & > * {
    flex-grow: 1;
    max-width: 200px;
  }
`;

export const BookingsFilters = () => {
  const { t } = useTranslation();
  const services = useRecoilValue(servicesDictionaryAtom) ?? {};
  const locations = useRecoilValue(locationsDictionaryAtom) ?? {};
  const assets = useRecoilValue(assetsDictionaryAtom) ?? {};
  const team = useRecoilValue(teamDictionaryAtom) ?? {};
  const [filters, setFilters] = useRecoilState(bookingsFilterSelector);
  const user = useRecoilValue(currentUserAtom) ?? ({} as any);

  const isDisabled = useMemo(() => filters.text.length > 0, [filters.text]);

  const checkAccessToHosts = useMemo(() => {
    const hasAccessToHosts = user?.role !== TeamMemberRole.STAFF;

    if (!hasAccessToHosts) {
      setFilters({
        ...filters,
        hostId: user.userId,
      });
    }

    return hasAccessToHosts;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const servicesOptions = Object.values(services).reduce(
    (acc, item) => {
      return { ...acc, [item.serviceId]: item.title };
    },
    { 0: t("all") },
  );

  const locationsOptions = Object.values(locations).reduce(
    (acc, item) => {
      return { ...acc, [item.locationId]: item.title };
    },
    { 0: t("all") },
  );

  const assetsOptions = Object.values(assets).reduce(
    (acc, item) => {
      return { ...acc, [item.assetId]: item.title };
    },
    { 0: t("all") },
  );

  const bookingStatusOptions = BookingStatusArray.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item]: item.charAt(0) + item.substring(1).toLowerCase(),
      };
    },
    { 0: t("all") },
  );

  const hostsOptions = Object.values(team).reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.userId]: item.fullName,
      };
    },
    { 0: t("all") },
  );

  const dateRangeOptions = BookingsDateRangeArray.reduce((acc, item) => {
    const text = t(item.toLowerCase().replaceAll("_", "-"));

    return {
      ...acc,
      [item]: text.charAt(0).toUpperCase() + text.substring(1),
    };
  }, {});

  return (
    <FilterRow jc="flex-start">
      <Select
        label={t("date")}
        value={filters.date ?? BOOKING_DATE_RANGE.TODAY}
        options={dateRangeOptions}
        onChange={(value) => {
          setFilters({
            ...filters,
            date: value as BookingsDateRange,
          });
        }}
        separators={[BOOKING_DATE_RANGE["90_DAYS_FROM_NOW"], BOOKING_DATE_RANGE["LAST_30_DAYS"]]}
        disabled={isDisabled}
      />
      <Select
        label={t("services.service")}
        value={filters.serviceId ?? "0"}
        options={servicesOptions}
        onChange={(value) => {
          setFilters({
            ...filters,
            serviceId: value === "0" ? undefined : value,
          });
        }}
        disabled={isDisabled}
      />
      <Select
        label={t("locations.location")}
        value={filters.locationId ?? "0"}
        options={locationsOptions}
        onChange={(value) => {
          setFilters({
            ...filters,
            locationId: value === "0" ? undefined : value,
          });
        }}
        disabled={isDisabled}
      />
      <Select
        label={t("assets.assets")}
        value={filters.assetId ?? "0"}
        options={assetsOptions}
        onChange={(value) => {
          setFilters({
            ...filters,
            assetId: value === "0" ? undefined : value,
          });
        }}
        disabled={isDisabled}
      />
      <Select
        label={t("host")}
        value={filters.hostId ?? "0"}
        options={hostsOptions}
        onChange={(value) => {
          setFilters({
            ...filters,
            hostId: value === "0" ? undefined : value,
          });
        }}
        disabled={!checkAccessToHosts || isDisabled}
      />
      <Select
        label={t("status")}
        value={filters.status ?? "0"}
        options={bookingStatusOptions}
        onChange={(value) => {
          setFilters({
            ...filters,
            status: value === "0" ? undefined : (value as BookingStatus),
          });
        }}
        disabled={isDisabled}
      />
    </FilterRow>
  );
};
