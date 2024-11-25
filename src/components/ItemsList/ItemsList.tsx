import React, { ReactNode } from "react";
import { Typography } from "components/Typography";
import { Column } from "components/layout/Column";
import { Row } from "components/layout/Row";
import { Spinner } from "components/loaders/Spinner";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";

const StyledGrid = styled.div<{
  columnCount: number;
  rowCount: number;
  columns?: string;
}>`
  width: 100%;
  display: grid;
  gap: 8px 0;

  ${({ columnCount, rowCount, columns }) => {
    const columnsTemplate = columns || `repeat(${columnCount}, 1fr)`;

    return css`
      grid-template-columns: ${columnsTemplate};
      grid-template-rows: 30px repeat(${rowCount}, 80px);
    `;
  }}

  & > .data-row {
    display: grid;
    ${({ columnCount, columns }) => {
      const columnsTemplate = columns || `repeat(${columnCount}, 1fr)`;
      return css`
        grid-template-columns: ${columnsTemplate};
      `;
    }}
  }
`;

const Header = styled(Typography)<{ index: number }>`
  align-self: end;
  grid-row-start: 1;
  grid-row-end: 2;
  text-transform: uppercase;

  ${({ index }) => {
    return css`
      padding-left: ${index === 0 ? "16px" : "0px"};
      grid-column-start: ${1 + index};
      grid-column-end: ${2 + index};
    `;
  }}
`;
interface ItemsListProps<ObjectType> {
  isLoading?: boolean;
  items: Array<ObjectType>;
  headers: Array<string>;
  generator?: (rowProps: { index: number }, item: ObjectType, index: number) => ReactNode;

  columns?: string;
  noDataSubInfo?: string;
  disableNoDataInfo?: boolean;
  EmptyComponent?: JSX.Element;
}

export const ItemsList = <ListItem extends unknown>({
  items,
  headers,
  columns,
  generator,
  isLoading,
  noDataSubInfo,
  disableNoDataInfo = false,
  EmptyComponent,
}: ItemsListProps<ListItem>) => {
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <Row mt={20} jc="center">
        <Column>
          <Spinner />
          <Typography typographyType="body">{t("loading")}</Typography>
        </Column>
      </Row>
    );
  }

  if (!isLoading && items.length === 0) {
    if (EmptyComponent) {
      return (
        <Row mt={10} jc="center">
          {EmptyComponent}
        </Row>
      );
    }

    return (
      <Row mt={20} jc="center">
        <Column>
          {noDataSubInfo && (
            <Typography typographyType="body" as="span">
              {noDataSubInfo}
            </Typography>
          )}
          {disableNoDataInfo === false && (
            <Typography typographyType="body" as="span">
              {t("try-another-phrase-filters")}
            </Typography>
          )}
        </Column>
      </Row>
    );
  }

  return (
    <>
      <StyledGrid columnCount={headers.length} rowCount={items.length} columns={columns}>
        {headers.map((item, index) => {
          return (
            <Header typographyType="label" as="span" key={`header-${index}-${item}`} index={index}>
              {item}
            </Header>
          );
        })}
        {generator &&
          items.map((item, index) => {
            return generator({ index }, item, index);
          })}
      </StyledGrid>
    </>
  );
};
