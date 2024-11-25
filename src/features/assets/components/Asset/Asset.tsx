import React from "react";
import { Button } from "components/Button";
import ExceptionsSection from "components/Exceptions/ExceptionsSection";
import ExtendedMenu, { ExtendedMenuButton, ExtendedMenuSplitter } from "components/dropdowns/ExtendedMenu";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { DetailsPageLoader } from "components/loaders/DetailsPageLoader";
import { FullPageOverlayLoader } from "components/loaders/FullPageOverlayLoader";
import { useAsset } from "features/assets/hooks/useAsset";
import { useAssetDuplicate } from "features/assets/hooks/useAssetDuplicate";
import { useAssetExceptionCreate } from "features/assets/hooks/useAssetExceptionCreate";
import { useAssetExceptions } from "features/assets/hooks/useAssetExceptions";
import { useAssetSlotDelete } from "features/assets/hooks/useAssetSlotDelete";
import { useAssetUpdate } from "features/assets/hooks/useAssetUpdate";
import { selectedAssetAtom } from "features/assets/state/selectedAssetAtom";
import { selectedAssetsExceptionsAtom } from "features/assets/state/selectedAssetExceptionsAtom";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import BookingListColumn from "features/bookings/components/BookingsListColumn/BookingListColumn";
import { BOOKING_DATE_RANGE } from "features/bookings/model/dateRange";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { Form, Formik } from "formik";
import { TFunction, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import * as Yup from "yup";
import AssetFormContent, { AssetFormContentProps } from "./AssetFormContent";
import DeleteAssetButton from "./DeleteAssetButton";

export const getValidationSchemaForAssetsDetails = (t: TFunction<"common"[]>) => {
  return Yup.object({
    title: Yup.string().required(t("common:validation.required")),
  });
};

const StyledColumn = styled(Column)`
  width: 530px;
`;

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Asset = () => {
  const { id } = useParams<{ id: string }>();
  useAsset(id!);
  useAssetExceptions(id!);
  const asset = useRecoilValue(selectedAssetAtom);
  const assetExceptions = useRecoilValue(selectedAssetsExceptionsAtom);
  const { t } = useTranslation(["common"]);
  const duplicateStatus = useRecoilValue(apiStatusAtom("ASSET_DUPLICATE"));
  const selectedProjectId = useRecoilValue(selectedProjectAtom);
  const { mutation } = useAssetUpdate();
  const { mutation: createException } = useAssetExceptionCreate();
  const { mutation: deleteException } = useAssetSlotDelete();
  const { mutation: duplicateAsset } = useAssetDuplicate();

  if (!asset)
    return (
      <PageContent>
        <DetailsPageLoader />
      </PageContent>
    );

  const initialValues: AssetFormContentProps = {
    title: asset.title,
    description: asset.description,
    quantity: asset.quantity,
    media: asset.media?.map((item) => item.url) ?? [],
    location: asset.location?.locationId ?? "None",
  };

  return (
    <Wrapper>
      {duplicateStatus.isLoading && <FullPageOverlayLoader />}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          mutation({
            assetId: asset.assetId,
            projectId: asset.projectId,
            description: values.description,
            quantity: values.quantity,
            title: values.title,
            locationId: values.location !== "None" ? values.location : "",
            media: values.media.map((url, index) => {
              return { url, title: `asset-media-${index}` };
            }),
          });
        }}
        validationSchema={getValidationSchemaForAssetsDetails(t)}
      >
        {({ values, resetForm, dirty }) => {
          return (
            <Form>
              <PageHeader title={asset.title} showBackButton>
                <Row gap="10px">
                  <Button buttonType="secondary" onClick={() => resetForm()} type="button">
                    {t("common:discard")}
                  </Button>
                  <Button buttonType="primary" type="submit" disabled={!dirty}>
                    {t("common:save")}
                  </Button>
                  <ExtendedMenu>
                    <ExtendedMenuButton
                      buttonType="secondary"
                      type="button"
                      onClick={() => {
                        duplicateAsset({
                          projectId: selectedProjectId ?? "",
                          assetId: asset.assetId,
                        });
                      }}
                      disabled={selectedProjectId === undefined}
                    >
                      {t("duplicate")}
                    </ExtendedMenuButton>
                    <ExtendedMenuSplitter />
                    <DeleteAssetButton />
                  </ExtendedMenu>
                </Row>
              </PageHeader>
              <PageContent>
                <Row gap="32px" ai="flex-start" jc="flex-start">
                  <StyledColumn ai="flex-start">
                    <AssetFormContent shortId={asset?.shortId} systemId={asset?.assetId} />
                  </StyledColumn>
                  <Column ai="flex-start" jc="flex-start" w="334px" pt={2}>
                    <ExceptionsSection
                      title={t("common:availability-exceptions")}
                      slots={assetExceptions}
                      onDeleteConfirm={(slotId) => {
                        deleteException({
                          slotId,
                          assetId: asset.assetId,
                          projectId: asset.projectId,
                        });
                      }}
                      onCreateException={(item) => {
                        createException({
                          ...item,
                          assetId: asset.assetId,
                          projectId: asset.projectId,
                          slotType: "EXCEPTION",
                          quantity: 1,
                        });
                      }}
                    />
                    <BookingListColumn
                      title="Today's bookings"
                      filters={{
                        date: BOOKING_DATE_RANGE.TODAY,
                        text: "",
                        assetId: asset.assetId,
                      }}
                    />
                  </Column>
                </Row>
              </PageContent>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default Asset;
