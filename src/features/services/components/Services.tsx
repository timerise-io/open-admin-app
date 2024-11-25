import React, { useEffect, useMemo, useState } from "react";
import { Button } from "components/Button";
import { ContextLink } from "components/ContextLink";
import { ItemListDataImage } from "components/ItemsList/ItemListDataImage";
import { ItemListTextData } from "components/ItemsList/ItemListTextData";
import { ItemsList } from "components/ItemsList/ItemsList";
import { ItemsListRowWrapper } from "components/ItemsList/ItemsListRowWrapper";
import { StyledTableData, StyledTableDataFlex } from "components/ItemsList/StyledTableData";
import { SearchInput } from "components/SearchInput";
import { CopyShortIdButton } from "components/buttons/CopyShortIdButton";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { User } from "features/team/models/user";
import { useCopiedToast } from "helpers/hooks/useCopiedToast";
import { useWhitelabel } from "helpers/hooks/useWhitelabel";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Service } from "../model/service";
import { servicesAtom } from "../state/servicesAtom";
import { servicesFilterSelector } from "../state/servicesFilterAtom";
import { ServicesEmptyList } from "./Services/ServicesEmptyList";
import ServicesFilters from "./Services/ServicesFilters";

const StyledContextLink = styled(ContextLink)`
  margin-right: 8px;
  display: flex;
  justify-content: center;
`;

const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Services = () => {
  const { t } = useTranslation();
  const showCopiedToast = useCopiedToast();
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const [filters, setFilters] = useRecoilState(servicesFilterSelector);
  const [text, setText] = useState(filters.text);

  const { isLoading } = useRecoilValue(apiStatusAtom("GET_SERVICES"));
  const services = useRecoilValue(servicesAtom);

  const servicesArray = Object.values(services ?? {}).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getHostLabel = (hosts: Array<User>, item: any) => {
    const hostCounter = hosts.length;
    const hostAbove = hostCounter > 1 ? `+${hostCounter - 1}` : "";
    const host = hostCounter ? hosts[0].fullName : null;
    return hostCounter ? `${host} ${hostAbove}` : "-";
  };

  const navigation = useNavigate();
  const whitelabel = useWhitelabel();

  useEffect(() => {
    if (filters.text === text) return;
    setFilters({
      ...filters,
      text,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const servicesLink = useMemo(() => {
    return whitelabel.servicesApp === true
      ? whitelabel.servicesAppUrl + "/" + selectedProjectId
      : `${process.env.REACT_APP_SERVICES}/${selectedProjectId}`;
  }, [selectedProjectId, whitelabel]);

  const openPage = () => {
    window.open(servicesLink, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(servicesLink);
    showCopiedToast();
  };

  return (
    <>
      <PageHeader
        title={t("services.services")}
        actions={
          whitelabel.servicesApp &&
          whitelabel.servicesApp === true && [
            { label: t("open-page"), action: openPage },
            { label: t("copy-link"), action: copyLink },
          ]
        }
      >
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
              navigation(ROUTES.serviceAdd);
            }}
          >
            + {t("add")}
          </Button>
        </Row>
      </PageHeader>
      <ServicesFilters />
      <PageContent>
        <ItemsList
          noDataSubInfo={t("services:no-services")}
          EmptyComponent={<ServicesEmptyList />}
          disableNoDataInfo
          isLoading={isLoading}
          headers={[t("services.service"), t("host"), t("services.price"), t("services.booking-link"), t("short-id")]}
          items={servicesArray}
          columns="1fr 300px 120px 150px 160px"
          generator={(props, item: Service) => {
            return (
              <ItemsListRowWrapper
                key={`service-row-${item.serviceId}`}
                to={generatePath(ROUTES.service, { id: item.serviceId })}
                {...props}
              >
                <ItemListDataImage text={item.title} src={item.media?.[0]?.url ?? ""} />
                <ItemListTextData>{getHostLabel(item.hosts, item)}</ItemListTextData>
                <ItemListTextData>
                  {item.price ? `${item.price} ${item.currency}` : t("services.free")}
                </ItemListTextData>
                <StyledTableData w={28}>
                  <StyledButtonsWrapper>
                    <StyledContextLink
                      href={
                        whitelabel.shortUrls === true
                          ? item.shortUrl
                          : whitelabel.bookingAppUrl + "/service/" + item.serviceId
                      }
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <strong>{t("open")}</strong>
                    </StyledContextLink>
                    <CopyShortIdButton
                      shortId={
                        whitelabel.shortUrls === true
                          ? item.shortUrl
                          : whitelabel.bookingAppUrl + "/service/" + item.serviceId
                      }
                      showValue={false}
                    />
                  </StyledButtonsWrapper>
                </StyledTableData>
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
