import React, { useEffect } from "react";
import { Button } from "components/Button";
import InfoCard from "components/InfoCard";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { useLocationCreate } from "features/locations/hooks/useLocationCreate";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import LocationFormContent, { LocationFormValues } from "../Location/LocationFormContent";

export const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    title: Yup.string().required(t("common:validation.required")),
  });
};

const initialValues: LocationFormValues = {
  title: "",
  description: "",
  media: [],
  address: "",
};

const AddLocation = () => {
  const { t } = useTranslation(["common"]);
  const navigate = useNavigate();
  const projectId = useRecoilValue(selectedProjectAtom);
  const { mutation, data } = useLocationCreate();

  useEffect(() => {
    if (data?.locationCreate?.locationId) {
      navigate(generatePath(ROUTES.location, { id: data.locationCreate.locationId }), { replace: true });
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
          title: values.title,
          media: values.media.map((url, index) => {
            return { url, title: `asset-media-${index}` };
          }),
          description: values.description ?? "",
          address: values.address ?? "",
        });
      }}
      validationSchema={getValidationSchema(t)}
    >
      {({ values, resetForm, dirty }) => {
        return (
          <Form>
            <PageHeader title={t("locations.add-new-location")} showBackButton>
              <Row gap="10px">
                <Button buttonType="secondary" onClick={() => resetForm()} type="button">
                  {t("discard")}
                </Button>
                <Button buttonType="primary" type="submit" disabled={!dirty}>
                  {t("save")}
                </Button>
              </Row>
            </PageHeader>
            <PageContent>
              <Row gap="32px" ai="flex-start" jc="flex-start">
                <Column w="530px" jc="flex-start" ai="flex-start">
                  <LocationFormContent />
                </Column>
                <Column w="334px" mt={8.125}>
                  <InfoCard>{t("locations.info")}</InfoCard>
                </Column>
              </Row>
            </PageContent>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddLocation;
