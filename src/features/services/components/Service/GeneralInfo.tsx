import React, { PropsWithChildren } from "react";
import { Button } from "components/Button";
import ExtendedMenu, { ExtendedMenuButton, ExtendedMenuSplitter } from "components/dropdowns/ExtendedMenu";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { FullPageOverlayLoader } from "components/loaders/FullPageOverlayLoader";
import { apiStatusAtom } from "features/auth/api/state/apiStatusAtom";
import { useProjectUpdate } from "features/project/hooks/useProjectUpdate";
import { selectedProjectSelector } from "features/project/state/selectedProjectSelector";
import { useServiceDuplicate } from "features/services/hooks/useServiceDuplicate";
import { useServiceUpdate } from "features/services/hooks/useServiceUpdate";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Form, Formik } from "formik";
import { uniq } from "lodash";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ServiceDetailsFormContentProps,
  getValidationSchemaForServiceDetails,
} from "../ServiceDetailsFormContent/ServiceDetailsFormContent";
import DeleteServiceButton from "./DeleteServiceButton";
import { ServiceDetails } from "./ServiceDetails";

const Wrapper = styled.div`
  position: relative;
`;

const GeneralInfo: React.FC<PropsWithChildren> = ({ children }) => {
  const duplicateStatus = useRecoilValue(apiStatusAtom("SERVICE_DUPLICATE"));
  const { t } = useTranslation();
  const { mutation } = useServiceUpdate();
  const selectedProject = useRecoilValue(selectedProjectSelector);
  const service = useRecoilValue(selectedServiceAtom);
  const { mutation: duplicateService } = useServiceDuplicate();
  const { mutation: updateProjectMutation } = useProjectUpdate(true);

  const handleSubmit = (values: ServiceDetailsFormContentProps) => {
    if (selectedProject === undefined || service === undefined) return;

    mutation({
      serviceId: service.serviceId,
      assets: values.assets,
      currency: values.currency,
      hosts: values.hosts,
      spaces: values.spaces,
      locations: values.locations,
      price: values.payment === "free" ? 0 : +values.price,
      taxRate: values.taxRate,
      taxBehavior: values.taxBehavior,
      projectId: selectedProject.projectId,
      title: values.title,
      media: values.media.map((item, index) => {
        return { title: `service-media-${index}`, url: item };
      }),
      description: values.description,
      instructions: values.instructions,
      featured: values.featured,
      draft: values.draft,
      shortDescription: values.shortDescription,
      paymentProviders: values.paymentProviders,
      stripeTaxId: values.stripeTaxId,
      durationInfo: values.duration,
      labels: values.labels,
    });

    updateProjectMutation({
      projectId: selectedProject.projectId,
      labels: uniq([...(selectedProject.labels as []), ...values.labels]),
    });
  };

  if (!service) return null;

  const initialValues: ServiceDetailsFormContentProps = {
    title: service.title,
    shortDescription: service.shortDescription ?? "",
    description: service.description ?? "",
    media: service.media.map((item) => item.url),
    payment: service.price > 0 ? "paid" : "free",
    currency: service.currency,
    instructions: service.instructions ?? "",
    assets: service.assets.map((item) => item.assetId),
    spaces: service.spaces?.map((item) => item.spaceId) ?? [],
    locations: service.locations?.map((item) => item.locationId) ?? [],
    hosts: service.hosts.map((item) => item.userId),
    price: service.price,
    taxRate: service.taxRate ?? 1,
    taxBehavior: service.taxBehavior ?? "INCLUSIVE",
    paymentProviders: service.paymentProviders ?? ["OFFLINE"],
    stripeTaxId: service.stripeTaxId ?? "",
    featured: service.featured ?? false,
    draft: service.draft ?? false,
    duration: service.durationInfo ?? "",
    labels: service.labels ?? [],
    //viewConfig: service.viewConfig ?? {},
  };

  return (
    <Wrapper>
      {duplicateStatus.isLoading && <FullPageOverlayLoader />}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getValidationSchemaForServiceDetails(t)}
      >
        {({ values, resetForm, dirty }) => {
          return (
            <Form>
              <PageHeader title={service.title} showBackButton>
                <Row gap="10px">
                  <Button buttonType="secondary" onClick={() => resetForm()} type="button" disabled={!dirty}>
                    {t("discard")}
                  </Button>
                  <Button buttonType="primary" type="submit" disabled={!dirty} noWrap>
                    {t("save-set-live")}
                  </Button>
                  <ExtendedMenu>
                    <ExtendedMenuButton
                      buttonType="secondary"
                      type="button"
                      onClick={() => {
                        duplicateService({
                          projectId: selectedProject?.projectId ?? "",
                          serviceId: service.serviceId,
                        });
                      }}
                      disabled={selectedProject === undefined}
                    >
                      {t("duplicate")}
                    </ExtendedMenuButton>
                    <ExtendedMenuSplitter />
                    <DeleteServiceButton />
                  </ExtendedMenu>
                </Row>
              </PageHeader>
              <PageContent>
                {children}
                <ServiceDetails formValues={values} />
              </PageContent>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

export default GeneralInfo;
