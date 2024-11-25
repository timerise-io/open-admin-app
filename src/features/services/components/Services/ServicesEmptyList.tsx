import EmptyServices from "assets/images/empty-services.png";
import { EmptyList } from "components/emptyList";
import { Trans, useTranslation } from "react-i18next";

export const ServicesEmptyList = () => {
  const { t } = useTranslation();

  return (
    <EmptyList
      title={t("services.emptyList.title")}
      description={<Trans i18nKey="services.emptyList.description" components={{ strong: <strong /> }} />}
      image={{
        src: EmptyServices,
        width: "444",
      }}
    />
  );
};
