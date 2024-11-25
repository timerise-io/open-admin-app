import React from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { DisplayField } from "components/DisplayField";
import { Typography } from "components/Typography";
import FormSelect from "components/forms/FormSelect";
import TextField from "components/forms/TextField";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { DetailsPageLoader } from "components/loaders/DetailsPageLoader";
import { COUNTRY_PHONE_PREFIXES } from "constans/countryPhonePrefixes";
import { TIME_ZONES } from "constans/timeZones";
import { currentUserAtom } from "features/auth/state/currentUserAtom";
import { useProjectUpdate } from "features/project/hooks/useProjectUpdate";
import { projectsAtom } from "features/project/state/projectsAtom";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { TeamMemberRole } from "features/team/components/TeamMemberInvite/TeamMemberInviteFormContent";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";
import { ProjectLabels } from "./components";

export interface SettingsFormValues {
  title: string;
}

const getValidationSchema = (t: TFunction) => {
  return Yup.object({
    title: Yup.string().required(t("validation.required")),
  });
};

const StyledRow = styled(Row)`
  gap: 10px;
`;

export const ProjectSettings = () => {
  const { t } = useTranslation(["common"]);
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const projects = useRecoilValue(projectsAtom);
  const currentProject = projects?.[selectedProjectId ?? ""];
  const { mutation: updateProject } = useProjectUpdate();
  const user = useRecoilValue(currentUserAtom);

  const langs = {
    bg: t("languages.Bulgarian"),
    cs: t("languages.Czech"),
    nl: t("languages.Dutch"),
    en: t("languages.English"),
    fi: t("languages.Finnish"),
    fr: t("languages.French"),
    de: t("languages.German"),
    el: t("languages.Greek"),
    hu: t("languages.Hungarian"),
    it: t("languages.Italian"),
    nb: t("languages.Norwegian"),
    pl: t("languages.Polish"),
    pt: t("languages.Portuguese"),
    es: t("languages.Spanish"),
    sk: t("languages.Slovak"),
    sv: t("languages.Swedish"),
    uk: t("languages.Ukrainian"),
    tr: t("languages.Turkish"),
  };

  let timezones: any = {};
  for (const [key, value] of Object.entries(TIME_ZONES)) {
    timezones[key] = value.name;
  }
  let prefixes: any = {};
  for (const [key, value] of Object.entries(COUNTRY_PHONE_PREFIXES).sort()) {
    prefixes[key] = "(+" + value + ") - " + key;
  }

  if (user?.role === TeamMemberRole.STAFF) {
    return null;
  }

  if (!projects || !currentProject)
    return (
      <PageContent>
        <DetailsPageLoader />
      </PageContent>
    );

  return (
    <Formik
      initialValues={{
        title: currentProject?.title || "",
        localTimeZone: currentProject?.localTimeZone || "",
        lang: currentProject?.defaultLocale?.split("-")[0] || "en",
        prefix: currentProject?.defaultLocale?.split("-")[1] || "GB",
      }}
      onSubmit={(formValues, { resetForm }) => {
        updateProject({
          projectId: selectedProjectId || "",
          title: formValues.title,
          localTimeZone: formValues.localTimeZone,
          defaultLocale: formValues.lang + "-" + formValues.prefix,
        });
        resetForm({ values: { ...formValues } });
      }}
      validationSchema={getValidationSchema(t)}
    >
      {({ isValid, dirty, resetForm }) => {
        return (
          <>
            <Form>
              <PageHeader title={t("project")}>
                <StyledRow>
                  <Button
                    buttonType="secondary"
                    onClick={() => {
                      resetForm();
                    }}
                    disabled={!dirty}
                  >
                    {t("discard")}
                  </Button>
                  <Button buttonType="primary" disabled={!isValid || !dirty} type="submit">
                    {t("save")}
                  </Button>
                </StyledRow>
              </PageHeader>
              <PageContent>
                <Column w="530px" ai="flex-start">
                  <Typography typographyType="h3" as="h3">
                    {t("details")}
                  </Typography>
                  <Card>
                    <DisplayField
                      label={t("project-id")}
                      ctx="project-settings-id"
                      text={currentProject?.projectId || ""}
                      showCopyButton
                    />
                    <TextField name="title" ctx="project-settings-title" />
                    <FormSelect
                      name="localTimeZone"
                      options={timezones}
                      label={t("default-time-zone")}
                      ctx="project-settings-time-zone"
                      withSearch
                    />
                    <Row jc="space-between" ai="center" gap="10px">
                      <FormSelect name="lang" options={langs} label={t("language")} ctx="project-settings-language" />
                      <FormSelect
                        name="prefix"
                        options={prefixes}
                        label={t("phone-number-prefix")}
                        ctx="project-settings-phone-prefix"
                        hideErrors
                        withSearch
                      />
                    </Row>
                  </Card>
                </Column>
              </PageContent>
            </Form>
            <PageContent>
              <Column w="530px" ai="flex-start">
                <ProjectLabels />
              </Column>
            </PageContent>
          </>
        );
      }}
    </Formik>
  );
};
