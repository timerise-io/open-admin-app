import React, { PropsWithChildren } from "react";
import FormDataPicker from "components/forms/FormDataPicker";
import FormTimeSelect from "components/forms/FormTimeSelect/FormTimeSelect";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { format } from "date-fns";
import { CreateSlotVariables } from "features/services/api/mutations/models";
import { Slot } from "features/services/model/serviceSlotStrategie";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Form, Formik } from "formik";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const ControlsWrapper = styled.div`
  margin-top: 10px;
  padding: 0 20px;
`;

interface ExceptionFormValues {
  dateTimeFrom: Date;
  startTime: string;
  endTime: string;
}

interface ExceptionFormProps {
  onSubmit: (values: CreateSlotVariables) => void;
  slot?: Slot;
}

const ExceptionForm: React.FC<PropsWithChildren<ExceptionFormProps>> = ({ onSubmit, children, slot }) => {
  const { t } = useTranslation();
  const service = useRecoilValue(selectedServiceAtom);

  const { format: formatProjectOffset, getDateInTimezone } = useTimezoneFormat();

  const initialValues: ExceptionFormValues = slot
    ? {
        dateTimeFrom: getDateInTimezone(slot.dateTimeFrom),
        startTime: formatProjectOffset(slot.dateTimeFrom, "H:mm"),
        endTime: formatProjectOffset(slot.dateTimeTo, "H:mm"),
      }
    : {
        dateTimeFrom: new Date(),
        startTime: "9:00",
        endTime: "17:00",
      };

  const handleSubmit = (values: ExceptionFormValues) => {
    if (service === undefined) return;

    const isoDate = format(values.dateTimeFrom, "yyyy-MM-dd");

    const startTime = `${values.startTime.length === 4 ? "0" : ""}${values.startTime}`;
    const endTime = `${values.endTime.length === 4 ? "0" : ""}${values.endTime}`;

    onSubmit({
      dateTimeFrom: new Date(`${isoDate}T${startTime}:00.000Z`),
      dateTimeTo: new Date(`${isoDate}T${endTime}:00.000Z`),
      projectId: service.project.projectId,
      quantity: 1,
      serviceId: service.serviceId,
      slotType: "EXCEPTION",
    });
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => {
          return (
            <Form>
              <ControlsWrapper>
                <FormDataPicker label={t("start-date")} name="dateTimeFrom" />
                <Row gap="10px" jc="flex-start">
                  <Box w="165px">
                    <FormTimeSelect label={t("start-time")} name="startTime" />
                  </Box>
                  <Box w="165px">
                    <FormTimeSelect label={t("end-time")} name="endTime" />
                  </Box>
                </Row>
              </ControlsWrapper>
              {children}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ExceptionForm;
