import React, { PropsWithChildren } from "react";
import { Button } from "components/Button";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { ViewConfig } from "features/services/api/mutations/models";
import { useServiceUpdate } from "features/services/hooks/useServiceUpdate";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Form, Formik } from "formik";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ServiceDisplayAdditionalOptions, ServiceDisplayView } from ".";

const StyledColumn = styled(Column)`
  width: 530px;
`;

export const ServiceDisplay: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const service = useRecoilValue(selectedServiceAtom);
  const { mutation } = useServiceUpdate();
  const selectedProjectId = useRecoilValue(selectedProjectAtom);

  if (!service || !selectedProjectId) return null;

  const handleSubmit = ({ viewConfig }: { viewConfig: ViewConfig }) => {
    if (selectedProjectId === undefined || service === undefined) return;

    mutation({
      projectId: selectedProjectId,
      serviceId: service.serviceId,
      viewConfig: {
        displayType: viewConfig.displayType,
        [viewConfig.displayType.toLowerCase()]: _.omit(
          _.omitBy(viewConfig[viewConfig.displayType.toLowerCase() as keyof ViewConfig], _.isNull),
          ["__typename"],
        ),
      },
    });
  };

  return (
    <Formik
      initialValues={{ formFields: service.formFields, viewConfig: service.viewConfig }}
      onSubmit={handleSubmit}
      enableReinitialize
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
              </Row>
            </PageHeader>
            <PageContent>
              {children}
              <Row gap="32px" ai="flex-start" jc="flex-start">
                <StyledColumn ai="flex-start">
                  <ServiceDisplayAdditionalOptions />
                  <ServiceDisplayView onConfirm={() => handleSubmit({ viewConfig: values.viewConfig })} />
                </StyledColumn>
              </Row>
            </PageContent>
          </Form>
        );
      }}
    </Formik>
  );
};
