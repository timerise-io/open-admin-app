import React, { useEffect, useState } from "react";
import { Button } from "components/Button";
import { ContextLink } from "components/ContextLink";
import { ItemList } from "components/ItemsList/ItemList";
import { ItemListDataImage } from "components/ItemsList/ItemListDataImage";
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
import { Space } from "../model/space";
import { spacesAtom } from "../state/spacesAtom";
import { spacesFilterSelector } from "../state/spacesFilterAtom";
import { SpacesEmptyList } from "./SpacesEmptyList";

const StyledItemListDataImage = styled(ItemListDataImage)``;

const StyledContextLink = styled(ContextLink)`
  margin-right: 8px;
  display: flex;
  justify-content: space-between;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Spaces = () => {
  const { t } = useTranslation();
  const filters = useRecoilValue(spacesFilterSelector);
  const setFilterText = useSetRecoilState(textFilterAtom("SPACES"));

  const { isLoading } = useRecoilValue(apiStatusAtom("GET_SPACES"));
  const spaces = useRecoilValue(spacesAtom);
  const [text, setText] = useState(filters.text);
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const navigate = useNavigate();
  const spaceArray = Object.values(spaces ?? {});

  useEffect(() => {
    if (filters.text === text) return;
    setFilterText(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      <PageHeader title={t("common:spaces.spaces")}>
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
              navigate(ROUTES.spaceAdd);
            }}
          >
            + {t("add")}
          </Button>
        </Row>
      </PageHeader>
      <PageContent>
        <ItemsList
          noDataSubInfo={t("spaces.no-spaces")}
          EmptyComponent={<SpacesEmptyList />}
          disableNoDataInfo
          isLoading={isLoading}
          headers={[t("name"), t("link"), t("short-id")]}
          items={spaceArray}
          columns="1fr 150px 160px"
          generator={(props, item: Space) => {
            return (
              <ItemsListRowWrapper
                to={generatePath(ROUTES.space, { id: item.spaceId })}
                key={`space-row-${item.spaceId}`}
                {...props}
              >
                <StyledItemListDataImage text={item.title} src={`https://cdn.timerise.io/admin/${item.provider}.png`} />
                <ItemList>
                  <StyledButtonsWrapper>
                    <StyledContextLink
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <strong>{t("open")}</strong>
                    </StyledContextLink>
                    <CopyShortIdButton shortId={item.url} showValue={false} />
                  </StyledButtonsWrapper>
                </ItemList>
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
