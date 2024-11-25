import EmptyBookings from "assets/images/empty-bookings.png";
import { EmptyList } from "components/emptyList";
import { ROUTES } from "constans/routes";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const BookingEmptyList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <EmptyList
      title={t("bookings.emptyList.title")}
      description={t("bookings.emptyList.description")}
      button={{
        label: t("bookings.emptyList.button"),
        onClick: () => navigate(ROUTES.services),
      }}
      image={{
        src: EmptyBookings,
        width: "444",
      }}
    />
  );
};
