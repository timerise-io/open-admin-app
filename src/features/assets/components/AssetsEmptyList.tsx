import EmptyAssets from "assets/images/empty-assets.png";
import { EmptyList } from "components/emptyList";
import { Trans, useTranslation } from "react-i18next";

export const AssetsEmptyList = () => {
  const { t } = useTranslation();

  return (
    <EmptyList
      title={t("assets.emptyList.title")}
      description={<Trans i18nKey="assets.emptyList.description" components={{ strong: <strong /> }} />}
      image={{
        src: EmptyAssets,
        width: "444",
      }}
    />
  );
};
