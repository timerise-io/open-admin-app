import React, { PropsWithChildren } from "react";
import FormDataPicker from "components/forms/FormDataPicker";
import FormSelect from "components/forms/FormSelect";
import FormTimeSelect from "components/forms/FormTimeSelect/FormTimeSelect";
import IntField from "components/forms/IntField";
import { Box } from "components/layout/Box";
import { Row } from "components/layout/Row";
import { format } from "date-fns";
import { addMonths } from "date-fns/esm";
import { selectedProjectAtom } from "features/project/state/selectedProjectAtom";
import { ServiceSlotStrategyCreateVariables } from "features/services/api/mutations/models";
import { DaysOfWeek, ServiceSlotStrategyRangeFields } from "features/services/model/serviceSlotStrategie";
import { selectedServiceAtom } from "features/services/state/selectedServiceAtom";
import { Form, Formik } from "formik";
import { parse, toSeconds } from "iso8601-duration";
import { TFunction, useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { serialize } from "tinyduration";
import * as Yup from "yup";

const getValidationSchema = (t: TFunction<"common"[]>) => {
  return Yup.object({
    range: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
    duration: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
    quantity: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
    days: Yup.array().min(1, t("common:validation.required")),
    startTime: Yup.string(),
    endTime: Yup.string().when("startTime", (startTime, schema) => {
      const startNumber = +startTime.replace(":", "");

      return schema.test({
        test: (endTime: string) => {
          const endNumber = +endTime.replace(":", "");
          return endNumber > startNumber;
        },
        message: t("common:validation.laterThen", { minValue: startTime }),
      });
    }),
    startDate: Yup.date(),
    endDate: Yup.date().when("startDate", (startDate: Date, schema) => {
      const startNumber = +format(startDate, "yyyyMMdd");

      return schema.test({
        test: (endDate: Date) => {
          const endNumber = +format(endDate, "yyyyMMdd");
          return endNumber > startNumber;
        },
        message: t("common:validation.laterThen", {
          minValue: format(startDate, "d LLL yyyy"),
        }),
      });
    }),
  });
};

const ControlsWrapper = styled.div`
  padding: 0 20px;
`;

interface RecurringFormValues {
  days: Array<DaysOfWeek>;
  duration: number;
  interval: number;
  quantity: number;
  range: number;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

const initialValues: RecurringFormValues = {
  days: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
  duration: 30,
  interval: 30,
  quantity: 1,
  range: 30,
  startDate: new Date(),
  endDate: addMonths(new Date(), 3),
  startTime: "9:00",
  endTime: "17:00",
};

interface RecurringFormProps {
  onSubmit: (values: ServiceSlotStrategyCreateVariables) => void;
  strategy?: ServiceSlotStrategyRangeFields;
}

const RecurringForm: React.FC<PropsWithChildren<RecurringFormProps>> = ({ onSubmit, children, strategy }) => {
  const projectId = useRecoilValue(selectedProjectAtom);
  const serviceId = useRecoilValue(selectedServiceAtom)?.serviceId;
  const { t } = useTranslation();

  const init: RecurringFormValues = strategy
    ? {
        days: strategy.daysOfWeek,
        duration: Math.round(toSeconds(parse(strategy.slotDuration)) / 60),
        interval:
          Math.round(toSeconds(parse(strategy.slotInterval)) / 60) -
          Math.round(toSeconds(parse(strategy.slotDuration)) / 60),
        range: parse(strategy.discontinueStrategy.futurePeriod).days ?? 0,
        quantity: strategy.slotQuantity,
        startDate: new Date(strategy.startDateTime ?? ""),
        endDate: new Date(strategy.discontinueStrategy.endDateTime),
        startTime: format(new Date(`1900-01-01T${("00" + strategy.timeFrom).slice(-5)}`), "H:mm"),
        endTime: format(new Date(`1900-01-01T${("00" + strategy.timeTo).slice(-5)}`), "H:mm"),
      }
    : initialValues;

  return (
    <div>
      <Formik
        initialValues={init}
        onSubmit={(values) => {
          if (projectId && serviceId) {
            onSubmit({
              projectId,
              serviceId,
              slotDuration: serialize({ minutes: values.duration }),
              slotInterval: serialize({
                minutes: values.duration + values.interval,
              }),
              slotQuantity: values.quantity,
              slotType: "AVAILABLE",
              strategyType: "RANGE",
              discontinueStrategy: {
                discontinueType: "ENDDATE",
                endDateTime: new Date(values.endDate),
                futurePeriod: serialize({ days: values.range }),
              },
              daysOfWeek: [...values.days] as Array<DaysOfWeek>,
              timeFrom: values.startTime,
              timeTo: values.endTime,
              startDateTime: values.startDate,
            });
          }
        }}
        validationSchema={getValidationSchema(t)}
      >
        {({ values }) => {
          return (
            <Form>
              <ControlsWrapper>
                <FormSelect
                  name="days"
                  label={t("days")}
                  options={{
                    MONDAY: t("Monday"),
                    TUESDAY: t("Tuesday"),
                    WEDNESDAY: t("Wednesday"),
                    THURSDAY: t("Thursday"),
                    FRIDAY: t("Friday"),
                    SATURDAY: t("Saturday"),
                    SUNDAY: t("Sunday"),
                  }}
                />
                <Row gap="10px" jc="flex-start">
                  <Box w="115px">
                    <FormTimeSelect label={t("start-time")} name="startTime" />
                  </Box>
                  <Box w="115px">
                    <FormTimeSelect label={t("end-time")} name="endTime" />
                  </Box>
                </Row>
                <Row gap="10px">
                  <Row w="115px">
                    <IntField name="duration" label={t("services.duration-minutes")} />
                  </Row>
                  <Row w="115px">
                    <IntField name="quantity" label={t("services.bookings-per-slot")} />
                  </Row>
                  <IntField name="interval" label="Break time after the event (minutes)" />
                </Row>
                <Row gap="10px">
                  <FormDataPicker label={t("start-date")} name="startDate" />
                  <FormDataPicker label={t("end-date")} name="endDate" />
                </Row>
                <Box w="240px">
                  <IntField name="range" label={t("services.range-days")} />
                </Box>
              </ControlsWrapper>
              {children}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RecurringForm;
