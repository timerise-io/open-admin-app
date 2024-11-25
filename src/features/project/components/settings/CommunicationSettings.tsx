import React from "react";
import { Button } from "components/Button";
import { Card } from "components/Card";
import { Typography } from "components/Typography";
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

export interface SettingsFormValues {
  title: string;
}

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    senderName: Yup.string()
      .required(t("common:validation.required"))
      .max(11, "Maximum length is 11 characters")
      .matches(/^[a-zA-Z0-9 ]+$/, "Use only space and alphanumeric characters"),
  });
};

const StyledRow = styled(Row)`
  gap: 10px;
`;

export const CommunicationSettings = () => {
  const { t } = useTranslation(["common"]);
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const projects = useRecoilValue(projectsAtom);
  const currentProject = projects?.[selectedProjectId ?? ""];
  const { mutation: updateProject } = useProjectUpdate();
  const user = useRecoilValue(currentUserAtom);

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
        senderName: currentProject.smsConfig?.senderName ?? "",
      }}
      onSubmit={(formValues, { resetForm }) => {
        updateProject({
          projectId: selectedProjectId || "",
          smsConfig: {
            senderName: formValues.senderName,
          },
        });
        resetForm({ values: { ...formValues } });
      }}
      validationSchema={getValidationSchema(t)}
    >
      {({ isValid, dirty, resetForm }) => {
        return (
          <Form>
            <PageHeader title={t("communication")}>
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
                  {t("sms")}
                </Typography>
                <Card>
                  <TextField name="senderName" label={t("sender-name")} />
                </Card>
              </Column>
            </PageContent>
          </Form>
        );
      }}
    </Formik>
  );
};
