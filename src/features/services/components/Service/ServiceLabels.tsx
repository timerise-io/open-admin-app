import React from "react";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
import FormSelect from "components/forms/FormSelect";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const StyledHeader = styled(Typography)`
  margin-top: 32px;
`;

export const ServiceLabels = () => {
  const { t } = useTranslation();
  const service = useRecoilValue(selectedServiceAtom);
  const project = service?.project;
  const serviceOptions = service?.labels ?? [];
  const projectLabels = project?.labels ?? [];

  const parsedServiceOptions = serviceOptions
    ? serviceOptions.reduce((acc, key) => {
        acc[key] = key;
        return acc;
      }, {} as Record<string, string>)
    : {};

  const parsedProjectOptions = projectLabels.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {} as Record<string, string>);

  const defaultOptions = {
    Paid: t("services.paid"),
    Free: t("services.free"),
    Online: t("services.online"),
    Offline: t("services.offline"),
    "Internal event": t("services.internal-event"),
  };

  const options = { ...parsedServiceOptions, ...parsedProjectOptions, ...defaultOptions };

  return (
    <>
      <StyledHeader typographyType="h3" as="h3">
        {t("labels")}
      </StyledHeader>
      <Card>
        <FormSelect
          label={t("labels")}
          name={"labels"}
          options={options}
          hideErrors
          placeholder={t("select-placeholder")}
          withAddOption
        />
      </Card>
    </>
  );
};
