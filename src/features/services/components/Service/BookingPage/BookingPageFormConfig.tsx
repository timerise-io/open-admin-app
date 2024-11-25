import React, { PropsWithChildren } from "react";
import { Button } from "components/Button";
import { Column } from "components/layout/Column";
import { PageContent } from "components/layout/PageContent";
import { PageHeader } from "components/layout/PageHeader";
import { Row } from "components/layout/Row";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { useServiceUpdate } from "features/services/hooks/useServiceUpdate";
import { FormField } from "features/services/model/formFields";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Form, Formik } from "formik";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BookingPageFormElements from "./BookingPageFormElements";

const StyledColumn = styled(Column)`
  width: 530px;
`;

const BookingPageFormConfig: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const service = useRecoilValue(selectedServiceAtom);
  const { mutation } = useServiceUpdate();
  const selectedProjectId = useRecoilValue(selectedProjectAtom);

  if (!service || !selectedProjectId) return null;

  const handleSubmit = ({ formFields }: { formFields: Array<FormField> }) => {
    const fields = [...formFields];

    const fieldsToCreate = _.remove(fields, (newItem) => {
      return !_.find(service.formFields, (item) => newItem.fieldId === item.fieldId);
    }).map((item) => ({ action: "create", field: { ...item } }));

    const fieldsToDelete = _.remove([...service.formFields], (oldItem) => {
      return !_.find(fields, (item) => oldItem.fieldId === item.fieldId);
    }).map((item) => ({ action: "delete", field: { ...item } }));

    const fieldsToUpdate = fields.map((item) => ({
      action: "update",
      field: { ...item },
    }));

    if (selectedProjectId === undefined || service === undefined) return;

    mutation({
      projectId: selectedProjectId,
      serviceId: service.serviceId,
      formFields: [...fieldsToUpdate, ...fieldsToCreate, ...fieldsToDelete],
    });
  };

  return (
    <Formik initialValues={{ formFields: service.formFields }} onSubmit={handleSubmit} enableReinitialize>
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
                  <BookingPageFormElements />
                </StyledColumn>
              </Row>
            </PageContent>
          </Form>
        );
      }}
    </Formik>
  );
};

export default BookingPageFormConfig;
