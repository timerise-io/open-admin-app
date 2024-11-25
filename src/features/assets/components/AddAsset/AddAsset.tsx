import React, { useEffect } from "react";
import { Button } from "components/Button";
import InfoCard from "components/InfoCard";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { ROUTES } from "constans/routes";
import { useAssetCreate } from "features/assets/hooks/useAssetCreate";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";
import AssetFormContent, { AssetFormContentProps } from "../Asset/AssetFormContent";

export const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    title: Yup.string().required(t("common:validation.required")),
  });
};

const initialValues: AssetFormContentProps = {
  title: "",
  description: "",
  quantity: 1,
  media: [],
  location: "None",
};

const AddAsset = () => {
  const { t } = useTranslation();
  const { mutation, data } = useAssetCreate();
  const navigate = useNavigate();
  const projectId = useRecoilValue(selectedProjectAtom);

  useEffect(() => {
    if (data?.assetCreate?.assetId) {
      navigate(generatePath(ROUTES.asset, { id: data.assetCreate.assetId }), {
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
          title: values.title,
          description: values.description,
          quantity: values.quantity,
          locationId: values.location !== "None" ? values.location : "",
          projectId: projectId,
          media: values.media.map((url, index) => {
            return { url, title: `asset-media-${index}` };
          }),
        });
      }}
      validationSchema={getValidationSchema(t)}
    >
      {({ values, resetForm, dirty }) => {
        return (
          <Form>
            <PageHeader title={t("assets.add-new-asset")} showBackButton>
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
                  <AssetFormContent />
                </Column>
                <Column w="334px" mt={8.125}>
                  <InfoCard>{t("assets.info")}</InfoCard>
                </Column>
              </Row>
            </PageContent>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddAsset;
