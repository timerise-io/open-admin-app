import { useEffect, useState } from "react";
import { SearchInput } from "components/SearchInput";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { tokenSelector } from "features/auth/state/tokenSelector";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useTranslation } from "react-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { useBookings } from "../hooks/useBookings";
import { bookingsFilterSelector } from "../state/bookingsFilterAtom";
import { BookingsFilters } from "./Bookings/BookingsFilters";
import { BookingsList } from "./Bookings/BookingsList";

export const Bookings = () => {
  useBookings();
  const { t } = useTranslation();
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const [filters, setFilters] = useRecoilState(bookingsFilterSelector);
  const [text, setText] = useState(filters.text);
  const [disableExportButton, setDisableExportButton] = useState(false);
  const token = useRecoilValue(tokenSelector);

  useEffect(() => {
    if (filters.text === text) return;
    setFilters({
      ...filters,
      text,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const exportBookings = () => {
    setDisableExportButton(true);
    fetch(process.env.REACT_APP_TOOLS + "/export/bookings?projectId=" + selectedProjectId + "&format=csv", {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const element = document.createElement("a");
        element.href = URL.createObjectURL(blob);
        element.download = "export-bookings-" + Date.now() + ".csv";
        document.body.appendChild(element);
        element.click();
        setDisableExportButton(false);
      })
      .catch((error) => {
        console.log(error);
        setDisableExportButton(false);
      });
  };

  return (
    <>
      <PageHeader
        title={t("bookings.bookings")}
        actions={[{ label: t("export-data"), action: exportBookings, loading: disableExportButton }]}
      >
        <SearchInput
          key={selectedProjectId}
          startValue={filters.text}
          onChange={(value) => {
            setText(value.length < 3 ? "" : value);
          }}
        />
      </PageHeader>
      <BookingsFilters />
      <PageContent>
        <BookingsList />
      </PageContent>
    </>
  );
};
