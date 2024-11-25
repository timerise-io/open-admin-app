import EmptyLocations from "assets/images/empty-locations.png";
import { EmptyList } from "components/emptyList";
import { Trans, useTranslation } from "react-i18next";

export const LocationsEmptyList = () => {
  const { t } = useTranslation();

  return (
    <EmptyList
      title={t("locations.emptyList.title")}
      description={<Trans i18nKey="locations.emptyList.description" components={{ strong: <strong /> }} />}
      image={{
        src: EmptyLocations,
        width: "444",
      }}
    />
  );
};
