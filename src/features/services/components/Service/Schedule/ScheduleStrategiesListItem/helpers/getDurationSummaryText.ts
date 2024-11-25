import { TFunction } from "react-i18next";

export const getDurationSummaryText = ({
  duration,
  breakTime,
  quantity,
  t,
}: {
  duration: string;
  breakTime: number | null;
  quantity: number;
  t: TFunction;
}): string => {
  const durationText = `${duration} ${t("services.min")},`;
  const breakTimeText = breakTime ? `${breakTime} ${t("services.min-break")},` : "";
  const quantityText = `${quantity} ${t("services.bookings-per-slot")}`;

  return `${durationText} ${breakTimeText} ${quantityText}`;
};
