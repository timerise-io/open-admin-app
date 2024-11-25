import React, { useEffect, useState } from "react";
import { Button } from "components/Button";
import { ItemListDataImage } from "components/ItemsList/ItemListDataImage";
import { ItemListTextData } from "components/ItemsList/ItemListTextData";
import { ItemsList } from "components/ItemsList/ItemsList";
import { ItemsListRowWrapper } from "components/ItemsList/ItemsListRowWrapper";
import { StyledTableDataFlex } from "components/ItemsList/StyledTableData";
import { SearchInput } from "components/SearchInput";
import { Select } from "components/Select";
import { CopyShortIdButton } from "components/buttons/CopyShortIdButton";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { locationsDictionaryAtom } from "features/locations/state/locationsDictionaryAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { assetArraySelector } from "../state/assetArrayAtom";
import { assetsFilterSelector } from "../state/assetsFilterAtom";
import { AssetsEmptyList } from "./AssetsEmptyList";

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

export const Assets = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useRecoilState(assetsFilterSelector);
  const { isLoading } = useRecoilValue(apiStatusAtom("GET_ASSETS"));
  const assetsArray = useRecoilValue(assetArraySelector);
  const locations = useRecoilValue(locationsDictionaryAtom) ?? {};
  const [text, setText] = useState(filters.text);
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const navigate = useNavigate();

  const locationsOptions = Object.values(locations).reduce(
    (acc, item) => {
      return { ...acc, [item.locationId]: item.title };
    },
    { 0: t("all") },
  );

  useEffect(() => {
    if (filters.text === text) return;
    setFilters({
      ...filters,
      text,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      <PageHeader title={t("assets.assets")}>
        <Row gap="10px">
          <SearchInput
            key={selectedProjectId}
            startValue={filters.text}
            onChange={(value) => {
              setText(value.length < 3 ? "" : value);
            }}
          />
          <Button
            buttonType="primary"
            onClick={() => {
              navigate(ROUTES.assetAdd);
            }}
          >
            + {t("add")}
          </Button>
        </Row>
      </PageHeader>
      <FilterRow>
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
      </FilterRow>
      <PageContent>
        <ItemsList
          noDataSubInfo={t("assets.no-assets")}
          EmptyComponent={<AssetsEmptyList />}
          disableNoDataInfo
          isLoading={isLoading}
          headers={[t("name"), t("locations.location"), t("short-id")]}
          items={assetsArray}
          columns="1fr 340px 160px"
          generator={(props, item) => {
            return (
              <ItemsListRowWrapper
                key={`asset-row-${item.assetId}`}
                to={generatePath(ROUTES.asset, { id: item.assetId })}
                {...props}
              >
                <ItemListDataImage text={item.title} src={item?.media?.[0]?.url ?? ""} />
                <ItemListTextData w={30}>{item.location !== null && item.location.title}</ItemListTextData>
                <StyledTableDataFlex w={15} paddingRight>
                  <CopyShortIdButton shortId={item.shortId} />
                </StyledTableDataFlex>
              </ItemsListRowWrapper>
            );
          }}
        />
      </PageContent>
    </>
  );
};
