import React, { useMemo } from "react";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { formatDuration, intervalToDuration } from "date-fns";
import { Booking } from "features/bookings/model/booking";
import { DisplayType } from "features/services/api/mutations/models";
import { PROVIDERS } from "features/spaces/components/Space/enums/providers";
import { getDatesValue } from "helpers";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { BookingHistory } from "./BookingHistory";
import DisplayPaymentStatusField from "./DisplayPaymentStatusField";

interface BookingDetailsProps {
  booking: Booking;
}

export const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => {
  const { t } = useTranslation();
  const { format } = useTimezoneFormat();
  const navigate = useNavigate();
  const duration = intervalToDuration({
    start: 0,
    end: new Date(booking.dateTimeTo).getTime() - new Date(booking.dateTimeFrom).getTime(),
  });

  const isCalendar = useMemo(() => {
    return booking?.service?.viewConfig?.displayType === DisplayType.CALENDAR;
  }, [booking?.service?.viewConfig?.displayType]);

  const isPreorder = useMemo(() => {
    return booking?.service?.viewConfig?.displayType === DisplayType.PREORDER;
  }, [booking?.service?.viewConfig?.displayType]);

  return (
    <>
      <Typography typographyType="h3" as="h3">
        {t("details")}
      </Typography>
      <Card>
        <Row gap="10px">
          <DisplayField label={t("bookings.booking-id")} text={booking.bookingId} showCopyButton />
          <DisplayField label={t("short-id")} text={booking.shortId} showCopyButton />
        </Row>

        {isCalendar || isPreorder ? (
          <Row gap="8px">
            <DisplayField
              label="Dates"
              text={getDatesValue({
                dateTimeFrom: booking.dateTimeFrom,
                dateTimeTo: booking.dateTimeTo,
                format,
                /* @ts-ignore */
                viewConfig: booking.service.viewConfig,
              })}
              isBold
            />
          </Row>
        ) : (
          booking.slots.map((slot, i) => {
            return (
              <Row gap="8px">
                <DisplayField
                  label={i === 0 ? t("date-time") : ""}
                  text={getDatesValue({
                    dateTimeFrom: slot.dateTimeFrom,
                    dateTimeTo: slot.dateTimeTo,
                    format,
                    /* @ts-ignore */
                    viewConfig: booking.service.viewConfig,
                  })}
                  isBold
                  disableBottomMargin={booking.slots.length - i !== 1}
                />
              </Row>
            );
          })
        )}
        <Row gap="8px">
          <BookingHistory booking={booking} />
          {/* <DisplayField label="Booking created" text={format(booking.createdAt, "E d MMM yyyy, H:mm")} /> */}
        </Row>
        {/* <DisplayStatusField status={booking.status} /> */}
        <DisplayPaymentStatusField paymentStatus={booking.paymentStatus} />

        <DisplayField
          label={t("services.service")}
          text={booking.service.title ?? ""}
          customButtonText={t("open")}
          showCustomButton
          onClick={() => {
            navigate(generatePath(ROUTES.service, { id: booking.service.serviceId }));
          }}
          isBold
        />

        <DisplayField label={t("services.duration")} text={formatDuration(duration)} />

        {booking.service.spaces.map((item, index) => {
          if (
            (item.provider === PROVIDERS.GOOGLE_MEET && item.url === null) ||
            (item.provider === PROVIDERS.TIMERISE && item.url === null)
          )
            return null;
          return (
            <DisplayField
              key={`booking-asset-${item.spaceId}`}
              text={item.title ?? ""}
              label={index === 0 ? t("spaces.spaces") : undefined}
              disableBottomMargin={booking.service.spaces.length - index !== 1}
              showCopyButton
              customCopyButtonText={t("copy-link")}
              customFieldToCopy={item.url.replace("https://", "")}
              showCustomButton={Boolean(item.url)}
              customButtonText={t("open")}
              onClick={() => window.open(item.url, "_blank")}
              showSecondCustomButton
              secondCustomButtonText={t("edit")}
              onClickSecond={() => {
                navigate(generatePath(ROUTES.space, { id: item.spaceId }));
              }}
            />
          );
        })}

        <DisplayField label={t("locations.location")} text={booking.locations.map((item) => item.title).join(", ")} />

        {booking.service.hosts.map((item, index) => {
          return (
            <DisplayField
              key={`booking-hosts-${item.userId}`}
              text={item.fullName ?? ""}
              label={index === 0 ? t("hosts") : undefined}
              customButtonText={t("open")}
              showCustomButton
              onClick={() => {
                navigate(generatePath(ROUTES.teamMember, { id: item.userId }));
              }}
              disableBottomMargin={index !== booking.service.hosts.length - 1}
            />
          );
        })}

        {booking.service.assets?.map((item, index) => {
          return (
            <DisplayField
              key={`booking-asset-${item.assetId}`}
              text={item.title ?? ""}
              label={index === 0 ? t("assets.assets") : undefined}
              disableBottomMargin
            />
          );
        })}
      </Card>
    </>
  );
};
