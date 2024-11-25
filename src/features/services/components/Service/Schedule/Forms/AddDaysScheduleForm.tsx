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
import { ServiceDaysStrategyCreateRangeVariables } from "features/services/api/mutations/models";
import { DaysOfWeek, Months } from "features/services/model/serviceSlotStrategie";
import { ServiceDaysStrategyFields } from "features/services/model/strategies";
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
    startDateTime: Yup.date(),
    endDateTime: Yup.date().when("startDateTime", (startDateTime: Date, schema) => {
      const startNumber = +format(startDateTime, "yyyyMMdd");

      return schema.test({
        test: (endDateTime: Date) => {
          const endNumber = +format(endDateTime, "yyyyMMdd");
          return endNumber > startNumber;
        },
        message: t("common:validation.laterThen", {
          minValue: format(startDateTime, "d LLL yyyy"),
        }),
      });
    }),

    daysOfWeek: Yup.array().min(1, t("common:validation.required")),
    months: Yup.array().min(1, t("common:validation.required")),
    slotQuantity: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
    slotDuration: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
    slotInterval: Yup.number().min(0, t("common:validation.minNumber", { minValue: 0 })),
    endTimePeriod: Yup.number().min(1, t("common:validation.minNumber", { minValue: 1 })),
  });
};

const ControlsWrapper = styled.div`
  padding: 0 20px;
`;

interface ServiceDaysStrategyFormValues {
  startDateTime: Date;
  start: {
    dateTime: Date;
    time: string;
    timeOffset: number | null;
  };
  endDateTime: Date;
  end: {
    dateTime: Date;
    time: string;
    timePeriod: number;
  };
  endTimePeriod: number;
  daysOfWeek: Array<DaysOfWeek>;
  months: Array<Months>;
  slotQuantity: number;
  slotDuration: number;
  slotInterval: number;
  labels: Array<string>;
  startType: string;
  endType: string;
}

const initialValues: ServiceDaysStrategyFormValues = {
  startDateTime: new Date(),
  start: {
    dateTime: new Date(),
    time: "9:00",
    timeOffset: 30,
  },
  endDateTime: addMonths(new Date(), 3),
  end: {
    dateTime: addMonths(new Date(), 3),
    time: "17:00",
    timePeriod: 60,
  },
  endTimePeriod: 60,
  daysOfWeek: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
  months: [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ],
  slotDuration: 30,
  slotInterval: 5,
  slotQuantity: 1,
  labels: [],
  startType: "DATE",
  endType: "DATE",
};

interface ServiceDaysStrategyProps {
  onSubmit: (values: ServiceDaysStrategyCreateRangeVariables) => void;
  strategy?: ServiceDaysStrategyFields;
}

export const AddDaysScheduleForm: React.FC<PropsWithChildren<ServiceDaysStrategyProps>> = ({
  onSubmit,
  children,
  strategy,
}) => {
  const projectId = useRecoilValue(selectedProjectAtom);
  const serviceId = useRecoilValue(selectedServiceAtom)?.serviceId;
  const { t } = useTranslation();

  const init: ServiceDaysStrategyFormValues = strategy
    ? {
        startDateTime: new Date(strategy.start.dateTime ?? initialValues.startDateTime),
        start: {
          dateTime: new Date(strategy.start.dateTime ?? initialValues.startDateTime),
          time: strategy.start.time,
          timeOffset: strategy.start.timeOffset
            ? Math.round(toSeconds(parse(strategy.start.timeOffset)) / 86400)
            : initialValues.start.timeOffset,
        },
        endDateTime: new Date(strategy.end.dateTime ?? initialValues.endDateTime),
        end: {
          dateTime: new Date(strategy.end.dateTime ?? initialValues.endDateTime),
          time: strategy.end.time,
          timePeriod: strategy.end.timePeriod
            ? Math.round(toSeconds(parse(strategy.end.timePeriod)) / 86400)
            : initialValues.end.timePeriod,
        },
        endTimePeriod: strategy.end.timePeriod
          ? Math.round(toSeconds(parse(strategy.end.timePeriod)) / 86400)
          : initialValues.end.timePeriod,
        daysOfWeek: [...strategy.daysOfWeek] as Array<DaysOfWeek>,
        months: [...strategy.months] as Array<Months>,
        slotDuration: Math.round(toSeconds(parse(strategy.slotDuration)) / 60),
        slotInterval:
          Math.round(toSeconds(parse(strategy.slotInterval)) / 60) -
          Math.round(toSeconds(parse(strategy.slotDuration)) / 60),
        slotQuantity: strategy.slotQuantity,
        labels: [...strategy.labels] as Array<string>,
        startType: strategy.start.dateTime ? "DATE" : "DAYS_FROM_NOW",
        endType: strategy.end.dateTime ? "DATE" : "NEVER",
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
              start: {
                ...(values.startType === "DATE" && { dateTime: new Date(values.startDateTime) }),
                time: values.start.time,
                ...(values.startType === "DAYS_FROM_NOW" && {
                  timeOffset: values.start.timeOffset ? serialize({ days: values.start.timeOffset }) : null,
                }),
              },
              end: {
                ...(values.endType === "DATE" && { dateTime: new Date(values.endDateTime) }),
                time: values.end.time,
                timePeriod: serialize({ days: values.endTimePeriod }),
              },
              daysOfWeek: [...values.daysOfWeek] as Array<DaysOfWeek>,
              months: [...values.months] as Array<Months>,
              slotDuration: serialize({ minutes: values.slotDuration }),
              slotInterval: serialize({
                minutes: values.slotDuration + values.slotInterval,
              }),
              slotQuantity: values.slotQuantity,
              labels: [...values.labels] as Array<string>,
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
                  name="months"
                  label={t("months")}
                  options={{
                    JANUARY: t("January"),
                    FEBRUARY: t("February"),
                    MARCH: t("March"),
                    APRIL: t("April"),
                    MAY: t("May"),
                    JUNE: t("June"),
                    JULY: t("July"),
                    AUGUST: t("August"),
                    SEPTEMBER: t("September"),
                    OCTOBER: t("October"),
                    NOVEMBER: t("November"),
                    DECEMBER: t("December"),
                  }}
                />
                <FormSelect
                  name="daysOfWeek"
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
                    <FormTimeSelect label={t("start-time")} name="start.time" />
                  </Box>
                  <Box w="115px">
                    <FormTimeSelect label={t("end-time")} name="end.time" />
                  </Box>
                </Row>
                <Row gap="10px">
                  <Row w="115px">
                    <IntField name="slotDuration" label={t("services.duration-minutes")} />
                  </Row>
                  <IntField name="slotInterval" label={t("services.break-after-event-minutes")} />
                  <Row w="115px">
                    <IntField name="slotQuantity" label={t("services.bookings-per-slot")} />
                  </Row>
                </Row>
                <Row gap="10px">
                  <Box w="50%">
                    <FormSelect
                      name="startType"
                      label={t("services.service-starts")}
                      options={{
                        DATE: t("services.on-date"),
                        DAYS_FROM_NOW: t("services.days-from-now"),
                      }}
                    />
                  </Box>
                  <Box w="50%">
                    {values.startType === "DATE" && <FormDataPicker label={t("start-date")} name="startDateTime" />}
                    {values.startType === "DAYS_FROM_NOW" && <IntField name="start.timeOffset" label="Days" />}
                  </Box>
                </Row>
                <Row gap="10px">
                  <Box w="50%">
                    <FormSelect
                      name="endType"
                      label={t("services.service-ends")}
                      options={{
                        DATE: t("services.on-date"),
                        NEVER: t("services.never"),
                      }}
                    />
                  </Box>
                  <Box w="50%">
                    {values.endType === "DATE" && <FormDataPicker label={t("end-date")} name="endDateTime" />}
                  </Box>
                </Row>
                <Row w="50%">
                  <IntField name="endTimePeriod" label={t("services.booking-window-days")} />
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
