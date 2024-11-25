import React, { useEffect } from "react";
import { Button } from "components/Button";
import InfoCard from "components/InfoCard";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useSpaceCreate } from "features/spaces/hooks/useSpaceCreate";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import SpaceFormContent, { SpaceFormValues } from "./SpaceFormContent";
import { PROVIDERS } from "./enums/providers";
import { PROVIDERS_WITHOUT_LINK } from "./states";

export const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    url: Yup.string().when("provider", {
      is: (provider: SpaceFormValues["provider"]) => PROVIDERS_WITHOUT_LINK.includes(provider as PROVIDERS),
      then: () => Yup.string().nullable().notRequired(),
      otherwise: Yup.string()
        .matches(
          /^((https?|ftp):\/\/)(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!$&'()*+,;=]|:|@)|\/|\?)*)?$/i,
          t("common:validation.url"),
        )
        .required(t("common:validation.required")),
    }),
  });
};

const initialValues: SpaceFormValues = {
  provider: PROVIDERS.TIMERISE,
  url: "",
  title: "",
  instructions: "",
};

const AddSpace = () => {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const projectId = useRecoilValue(selectedProjectAtom);
  const { mutation, data } = useSpaceCreate();

  useEffect(() => {
    if (data?.spaceCreate?.spaceId) {
      navigate(generatePath(ROUTES.space, { id: data.spaceCreate.spaceId }), {
        replace: true,
      });
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
          provider: values.provider,
          url: PROVIDERS_WITHOUT_LINK.includes(values.provider as PROVIDERS) ? undefined : values.url,
          ...(values.title && { title: values.title }),
          ...(values.instructions && { instructions: values.instructions }),
        });
      }}
      //validationSchema={(values: SpaceFormValues) => getValidationSchema(t, PROVIDERS_WITHOUT_LINK.includes(values.provider as PROVIDERS).toString())}
      validationSchema={getValidationSchema(t)}
    >
      {({ values, resetForm, dirty }) => {
        return (
          <Form>
            <PageHeader title={t("spaces.add-new-space")} showBackButton>
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
                  <SpaceFormContent provider={values.provider} />
                </Column>
                <Column w="334px" mt={8.125}>
                  <InfoCard>{t("spaces.info")}</InfoCard>
                </Column>
              </Row>
            </PageContent>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddSpace;
