import React from "react";
import { ItemListDataAvatar } from "components/ItemsList/ItemListDataAvatar";
import { ItemListDetailChevron } from "components/ItemsList/ItemListDetailChevron";
import { ItemListTextData } from "components/ItemsList/ItemListTextData";
import { ItemsList } from "components/ItemsList/ItemsList";
import { ItemsListRowWrapper } from "components/ItemsList/ItemsListRowWrapper";
import { ROUTES } from "constans/routes";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { BaseBooking, Booking, BookingStatus } from "features/bookings/model/booking";
import { bookingsArrayAtom } from "features/bookings/state/bookingsAtom";
import { DisplayType } from "features/services/api/mutations/models";
import { FORM_FIELD_TYPES } from "features/services/model/formFields";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { useTranslation } from "react-i18next";
import { generatePath } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled, { css } from "styled-components";
import { BookingEmptyList } from "./BookingsEmptyList";

const statusToColor: Record<BookingStatus, string> = {
  NEW: `#333333`,
  CONFIRMED: `#267D3D`,
  ACCEPTED: `#267D3D`,
  CANCELED: `#C83A2D`,
  REJECTED: `#C83A2D`,
};

const StatusColumn = styled(ItemListTextData)<{
  status: BookingStatus;
}>`
  ${({ status }) => {
    return css`
      .table-data-custom-text {
        color: ${statusToColor[status]};
        font-weight: 700;
      }
    `;
  }}
`;

const getHostsText = (
  hosts: Array<{
    fullName: string;
  }>,
) => {
  if (hosts.length === 0) return "-";

  return `${hosts[0].fullName}${hosts.length > 1 ? ` +${(hosts.length - 1).toFixed(0)}` : ""}`;
};

export const BookingsList = () => {
  const { t } = useTranslation();
  const { format } = useTimezoneFormat();
  const { isLoading } = useRecoilValue(apiStatusAtom("GET_BOOKINGS"));

  const hits = useRecoilValue(bookingsArrayAtom);

  const isCalendar = (item: BaseBooking) => {
    return item.service?.viewConfig?.displayType === DisplayType.CALENDAR;
  };

  const isPreorder = (item: BaseBooking) => {
    return item.service?.viewConfig?.displayType === DisplayType.PREORDER;
  };

  return (
    <div>
      <ItemsList
        noDataSubInfo={t("bookings.no-bookings")}
        EmptyComponent={<BookingEmptyList />}
        isLoading={isLoading}
        headers={[t("customer"), t("when"), t("services.service"), t("host"), t("services.price"), t("status")]}
        items={hits ?? []}
        columns="1fr 180px 240px 160px 120px 160px 52px"
        generator={(props, item: Booking, index: number) => {
          return (
            <ItemsListRowWrapper
              key={`bookings-row-${item.bookingId}`}
              to={generatePath(ROUTES.booking, { id: item.bookingId })}
              {...props}
            >
              <ItemListDataAvatar text={item.formFields[FORM_FIELD_TYPES.SYSTEM_FULL_NAME] ?? ""} index={index} />
              {isCalendar(item) || isPreorder(item) ? (
                <ItemListTextData w={20}>
                  <span
                    title={`${format(item.dateTimeFrom, "E dd MMM yyyy")} - ${format(
                      item.dateTimeTo,
                      "E dd MMM yyyy",
                    )}`}
                  >{`${format(item.dateTimeFrom, "E dd MMM")} - ${format(item.dateTimeTo, "E dd MMM")}`}</span>
                </ItemListTextData>
              ) : (
                <ItemListTextData w={20}>
                  <span title={format(item.dateTimeFrom, "E dd MMM yyyy, H:mm")}>
                    {format(item.dateTimeFrom, "E dd MMM, H:mm")}
                  </span>
                </ItemListTextData>
              )}
              <ItemListTextData w={30}>{item.service.title}</ItemListTextData>
              <ItemListTextData w={20}>{getHostsText(item.service.hosts)}</ItemListTextData>
              <ItemListTextData w={16}>
                {item.service.price === null || item.service.price === 0
                  ? t("services.free")
                  : new Intl.NumberFormat(window.navigator.language ?? "en-US", {
                      style: "currency",
                      currency: item.service.currency,
                    }).format(item.service.price)}
              </ItemListTextData>
              <StatusColumn status={item.status}>
                {item.status.charAt(0) + item.status.slice(1).toLowerCase()}
              </StatusColumn>
              <ItemListDetailChevron />
            </ItemsListRowWrapper>
          );
        }}
      />
    </div>
  );
};
