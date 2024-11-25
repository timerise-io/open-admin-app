import React, { useEffect } from "react";
import { Button } from "components/Button";
import InfoCard from "components/InfoCard";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useInvite } from "features/team/hooks/useInvite";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import TeamMemberInviteFormContent, { TeamMemberInviteFormValues, TeamMemberRole } from "./TeamMemberInviteFormContent";

export const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    email: Yup.string().required(t("common:validation.required")).email(t("common:validation.email")),
  });
};

const initialValues: TeamMemberInviteFormValues = {
  role: TeamMemberRole.MANAGER,
  email: "",
};

const TeamMemberInvite = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const projectId = useRecoilValue(selectedProjectAtom);
  const { mutation, data } = useInvite();

  useEffect(() => {
    if (data?.teamMemberInvite === "ok") {
      navigate(generatePath(ROUTES.team), { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        if (!projectId) return;
        mutation({
          projectId: projectId,
          invitations: [
            {
              role: values.role,
              email: values.email,
            },
          ],
        });
      }}
      validationSchema={getValidationSchema(t)}
    >
      {({ values, resetForm, dirty }) => {
        return (
          <Form>
            <PageHeader title={t("common:team.invite-new-team-memeber")} showBackButton>
              <Row gap="10px">
                <Button buttonType="secondary" onClick={() => resetForm()} type="button">
                  {t("common:discard")}
                </Button>
                <Button buttonType="primary" type="submit" disabled={!dirty}>
                  {t("common:save")}
                </Button>
              </Row>
            </PageHeader>
            <PageContent>
              <Row gap="32px" ai="flex-start" jc="flex-start">
                <Column w="530px" jc="flex-start" ai="flex-start">
                  <TeamMemberInviteFormContent />
                </Column>
                <Column w="334px" mt={8.125}>
                  <InfoCard>{t("common:team.invite-new-team-memeber-info")}</InfoCard>
                </Column>
              </Row>
            </PageContent>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TeamMemberInvite;
