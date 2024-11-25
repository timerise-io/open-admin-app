import React, { PropsWithChildren } from "react";
import FormDataPicker from "components/forms/FormDataPicker";
import FormTimeSelect from "components/forms/FormTimeSelect/FormTimeSelect";
import IntField from "components/forms/IntField";
import { Row } from "components/layout/Row";
import { set } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { ServiceSlotStrategyCreateVariables } from "features/services/api/mutations/models";
import { ServiceSlotStrategyOnceFields } from "features/services/model/serviceSlotStrategie";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Form, Formik } from "formik";
import { useTimezoneFormat } from "helpers/hooks/useTimezoneFormat";
import { parse, toSeconds } from "iso8601-duration";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { serialize } from "tinyduration";
import * as Yup from "yup";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    duration: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
    quantity: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
  });
};

interface OneTimeFormValues {
  startDate: Date;
  startTime: string;
  duration: number;
  quantity: number;
}

const initialValues: OneTimeFormValues = {
  startDate: new Date(),
  startTime: "9:00",
  duration: 30,
  quantity: 1,
};

const ControlsWrapper = styled.div`
  padding: 0 20px;
`;

interface OneTimeFormProps {
  onSubmit: (values: ServiceSlotStrategyCreateVariables) => void;
  strategy?: ServiceSlotStrategyOnceFields;
}

const OneTimeForm: React.FC<PropsWithChildren<OneTimeFormProps>> = ({ onSubmit, strategy, children }) => {
  const { format: formatProjectOffset, getDateInTimezone } = useTimezoneFormat();

  const projectId = useRecoilValue(selectedProjectAtom);
  const serviceId = useRecoilValue(selectedServiceAtom)?.serviceId;
  const { t } = useTranslation(["common"]);

  const init: OneTimeFormValues = strategy
    ? {
        duration: Math.round(toSeconds(parse(strategy.slotDuration)) / 60),
        quantity: strategy.slotQuantity,
        startDate: getDateInTimezone(strategy.slotDateTime),
        startTime: formatProjectOffset(strategy.slotDateTime, "H:mm"),
      }
    : initialValues;

  const handleSubmit = (values: OneTimeFormValues) => {
    const [hours, minutes] = values.startTime.split(":");

    const startDateTime = set(values.startDate, {
      hours: +hours,
      minutes: +minutes,
      seconds: 0,
      milliseconds: 0,
    });

    if (projectId && serviceId) {
      onSubmit({
        projectId,
        serviceId,
        strategyType: "ONCE",
        slotDateTime: zonedTimeToUtc(startDateTime, "UTC"),
        slotDuration: serialize({ minutes: values.duration }),
        slotQuantity: values.quantity,
        slotType: "AVAILABLE",
      });
    }
  };

  return (
    <div>
      <Formik initialValues={init} onSubmit={handleSubmit} validationSchema={getValidationSchema(t)}>
        {({ values }) => {
          return (
            <Form>
              <ControlsWrapper>
                <Row gap="10px" jc="flex-start">
                  <FormDataPicker label={t("start-date")} name="startDate" />
                  <FormTimeSelect label={t("start-time")} name="startTime" />
                </Row>
                <Row gap="10px">
                  <IntField name="duration" label="Time slot duration (minutes)" />
                  <IntField name="quantity" label="Available bookings per time slot" />
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

export default OneTimeForm;
