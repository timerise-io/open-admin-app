import React, { useMemo } from "react";
import { Select } from "components/Select";
import { Row } from "components/layout/Row";
import { assetsDictionaryAtom } from "features/assets/state/assetsDictionaryAtom";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { locationsDictionaryAtom } from "features/locations/state/locationsDictionaryAtom";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { servicesFilterAtom } from "features/services/state/servicesFilterAtom";
import { spacesDictionaryAtom } from "features/spaces/state/spacesDictionaryAtom";
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

const ServicesFilters = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useRecoilState(servicesFilterAtom);
  const spaces = useRecoilValue(spacesDictionaryAtom) ?? {};
  const locations = useRecoilValue(locationsDictionaryAtom) ?? {};
  const assets = useRecoilValue(assetsDictionaryAtom) ?? {};
  const team = useRecoilValue(teamDictionaryAtom) ?? {};
  const user = useRecoilValue(currentUserAtom) ?? ({} as any);
  const project = useRecoilValue(selectedProjectSelector);

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

  const spacesOptions = Object.values(spaces).reduce(
    (acc, item) => {
      return { ...acc, [item.spaceId]: item.title };
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

  const hostsOptions = Object.values(team).reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.userId]: item.fullName,
      };
    },
    { 0: t("all") },
  );

  const labelsOptions =
    project?.labels?.reduce(
      (acc, item) => {
        return { ...acc, [item]: item };
      },
      { 0: t("all") },
    ) ?? {};

  return (
    <FilterRow jc="flex-start">
      <Select
        label={t("spaces.space")}
        value={filters.spaceId ?? "0"}
        options={spacesOptions}
        onChange={(value) => {
          setFilters({
            ...filters,
            spaceId: value === "0" ? undefined : value,
          });
        }}
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
        disabled={!checkAccessToHosts}
      />
      <Select
        label={t("label")}
        value={filters.label ?? "0"}
        options={labelsOptions}
        onChange={(value) => {
          setFilters({
            ...filters,
            label: value === "0" ? undefined : value,
          });
        }}
      />
    </FilterRow>
  );
};

export default ServicesFilters;
