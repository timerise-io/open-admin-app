import EmptySpaces from "assets/images/empty-spaces.png";
import { EmptyList } from "components/emptyList";
import { Trans, useTranslation } from "react-i18next";

export const SpacesEmptyList = () => {
  const { t } = useTranslation();

  return (
    <EmptyList
      title={t("spaces.emptyList.title")}
      description={<Trans i18nKey="spaces.emptyList.description" components={{ strong: <strong /> }} />}
      image={{
        src: EmptySpaces,
        width: "444",
      }}
    />
  );
};
