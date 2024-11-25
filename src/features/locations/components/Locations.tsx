import React, { useEffect, useState } from "react";
import { Button } from "components/Button";
import { ItemListDataImage } from "components/ItemsList/ItemListDataImage";
import { ItemListTextData } from "components/ItemsList/ItemListTextData";
import { ItemsList } from "components/ItemsList/ItemsList";
import { ItemsListRowWrapper } from "components/ItemsList/ItemsListRowWrapper";
import { StyledTableDataFlex } from "components/ItemsList/StyledTableData";
import { SearchInput } from "components/SearchInput";
import { CopyShortIdButton } from "components/buttons/CopyShortIdButton";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { textFilterAtom } from "helpers/state/textFilterAtom";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Location } from "../model/location";
import { locationsAtom } from "../state/locationsAtom";
import { locationsFilterSelector } from "../state/locationsFilterAtom";
import { LocationsEmptyList } from "./LocationsEmptyList";

const StyledItemListDataImage = styled(ItemListDataImage)``;
const StyledDescription = styled(ItemListTextData)`
  margin-right: 16px;
`;

export const Locations = () => {
  const { t } = useTranslation();
  const filters = useRecoilValue(locationsFilterSelector);
  const setFilterText = useSetRecoilState(textFilterAtom("LOCATIONS"));

  const { isLoading } = useRecoilValue(apiStatusAtom("GET_LOCATIONS"));
  const locations = useRecoilValue(locationsAtom);
  const [text, setText] = useState(filters.text);
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const navigate = useNavigate();
  const locationArray = Object.values(locations ?? {});

  useEffect(() => {
    if (filters.text === text) return;

    setFilterText(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      <PageHeader title={t("locations.locations")}>
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
              navigate(ROUTES.locationAdd);
            }}
          >
            + {t("add")}
          </Button>
        </Row>
      </PageHeader>
      <PageContent>
        <ItemsList
          noDataSubInfo={t("locations.no-locations")}
          EmptyComponent={<LocationsEmptyList />}
          disableNoDataInfo
          isLoading={isLoading}
          headers={[t("name"), t("address"), t("short-id")]}
          items={locationArray}
          columns="300px 1fr 160px"
          generator={(props, item: Location) => {
            return (
              <ItemsListRowWrapper
                to={generatePath(ROUTES.location, { id: item.locationId })}
                key={`location-row-${item.locationId}`}
                {...props}
              >
                <StyledItemListDataImage text={item.title} src={item?.media?.[0]?.url ?? ""} />
                <StyledDescription>{item.address ?? ""}</StyledDescription>
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
